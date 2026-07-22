-- Huellitas Arcoíris — Dog adoption site schema

create type dog_estado as enum ('adopcion', 'tratamiento', 'adoptado');
create type dog_sexo as enum ('Macho', 'Hembra');
create type dog_tamano as enum ('Pequeño', 'Mediano', 'Grande');
create type fin_tipo as enum ('ingreso', 'gasto');

create table dogs (
  id            text primary key,
  name          text not null,
  estado        dog_estado not null default 'adopcion',
  sexo          dog_sexo not null,
  edad          text not null,
  tamano        dog_tamano not null,
  ubicacion     text not null default 'Querétaro',
  vacunado      boolean not null default false,
  esterilizado  boolean not null default false,
  historia      text not null default '',
  meta          numeric(10,2) not null default 0,
  recaudado     numeric(10,2) not null default 0,
  antes         text,
  ahora         text,
  gallery       text[] not null default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table movimientos (
  id          uuid primary key default gen_random_uuid(),
  dog_id      text references dogs(id) on delete set null,
  tipo        fin_tipo not null,
  concepto    text not null,
  monto       numeric(10,2) not null,
  fecha       date not null default current_date,
  created_at  timestamptz not null default now()
);

create index movimientos_dog_id_idx on movimientos (dog_id);
create index dogs_estado_idx on dogs (estado);

-- updated_at trigger
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;
create trigger dogs_set_updated_at before update on dogs
  for each row execute function set_updated_at();

-- Row Level Security
alter table dogs enable row level security;
alter table movimientos enable row level security;

create policy "dogs are publicly readable" on dogs
  for select using (true);

-- Movimientos has no public policies — never readable/writable without authentication
