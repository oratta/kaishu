'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EventInput } from '@fullcalendar/core'
import { cn } from '@/lib/utils'

interface CalendarProps {
  events: EventInput[]
  className?: string
  onEventClick?: (info: any) => void
  onDateClick?: (info: any) => void
}

export function Calendar({ events, className, onEventClick, onDateClick }: CalendarProps) {
  return (
    <div className={cn('h-full', className)}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        locale="ja"
        firstDay={1} // 月曜日始まり
        slotMinTime="06:00:00"
        slotMaxTime="24:00:00"
        slotDuration="01:00:00"
        height="100%"
        events={events}
        eventClick={onEventClick}
        dateClick={onDateClick}
        editable={true}
        droppable={true}
        eventDisplay="block"
        dayMaxEvents={false}
        nowIndicator={true}
        allDaySlot={false}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        dayCellContent={(info) => {
          const dayNumber = info.dayNumberText.replace('日', '')
          return dayNumber
        }}
      />
    </div>
  )
}
