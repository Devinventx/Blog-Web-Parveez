import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, MessageSquare } from "lucide-react"

export default function DashboardStats() {
  // In a real app, these would be fetched from an API
  const stats = [
    {
      title: "Total Posts",
      value: "12",
      description: "4 published in the last month",
      icon: FileText,
    },
    {
      title: "Total Views",
      value: "2,345",
      description: "Up 12% from last month",
      icon: Eye,
    },
    {
      title: "Comments",
      value: "42",
      description: "8 new comments this week",
      icon: MessageSquare,
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

