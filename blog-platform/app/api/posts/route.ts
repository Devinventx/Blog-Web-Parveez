import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { Post } from "@/models/post"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  const skip = (page - 1) * limit

  try {
    await connectToDatabase()

    const query: any = { status: "published" }

    if (category) {
      query.categories = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ]
    }

    const posts = await Post.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name image")
      .lean()

    const total = await Post.countDocuments(query)

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, content, excerpt, coverImage, categories, status } = body

    await connectToDatabase()

    const newPost = new Post({
      title,
      content,
      excerpt,
      coverImage,
      categories,
      status: status || "draft",
      author: session.user.id,
      date: new Date(),
      slug: title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-"),
    })

    await newPost.save()

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

