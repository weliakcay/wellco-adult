import { Skeleton } from "@/components/ui/skeleton";

export default function PersonasLoading() {
  return (
    <div className="min-h-screen bg-wellco-background">
      {/* Hero Section Skeleton */}
      <section className="py-16 bg-gradient-to-br from-wellco-primary/10 via-wellco-background to-wellco-accent-vibrant/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
        </div>
      </section>

      {/* Tabs Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-4 mb-12">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg border border-wellco-primary/10 overflow-hidden"
            >
              <div className="p-8 text-center space-y-4">
                <Skeleton className="w-32 h-32 rounded-full mx-auto" />
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-5 w-36 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
                <div className="flex justify-center gap-8 pt-4">
                  <Skeleton className="h-12 w-16" />
                  <Skeleton className="h-12 w-16" />
                </div>
                <Skeleton className="h-12 w-full mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
