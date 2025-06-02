'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  CalendarDays,
  Settings,
  BarChart3,
  CheckSquare,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

const navigationItems = [
  {
    title: 'ダッシュボード',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'プロジェクト',
    href: '/projects',
    icon: FolderOpen,
  },
  {
    title: 'カレンダー',
    href: '/calendar',
    icon: CalendarDays,
  },
  {
    title: 'タスク',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    title: '習慣',
    href: '/habits',
    icon: RefreshCw,
  },
  {
    title: 'レポート',
    href: '/reports',
    icon: BarChart3,
  },
  {
    title: '設定',
    href: '/settings',
    icon: Settings,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('w-64 flex-col border-r bg-background', className)}>
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="rounded-lg bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground">Version 0.1.0</p>
          <p className="text-xs text-muted-foreground mt-1">タイムブロック確認プロトタイプ</p>
        </div>
      </div>
    </div>
  )
}
