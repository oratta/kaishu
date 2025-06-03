'use client'

import React from 'react'
import Image from 'next/image'
import { Menu, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMobileMenuClick: () => void
  className?: string
}

export function Header({ onMobileMenuClick, className }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-14 items-center border-b bg-background px-4 md:px-6',
        className
      )}
    >
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onMobileMenuClick}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <Image
            src="/kaishu_logo.png"
            alt="KAISHU Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <MessageCircle className="h-5 w-5" />
          <span className="sr-only">LLMチャット</span>
        </Button>
      </div>
    </header>
  )
}
