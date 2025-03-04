"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Simulate an API call
    setTimeout(() => {
      setLoading(false)
      if (email.includes("@")) {
        setMessage("Thank you for subscribing!")
        setEmail("")
      } else {
        setMessage("Please enter a valid email address.")
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h3>
      <p className="text-muted-foreground mb-6 text-center">
        Stay up to date with the latest articles, news, and updates.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <div>
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${message === "Thank you for subscribing!" ? "text-green-500" : "text-red-500"}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}

