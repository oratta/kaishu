import { Calendar } from '@/components/calendar/Calendar'
import { ThemeToggle } from '@/components/theme-toggle'

export default function CalendarPage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* ヘッダー */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">📅 カレンダー</h1>
        <ThemeToggle />
      </div>

      {/* カレンダーメインエリア */}
      <div className="flex-1 overflow-hidden">
        <Calendar />
      </div>
    </div>
  )
}
