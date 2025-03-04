import { Suspense } from "react"
import BlogList from "@/components/blog/blog-list"
import BlogSearch from "@/components/blog/blog-search"
import BlogCategories from "@/components/blog/blog-categories"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Blog - BlogFolio",
  description: "Explore our collection of articles on web development, design, and technology",
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of articles on web development, design, and technology
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <BlogSearch />
          <Suspense fallback={<BlogListSkeleton />}>
            <BlogList />
          </Suspense>
        </div>

        <div className="md:w-1/4">
          <div className="sticky top-24">
            <BlogCategories />
          </div>
        </div>
      </div>
    </div>
  )
}

function BlogListSkeleton() {
  return (
    <div className="space-y-8 mt-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="flex space-x-2 pt-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

