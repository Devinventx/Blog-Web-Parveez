import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { getRecentPosts } from "@/lib/blog"

export default async function RecentPosts() {
  const posts = await getRecentPosts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Link key={post._id.toString()} href={`/blog/${post.slug}`} className="group flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span className="bg-secondary px-1.5 py-0.5 rounded-md">{post.categories[0]}</span>
              <span>•</span>
              <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
            </div>

            <h3 className="text-base font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

