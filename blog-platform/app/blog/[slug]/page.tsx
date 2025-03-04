import { notFound } from "next/navigation"
import Image from "next/image"
import { format } from "date-fns"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { Mdx } from "@/components/mdx/mdx-components"
import PostAuthor from "@/components/blog/post-author"
import PostComments from "@/components/blog/post-comments"
import SharePost from "@/components/blog/share-post"
import RelatedPosts from "@/components/blog/related-posts"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} - BlogFolio`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            {post.categories.map((category) => (
              <span key={category} className="bg-secondary px-2 py-1 rounded-md">
                {category}
              </span>
            ))}
            <span>•</span>
            <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

          <PostAuthor author={post.author} />
        </div>

        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="markdown-content">
          <Mdx code={post.content} />
        </div>

        <div className="mt-8 pt-8 border-t">
          <SharePost title={post.title} slug={post.slug} />
        </div>

        <div className="mt-12">
          <PostComments postId={post.id} />
        </div>
      </article>

      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
        <RelatedPosts currentPostId={post.id} categories={post.categories} />
      </div>
    </div>
  )
}

