export default function EmptyState({
  icon,
  message,
}: {
  icon: string;
  message: string;
}) {
  return (
    <div className="text-center py-16 px-5 text-text-muted bg-surface border-2 border-dashed border-border rounded-card">
      <div className="text-5xl mb-3">{icon}</div>
      <p className="font-display font-extrabold text-lg">{message}</p>
    </div>
  );
}
