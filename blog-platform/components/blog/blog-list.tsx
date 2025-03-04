import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { getAllPosts } from "@/lib/blog"

export default async function BlogList() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-8 mt-8">
      {posts.map((post) => (
        <article key={post._id.toString()} className="flex flex-col md:flex-row gap-6 border-b pb-8">
          <div className="relative md:w-1/3 h-48 overflow-hidden rounded-lg">
            <Link href={`/blog/${post.slug}`}>
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          <div className="md:w-2/3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              {post.categories.map((category) => (
                <span key={category} className="bg-secondary px-2 py-1 rounded-md">
                  {category}
                </span>
              ))}
              <span>•</span>
              <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                {post.title}
              </Link>
            </h2>

            <p className="text-muted-foreground mb-4">{post.excerpt}</p>

            <div className="flex items-center">
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
        </article>
      ))}
    </div>
  )
}

