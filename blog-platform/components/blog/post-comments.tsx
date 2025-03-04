"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    name: string
    image: string
  }
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "1",
    content: "This is a great article! Thanks for sharing your knowledge.",
    createdAt: "2023-05-15T10:30:00Z",
    author: {
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    content: "I learned a lot from this post. Looking forward to more content like this.",
    createdAt: "2023-05-16T14:20:00Z",
    author: {
      name: "Jane Smith",
      image: "/placeholder.svg?height=40&width=40",
    },
  },
]

export default function PostComments({ postId }: { postId: string }) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim() || !session) return

    setIsSubmitting(true)

    // In a real app, you would submit to an API
    // await fetch('/api/comments', { method: 'POST', body: JSON.stringify({ postId, content: newComment }) })

    // Mock adding a new comment
    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      createdAt: new Date().toISOString(),
      author: {
        name: session.user?.name || "Anonymous",
        image: session.user?.image || "/placeholder.svg?height=40&width=40",
      },
    }

    setComments([comment, ...comments])
    setNewComment("")
    setIsSubmitting(false)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      {session ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
              <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
              />
              <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-muted p-4 rounded-lg mb-8">
          <p className="text-center">
            Please{" "}
            <Button variant="link" className="p-0" asChild>
              <a href="/login?callbackUrl=back">sign in</a>
            </Button>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      <Separator className="my-6" />

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.image} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.author.name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

