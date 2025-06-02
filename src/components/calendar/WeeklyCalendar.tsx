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
        <div className="w-20 border-r"></div>

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
      <div className="flex-1 flex overflow-y-auto">
        {/* 時間軸 */}
        <div className="w-20 border-r">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-20 border-b border-border/30 flex items-start justify-center pt-1"
            >
              <span className="text-xs text-muted-foreground">
                {hour.toString().padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        {/* 各日のカラム */}
        {days.map((day) => (
          <div key={day.date} className="flex-1 border-r border-border/30 relative">
            {hours.map((hour) => (
              <div key={hour} className="h-20 border-b border-border/30" />
            ))}
            
            {/* タイムブロックを絶対位置で配置 */}
            {day.timeBlocks.map((block) => {
              const [startHour, startMinute] = block.startTime.split(':').map(Number)
              const [endHour, endMinute] = block.endTime.split(':').map(Number)
              
              // 6:00を基準とした位置計算（1時間 = 80px）
              const startOffset = (startHour - 6) * 80 + (startMinute / 60) * 80
              const endOffset = (endHour - 6) * 80 + (endMinute / 60) * 80
              const height = endOffset - startOffset

              return (
                <div
                  key={block.id}
                  className="absolute left-2 right-2"
                  style={{
                    top: `${startOffset}px`,
                    height: `${height}px`,
                  }}
                >
                  <div
                    className={cn(
                      'h-full rounded p-2 text-white text-xs font-medium shadow-sm',
                      'cursor-pointer transition-all hover:shadow-md',
                      'flex flex-col items-center justify-center text-center',
                      block.color
                    )}
                  >
                    <div className="font-semibold">{block.title}</div>
                    {height >= 40 && (
                      <div className="text-xs opacity-90 mt-1">
                        {block.startTime}-{block.endTime}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

