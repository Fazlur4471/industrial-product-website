export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-52 animate-pulse rounded-md bg-secondary" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="h-28 animate-pulse rounded-xl border border-border bg-card" />
        <div className="h-28 animate-pulse rounded-xl border border-border bg-card" />
        <div className="h-28 animate-pulse rounded-xl border border-border bg-card" />
      </div>
      <div className="h-80 animate-pulse rounded-xl border border-border bg-card" />
    </div>
  )
}
