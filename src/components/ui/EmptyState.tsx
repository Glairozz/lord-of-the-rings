export default function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="panel-soft px-6 py-14 text-center">
      <p className="font-display text-lg text-parchment">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-mist">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
