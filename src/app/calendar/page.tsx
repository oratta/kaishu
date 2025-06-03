'use client'

import { Calendar } from '@/components/calendar/FullCalendar'
import { generateMockTimeBlocks, convertToFullCalendarEvents } from '@/lib/mockData'
import { ThemeToggle } from '@/components/theme-toggle'
import { useState, useCallback } from 'react'

export default function CalendarPage() {
  const timeBlocks = generateMockTimeBlocks()
  const events = convertToFullCalendarEvents(timeBlocks)

  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const handleEventClick = useCallback((info: any) => {
    setSelectedEvent(info.event)
    console.log('Event clicked:', info.event)
  }, [])

  const handleDateClick = useCallback((info: any) => {
    console.log('Date clicked:', info.dateStr)
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* ヘッダー */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">📅 カレンダー</h1>
        <ThemeToggle />
      </div>

      {/* カレンダーメインエリア */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="h-full bg-card rounded-lg border">
          <Calendar events={events} onEventClick={handleEventClick} onDateClick={handleDateClick} />
        </div>
      </div>
    </div>
  )
}
