import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Share Your Ideas with the World</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            A modern blog platform built with Next.js, React, and MongoDB. Create, publish, and share your thoughts with
            the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/blog">Explore Articles</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Start Writing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

