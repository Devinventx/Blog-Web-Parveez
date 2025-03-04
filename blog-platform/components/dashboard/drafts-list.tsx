import Link from "next/link"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"

// Mock drafts data
const drafts = [
  {
    id: "1",
    title: "Getting Started with Next.js 13",
    excerpt: "Learn how to build modern web applications with Next.js 13 and its new App Router.",
    updatedAt: "2023-05-10T14:30:00Z",
  },
  {
    id: "2",
    title: "MongoDB Atlas: A Comprehensive Guide",
    excerpt: "Everything you need to know about setting up and using MongoDB Atlas for your applications.",
    updatedAt: "2023-05-08T09:15:00Z",
  },
]

export default function DraftsList() {
  return (
    <div className="space-y-4">
      {drafts.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            You don&apos;t have any drafts yet.
          </CardContent>
        </Card>
      ) : (
        drafts.map((draft) => (
          <Card key={draft.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{draft.title}</CardTitle>
              <CardDescription>Last updated on {format(new Date(draft.updatedAt), "MMM d, yyyy")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{draft.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/posts/${draft.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}

