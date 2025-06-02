'use client'

import { useState, useEffect } from 'react'
import { CalendarHeader } from './CalendarHeader'
import { DailyCalendar } from './DailyCalendar'
import { WeeklyCalendar } from './WeeklyCalendar'
import { generateMockCalendarDays } from '@/lib/mock-data'
import { CalendarDay } from '@/types/calendar'
import { cn } from '@/lib/utils'

interface CalendarProps {
  className?: string
}

export function Calendar({ className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week')
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // モバイル画面検出
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // モバイルの場合は自動的に日表示に切り替え
      if (window.innerWidth < 768) {
        setViewMode('day')
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // モックデータを更新
    setCalendarDays(generateMockCalendarDays())
  }, [currentDate])

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(currentDate)

    switch (direction) {
      case 'prev':
        if (viewMode === 'day') {
          newDate.setDate(currentDate.getDate() - 1)
        } else {
          newDate.setDate(currentDate.getDate() - 7)
        }
        break
      case 'next':
        if (viewMode === 'day') {
          newDate.setDate(currentDate.getDate() + 1)
        } else {
          newDate.setDate(currentDate.getDate() + 7)
        }
        break
      case 'today':
        setCurrentDate(new Date())
        return
    }

    setCurrentDate(newDate)
  }

  const handleViewModeChange = (mode: 'day' | 'week') => {
    // モバイルでは週表示を無効化
    if (isMobile && mode === 'week') {
      return
    }
    setViewMode(mode)
  }

  const getCurrentDayData = () => {
    const today = currentDate.toISOString().split('T')[0]
    return calendarDays.find((day) => day.date === today) || calendarDays[0]
  }

  return (
    <div className={cn('flex flex-col h-full bg-background', className)}>
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onNavigate={handleNavigate}
        className="flex-shrink-0"
      />

      <div className="flex-1 overflow-hidden">
        {viewMode === 'day' ? (
          <div className="h-full overflow-y-auto">
            <DailyCalendar day={getCurrentDayData()} className="min-h-full" />
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <WeeklyCalendar days={calendarDays} className="min-h-full" />
          </div>
        )}
      </div>

      {/* モバイル用の簡単な説明 */}
      {isMobile && (
        <div className="p-2 text-xs text-muted-foreground text-center border-t">
          左右にスワイプして日付を移動
        </div>
      )}
    </div>
  )
}
