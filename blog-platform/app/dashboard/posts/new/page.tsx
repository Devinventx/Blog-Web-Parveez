import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import PostEditor from "@/components/dashboard/post-editor"

export const metadata = {
  title: "Create New Post - BlogFolio",
  description: "Create a new blog post",
}

export default async function NewPostPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/dashboard/posts/new")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <PostEditor />
    </div>
  )
}

