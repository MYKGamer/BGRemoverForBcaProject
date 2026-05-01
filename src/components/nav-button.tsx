'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface NavButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function NavButton({ href, children, className, variant = "default", size = "default" }: NavButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    // If it's an external link or hash link, let it be
    if (href.startsWith('#')) return

    setIsLoading(true)
    // We don't prevent default, we let the Link or navigation happen,
    // but we show the loading state immediately.
    router.push(href)
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
