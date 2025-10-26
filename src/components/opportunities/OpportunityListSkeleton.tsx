import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function OpportunityListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="h-full border border-gray-200 bg-white flex flex-col p-0 overflow-hidden">
          {/* Banner skeleton */}
          <Skeleton className="w-full h-40 md:h-48 rounded-none" />

          <div className="p-5 space-y-4 flex flex-col flex-1">
            {/* Header: Icon + Category + Deadline */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Icon */}
                <Skeleton className="shrink-0 w-10 h-10 rounded-full" />
                {/* Category badge */}
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
              {/* Deadline badge */}
              <Skeleton className="h-6 w-16 rounded-md shrink-0" />
            </div>

            {/* Título */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Informações principais */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-1" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-1" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Barra de compatibilidade */}
            <div className="space-y-2 pt-2 border-t border-gray-200 mt-auto">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-3 w-36" />
            </div>

            {/* CTA button */}
            <Skeleton className="h-12 w-full rounded-lg mt-auto" />
          </div>
        </Card>
      ))}
    </div>
  )
}
