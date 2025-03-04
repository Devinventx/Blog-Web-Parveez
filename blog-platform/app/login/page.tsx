import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import LoginForm from "@/components/auth/login-form"

export const metadata = {
  title: "Login - BlogFolio",
  description: "Login to your account",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect(searchParams.callbackUrl || "/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Login to your account to continue</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm callbackUrl={searchParams.callbackUrl} />
        </Suspense>
      </div>
    </div>
  )
}

