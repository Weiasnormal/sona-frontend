export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background dark:bg-background">
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="text-lg font-medium text-foreground">Loading...</span>
      </div>
    </div>
  )
} 