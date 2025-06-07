'use client'

import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { FloatingLLMChat } from '@/components/ui/floating-llm-chat'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-64 md:flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          {/* Mobile Header */}
          <div className="md:hidden flex h-14 items-center border-b bg-background px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileNavOpen(true)}
              className="mr-2"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">改</span>
              </div>
              <h1 className="font-bold">KAISHU</h1>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="min-h-screen md:min-h-0">{children}</main>
        </div>
      </div>

      {/* Mobile Navigation - Only show when open */}
      {mobileNavOpen && (
        <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      )}

      <FloatingLLMChat />
    </div>
  )
}
