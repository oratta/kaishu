import { CalendarDay, TimeBlock as TimeBlockType } from '@/types/calendar'
import { TimeBlock } from './TimeBlock'
import { cn } from '@/lib/utils'

interface DailyCalendarProps {
  day: CalendarDay
  className?: string
}

export function DailyCalendar({ day, className }: DailyCalendarProps) {
  const hours = Array.from({ length: 18 }, (_, i) => i + 6) // 6:00 - 23:00

  const getTimeBlocksForHour = (hour: number) => {
    return day.timeBlocks.filter((block) => {
      const [blockStartHour] = block.startTime.split(':').map(Number)
      const [blockEndHour] = block.endTime.split(':').map(Number)
      return hour >= blockStartHour && hour < blockEndHour
    })
  }

  const getTimeBlockPosition = (block: TimeBlockType, hour: number) => {
    const [blockStartHour, blockStartMinute] = block.startTime.split(':').map(Number)
    const minutesFromHourStart = (blockStartHour - hour) * 60 + blockStartMinute
    return Math.max(0, minutesFromHourStart)
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* 日付ヘッダー */}
      <div
        className={cn(
          'p-3 text-center border-b font-medium',
          day.isToday && 'bg-primary/10 text-primary border-primary/20'
        )}
      >
        <div className="text-sm text-muted-foreground">
          {new Date(day.date).toLocaleDateString('ja-JP', { weekday: 'short' })}
        </div>
        <div className={cn('text-lg font-semibold', day.isToday && 'text-primary')}>
          {new Date(day.date).getDate()}
        </div>
      </div>

      {/* 時間軸とタイムブロック */}
      <div className="flex-1 relative">
        {hours.map((hour) => {
          const timeBlocks = getTimeBlocksForHour(hour)

          return (
            <div key={hour} className="relative border-b border-border/30 h-16">
              {/* 時間ラベル */}
              <div className="absolute left-0 top-0 w-12 h-full flex items-start justify-center pt-1">
                <span className="text-xs text-muted-foreground">
                  {hour.toString().padStart(2, '0')}:00
                </span>
              </div>

              {/* タイムブロック表示エリア */}
              <div className="ml-12 h-full relative">
                {timeBlocks.map((block) => {
                  const position = getTimeBlockPosition(block, hour)
                  const isFirstHourOfBlock = block.startTime.startsWith(
                    hour.toString().padStart(2, '0')
                  )

                  return isFirstHourOfBlock ? (
                    <div
                      key={block.id}
                      className="absolute left-0 right-0"
                      style={{
                        top: `${(position / 60) * 64}px`, // 64px = h-16
                      }}
                    >
                      <TimeBlock timeBlock={block} />
                    </div>
                  ) : null
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
