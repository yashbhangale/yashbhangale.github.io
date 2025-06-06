'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

export function BlogSearch() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="relative max-w-md mx-auto">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search blog posts..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  )
} 