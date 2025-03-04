import Image from "next/image"
import Link from "next/link"

interface Author {
  _id: string
  name: string
  image: string
  bio?: string
}

export default function PostAuthor({ author }: { author: Author }) {
  return (
    <div className="flex items-center">
      <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
        <Image
          src={author.image || "/placeholder.svg?height=40&width=40"}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <Link href={`/author/${author._id}`} className="text-sm font-medium hover:text-primary">
          {author.name}
        </Link>
        {author.bio && <p className="text-xs text-muted-foreground line-clamp-1">{author.bio}</p>}
      </div>
    </div>
  )
}

