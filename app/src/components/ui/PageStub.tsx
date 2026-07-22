export default function PageStub({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="max-w-content mx-auto px-5 py-24 text-center">
      <h1 className="font-display font-extrabold text-4xl text-teal mb-3">{title}</h1>
      <p className="text-text-muted text-lg">
        {description ?? "Estamos preparando esta sección. Vuelve pronto 🐾"}
      </p>
    </section>
  );
}
