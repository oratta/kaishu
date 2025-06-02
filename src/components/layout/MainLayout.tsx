'use client'

import React, { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { ChatInterface, FloatingChatButton } from '@/components/chat'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar className="hidden md:flex" />
        
        <MobileNav
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      
      <FloatingChatButton
        isOpen={chatOpen}
        onClick={() => setChatOpen(!chatOpen)}
      />
      
      <ChatInterface isOpen={chatOpen} />
    </div>
  )
}