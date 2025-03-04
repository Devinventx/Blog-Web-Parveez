import Link from "next/link"
import { format } from "date-fns"
import { getRecentPosts } from "@/lib/blog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function RecentPostsDashboard() {
  const posts = await getRecentPosts(5)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post._id.toString()}>
              <TableCell className="font-medium">
                <Link href={`/dashboard/posts/${post._id}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </TableCell>
              <TableCell>{format(new Date(post.date), "MMM d, yyyy")}</TableCell>
              <TableCell>
                <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
              </TableCell>
              <TableCell>{post.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

