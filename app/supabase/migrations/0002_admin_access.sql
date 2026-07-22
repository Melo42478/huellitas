-- Huellitas Arcoíris — Admin write access + Storage bucket

-- dogs: write policies for authenticated users (admins)
create policy "authenticated can insert dogs" on dogs
  for insert to authenticated with check (true);
create policy "authenticated can update dogs" on dogs
  for update to authenticated using (true) with check (true);
create policy "authenticated can delete dogs" on dogs
  for delete to authenticated using (true);

-- movimientos: read + write for authenticated users
create policy "authenticated can view movimientos" on movimientos
  for select to authenticated using (true);
create policy "authenticated can insert movimientos" on movimientos
  for insert to authenticated with check (true);
create policy "authenticated can delete movimientos" on movimientos
  for delete to authenticated using (true);

-- Storage bucket for dog photos
insert into storage.buckets (id, name, public)
  values ('dog-photos', 'dog-photos', true)
  on conflict (id) do nothing;

-- Storage policies
create policy "public can view dog photos" on storage.objects
  for select using (bucket_id = 'dog-photos');
create policy "authenticated can upload dog photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'dog-photos');
create policy "authenticated can update dog photos" on storage.objects
  for update to authenticated using (bucket_id = 'dog-photos');
create policy "authenticated can delete dog photos" on storage.objects
  for delete to authenticated using (bucket_id = 'dog-photos');
