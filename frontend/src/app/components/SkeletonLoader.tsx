'use client'

export function GenericSkeleton({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
            <div className="shimmer"></div>
        </div>
    )
}

export function ArtistCardSkeleton({ isReversed = false }: { isReversed?: boolean }) {
    return (
        <div className={`flex flex-col lg:flex-row mb-16 gap-0 items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
            <div className="w-full lg:w-2/3 lg:h-[600px] h-[500px] bg-gray-200 animate-pulse"></div>
            <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:px-8 py-0 bg-white">
                <div className="max-w-lg space-y-12">
                    <div className="h-12 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                    </div>
                    <div className="pt-6 space-y-3 border-t border-gray-300">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

export function TattooGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full max-w-full overflow-hidden">
            {Array(count).fill(null).map((_, idx) => (
                <div key={idx} className="h-[400px] sm:h-[450px] md:h-[500px] bg-gray-200 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
            ))}
        </div>
    )
}

export function GalleryStyleSkeleton() {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className="h-9 bg-gray-200 rounded animate-pulse w-48 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto"></div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-[500px] bg-gray-200 animate-pulse"></div>
            <div className="relative rounded-lg overflow-hidden h-[500px] bg-gray-200 animate-pulse"></div>
        </div>
    )
}

export function CourseCardSkeleton() {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 animate-pulse">
            <div className="h-64 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            <div className="p-6 space-y-4">
                <div className="h-7 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
        </div>
    )
}

export function BlogCardSkeleton({ featured = false }: { featured?: boolean }) {
    if (featured) {
        return (
            <article className="group relative overflow-hidden rounded-lg border-2 border-gray-200 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-[400px] lg:h-[500px] bg-gray-200 animate-pulse">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>
                    <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex gap-2 mb-4">
                            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                        <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-6 animate-pulse w-1/3"></div>
                        <div className="space-y-2 mb-6">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                </div>
            </article>
        )
    }

    return (
        <article className="group bg-white rounded-lg overflow-hidden border-2 border-gray-200 h-full flex flex-col shadow-md">
            <div className="relative h-64 bg-gray-200 animate-pulse">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-3">
                    <div className="h-5 w-14 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-7 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse w-1/2"></div>
                <div className="space-y-2 mb-4 flex-1">
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-4/6"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-28 animate-pulse"></div>
            </div>
        </article>
    )
}
