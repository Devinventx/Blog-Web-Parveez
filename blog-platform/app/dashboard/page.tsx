import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import RecentPostsDashboard from "@/components/dashboard/recent-posts"
import DraftsList from "@/components/dashboard/drafts-list"

export const metadata = {
  title: "Dashboard - BlogFolio",
  description: "Manage your blog posts and account",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <RecentPostsDashboard />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Drafts</h2>
          <DraftsList />
        </div>
      </div>
    </div>
  )
}

