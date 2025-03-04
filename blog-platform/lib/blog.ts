import { connectToDatabase } from "@/lib/mongodb"
import { Post } from "@/models/post"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrism from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

export async function getAllPosts() {
  await connectToDatabase()

  const posts = await Post.find({ status: "published" }).sort({ date: -1 }).populate("author", "name image").lean()

  return posts
}

export async function getPostBySlug(slug: string) {
  await connectToDatabase()

  const post = await Post.findOne({ slug, status: "published" }).populate("author", "name image").lean()

  if (!post) {
    return null
  }

  // Compile MDX content
  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypePrism],
      },
    },
  })

  return {
    ...post,
    content,
  }
}

export async function getFeaturedPosts() {
  await connectToDatabase()

  const posts = await Post.find({ status: "published", featured: true })
    .sort({ date: -1 })
    .limit(3)
    .populate("author", "name image")
    .lean()

  return posts
}

export async function getRecentPosts(limit = 4) {
  await connectToDatabase()

  const posts = await Post.find({ status: "published" })
    .sort({ date: -1 })
    .limit(limit)
    .populate("author", "name image")
    .lean()

  return posts
}

export async function getPostsByCategory(category: string) {
  await connectToDatabase()

  const posts = await Post.find({
    status: "published",
    categories: category,
  })
    .sort({ date: -1 })
    .populate("author", "name image")
    .lean()

  return posts
}

export async function getPostsByAuthor(authorId: string) {
  await connectToDatabase()

  const posts = await Post.find({
    status: "published",
    author: authorId,
  })
    .sort({ date: -1 })
    .populate("author", "name image")
    .lean()

  return posts
}

export async function getRelatedPosts(postId: string, categories: string[], limit = 3) {
  await connectToDatabase()

  const posts = await Post.find({
    _id: { $ne: postId },
    status: "published",
    categories: { $in: categories },
  })
    .sort({ date: -1 })
    .limit(limit)
    .populate("author", "name image")
    .lean()

  return posts
}

