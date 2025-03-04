import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your blog posts and account</p>
      </div>

      <Button asChild>
        <Link href="/dashboard/posts/new">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Post
        </Link>
      </Button>
    </div>
  )
}

