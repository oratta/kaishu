import { TimeBlock as TimeBlockType } from '@/types/calendar'
import { cn } from '@/lib/utils'

interface TimeBlockProps {
  timeBlock: TimeBlockType
  className?: string
}

export function TimeBlock({ timeBlock, className }: TimeBlockProps) {
  const duration = calculateDuration(timeBlock.startTime, timeBlock.endTime)

  return (
    <div
      className={cn(
        'rounded-md p-2 text-white text-sm shadow-sm',
        'cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]',
        'dark:shadow-lg',
        'flex items-center justify-center',
        timeBlock.color,
        className
      )}
      style={{
        height: `${duration * 60}px`, // 1時間 = 60px
      }}
    >
      <div className="text-center">
        <div className="font-semibold">{timeBlock.title}</div>
        {duration >= 1 && (
          <div className="text-xs opacity-90 mt-1">
            {timeBlock.startTime} - {timeBlock.endTime}
          </div>
        )}
        {timeBlock.description && duration >= 1.5 && (
          <div className="text-xs opacity-80 mt-1">{timeBlock.description}</div>
        )}
      </div>
    </div>
  )
}

function calculateDuration(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  const startMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute

  return (endMinutes - startMinutes) / 60 // 時間で返す
}
