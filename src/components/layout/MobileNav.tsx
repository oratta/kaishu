'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import {
  Home,
  FolderOpen,
  Calendar,
  Settings,
  BarChart3,
  CheckSquare,
  RotateCcw,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { id: 'dashboard', label: 'ダッシュボード', href: '/dashboard', icon: Home },
  { id: 'projects', label: 'プロジェクト', href: '/projects', icon: FolderOpen },
  { id: 'tasks', label: 'タスク', href: '/tasks', icon: CheckSquare },
  { id: 'habits', label: '習慣', href: '/habits', icon: RotateCcw },
  { id: 'calendar', label: 'カレンダー', href: '/calendar', icon: Calendar },
]

const bottomItems = [
  { id: 'analytics', label: '分析', href: '/analytics', icon: BarChart3 },
  { id: 'settings', label: '設定', href: '/settings', icon: Settings },
  { id: 'profile', label: 'プロフィール', href: '/profile', icon: User },
]

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 bg-background transition-transform duration-300 md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">改</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">KAISHU</h1>
                <p className="text-xs text-muted-foreground">Life Management</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 h-10',
                    isActive &&
                      'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800'
                  )}
                  asChild
                >
                  <Link href={item.href} onClick={onClose}>
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Bottom items */}
        <div className="p-4 border-t">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href={item.href} onClick={onClose}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
