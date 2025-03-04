import Link from "next/link"

const categories = [
  { name: "Web Development", slug: "web-development", count: 12 },
  { name: "React", slug: "react", count: 8 },
  { name: "Next.js", slug: "nextjs", count: 6 },
  { name: "JavaScript", slug: "javascript", count: 10 },
  { name: "TypeScript", slug: "typescript", count: 5 },
  { name: "UI/UX", slug: "ui-ux", count: 4 },
  { name: "Database", slug: "database", count: 3 },
  { name: "DevOps", slug: "devops", count: 2 },
]

export default function BlogCategories() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog?category=${category.slug}`}
                className="flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-xs bg-secondary rounded-full px-2 py-1">{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "JavaScript", "TypeScript", "MongoDB", "Tailwind", "API", "SSR"].map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag.toLowerCase()}`}
              className="bg-secondary hover:bg-secondary/80 px-3 py-1 rounded-full text-sm transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

