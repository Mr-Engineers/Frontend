import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function SavedSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="ml-4 h-6 w-32" />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 lg:p-6 w-full">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="space-y-4 w-full">
          {[...Array(5)].map((_, index) => (
            <Card key={index} className="overflow-hidden w-full">
              <CardContent className="p-0">
                <div className="p-4 border-l-4 border-l-[#fc6428]">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-5 w-48" />
                    </div>
                    <div className="flex gap-1">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 