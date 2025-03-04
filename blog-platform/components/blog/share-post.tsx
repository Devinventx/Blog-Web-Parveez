"use client"

import { useState } from "react"
import { Share, Twitter, Facebook, Linkedin, LinkIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SharePostProps {
  title: string
  slug: string
}

export default function SharePost({ title, slug }: SharePostProps) {
  const [copied, setCopied] = useState(false)

  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <span className="flex items-center text-muted-foreground">
        <Share className="mr-2 h-4 w-4" />
        Share this article:
      </span>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          {shareLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() => window.open(link.url, "_blank")}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">Share on {link.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on {link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                <span className="sr-only">Copy link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy link"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

