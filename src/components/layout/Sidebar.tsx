'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  FolderOpen,
  CheckSquare,
  RotateCcw,
  Calendar,
  Settings,
  User,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

const navigationItems = [
  { id: 'dashboard', label: 'ダッシュボード', href: '/dashboard', icon: Home },
  { id: 'projects', label: 'プロジェクト', href: '/projects', icon: FolderOpen },
  { id: 'tasks', label: 'タスク', href: '/tasks', icon: CheckSquare },
  { id: 'habits', label: '習慣', href: '/habits', icon: RotateCcw },
  { id: 'calendar', label: 'カレンダー', href: '/calendar', icon: Calendar },
] as const

const bottomItems = [
  { id: 'analytics', label: '分析', href: '/analytics', icon: BarChart3 },
  { id: 'settings', label: '設定', href: '/settings', icon: Settings },
  { id: 'profile', label: 'プロフィール', href: '/profile', icon: User },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('w-64 h-screen bg-background border-r flex flex-col', className)}>
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">改</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">KAISHU</h1>
            <p className="text-xs text-muted-foreground">Life Management</p>
          </div>
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
                <Link href={item.href}>
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
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
