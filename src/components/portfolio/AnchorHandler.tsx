'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AnchorHandler() {
  const router = useRouter()

  useEffect(() => {
    // Handle anchor navigation when component mounts
    const hash = window.location.hash.substring(1) // Remove the #
    if (hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  return null // This component doesn't render anything
} 