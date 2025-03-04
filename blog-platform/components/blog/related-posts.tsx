import Link from "next/link"
import Image from "next/image"
import { getRelatedPosts } from "@/lib/blog"

export default async function RelatedPosts({
  currentPostId,
  categories,
}: {
  currentPostId: string
  categories: string[]
}) {
  const posts = await getRelatedPosts(currentPostId, categories)

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post._id.toString()} href={`/blog/${post.slug}`} className="group">
          <div className="flex flex-col h-full overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent">
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-1 p-4">
              <h3 className="text-base font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

