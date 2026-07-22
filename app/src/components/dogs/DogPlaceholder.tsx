export default function DogPlaceholder({ name }: { name: string }) {
  return (
    <div className="w-full aspect-square bg-green-soft rounded-row flex flex-col items-center justify-center gap-2">
      <div className="text-4xl">🐾</div>
      <div className="text-xs font-bold text-green text-center px-2">{name}</div>
    </div>
  );
}
