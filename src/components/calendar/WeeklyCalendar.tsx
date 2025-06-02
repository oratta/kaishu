import { CalendarDay } from '@/types/calendar'
import { cn } from '@/lib/utils'

interface WeeklyCalendarProps {
  days: CalendarDay[]
  className?: string
}

export function WeeklyCalendar({ days, className }: WeeklyCalendarProps) {
  const hours = Array.from({ length: 18 }, (_, i) => i + 6) // 6:00 - 23:00
  const weekdays = ['月', '火', '水', '木', '金', '土', '日']

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* 週表示ヘッダー */}
      <div className="flex border-b">
        {/* 時間軸のスペース */}
        <div className="w-16 border-r"></div>

        {/* 各日のヘッダー */}
        {days.map((day, index) => (
          <div
            key={day.date}
            className={cn(
              'flex-1 p-3 text-center border-r border-border/30',
              day.isToday && 'bg-primary/10 border-primary/20'
            )}
          >
            <div className="text-sm text-muted-foreground">{weekdays[index]}</div>
            <div className={cn('text-lg font-semibold', day.isToday && 'text-primary')}>
              {new Date(day.date).getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* 週表示カレンダーグリッド */}
      <div className="flex-1 flex">
        {/* 時間軸 */}
        <div className="w-16 border-r">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 border-b border-border/30 flex items-start justify-center pt-1"
            >
              <span className="text-xs text-muted-foreground">
                {hour.toString().padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        {/* 各日のカラム */}
        {days.map((day) => (
          <div key={day.date} className="flex-1 border-r border-border/30">
            {hours.map((hour) => {
              const timeBlocks = day.timeBlocks.filter((block) => {
                const [blockStartHour] = block.startTime.split(':').map(Number)
                const [blockEndHour] = block.endTime.split(':').map(Number)
                return hour >= blockStartHour && hour < blockEndHour
              })

              const getTimeBlockPosition = (block: { startTime: string }) => {
                const [blockStartHour, blockStartMinute] = block.startTime.split(':').map(Number)
                const minutesFromHourStart = (blockStartHour - hour) * 60 + blockStartMinute
                return Math.max(0, minutesFromHourStart)
              }

              return (
                <div key={hour} className="relative h-16 border-b border-border/30">
                  {timeBlocks.map((block) => {
                    const position = getTimeBlockPosition(block)
                    const isFirstHourOfBlock = block.startTime.startsWith(
                      hour.toString().padStart(2, '0')
                    )

                    return isFirstHourOfBlock ? (
                      <div
                        key={block.id}
                        className="absolute left-1 right-1"
                        style={{
                          top: `${(position / 60) * 64}px`, // 64px = h-16
                        }}
                      >
                        <div
                          className={cn(
                            'rounded p-1 text-white text-xs font-medium shadow-sm',
                            'cursor-pointer transition-all hover:shadow-md',
                            'truncate',
                            block.color
                          )}
                          style={{
                            height: `${calculateBlockHeight(block)}px`,
                          }}
                        >
                          <div className="truncate">{block.title}</div>
                          <div className="text-xs opacity-90 truncate">
                            {block.startTime}-{block.endTime}
                          </div>
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function calculateBlockHeight(block: { startTime: string; endTime: string }): number {
  const [startHour, startMinute] = block.startTime.split(':').map(Number)
  const [endHour, endMinute] = block.endTime.split(':').map(Number)

  const startMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute
  const durationMinutes = endMinutes - startMinutes

  return Math.max(32, (durationMinutes / 60) * 64) // 最小32px、1時間=64px
}
