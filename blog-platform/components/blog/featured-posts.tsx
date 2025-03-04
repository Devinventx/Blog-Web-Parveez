import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { getFeaturedPosts } from "@/lib/blog"

export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post._id.toString()} href={`/blog/${post.slug}`} className="group">
          <div className="flex flex-col h-full overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span className="bg-secondary px-2 py-1 rounded-md">{post.categories[0]}</span>
                <span>•</span>
                <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
              </div>

              <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>

              <div className="mt-auto flex items-center pt-4">
                <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={post.author.image || "/placeholder.svg?height=32&width=32"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{post.readingTime} min read</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

