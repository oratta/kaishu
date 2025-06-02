import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CalendarHeaderProps {
  currentDate: Date
  viewMode: 'day' | 'week'
  onViewModeChange: (mode: 'day' | 'week') => void
  onNavigate: (direction: 'prev' | 'next' | 'today') => void
  className?: string
}

export function CalendarHeader({
  currentDate,
  viewMode,
  onViewModeChange,
  onNavigate,
  className,
}: CalendarHeaderProps) {
  const formatDateTitle = () => {
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      })
    } else {
      // 週表示の場合、週の開始日と終了日を表示
      const startOfWeek = getStartOfWeek(currentDate)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.getFullYear()}年${startOfWeek.getMonth() + 1}月 ${startOfWeek.getDate()}日 - ${endOfWeek.getDate()}日`
      } else {
        return `${startOfWeek.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}`
      }
    }
  }

  return (
    <div className={cn('flex items-center justify-between p-4 border-b', className)}>
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-foreground">{formatDateTitle()}</h2>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onNavigate('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={() => onNavigate('today')}>
            <Calendar className="h-4 w-4 mr-2" />
            今日
          </Button>

          <Button variant="outline" size="sm" onClick={() => onNavigate('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant={viewMode === 'day' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange('day')}
        >
          日
        </Button>
        <Button
          variant={viewMode === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange('week')}
        >
          週
        </Button>
      </div>
    </div>
  )
}

function getStartOfWeek(date: Date): Date {
  const result = new Date(date)
  const day = result.getDay()
  const diff = result.getDate() - day + (day === 0 ? -6 : 1) // 月曜日を週の開始とする
  result.setDate(diff)
  return result
}
