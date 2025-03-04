import { Suspense } from "react"
import FeaturedPosts from "@/components/blog/featured-posts"
import RecentPosts from "@/components/blog/recent-posts"
import NewsletterSignup from "@/components/newsletter/newsletter-signup"
import { Skeleton } from "@/components/ui/skeleton"
import HeroSection from "@/components/home/hero-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-16">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <Suspense fallback={<FeaturedPostsSkeleton />}>
          <FeaturedPosts />
        </Suspense>
      </section>

      <section className="my-16">
        <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
        <Suspense fallback={<RecentPostsSkeleton />}>
          <RecentPosts />
        </Suspense>
      </section>

      <section className="my-16 bg-secondary rounded-xl p-8">
        <NewsletterSignup />
      </section>
    </div>
  )
}

function FeaturedPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
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

function RecentPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-24 w-24 rounded-lg" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

