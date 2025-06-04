'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Pause } from 'lucide-react'
import { TaskTimerProps } from '@/types/task'
import { cn } from '@/lib/utils'

export function TaskTimer({ timer, estimatedMinutes, onPause }: TaskTimerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(timer.elapsedSeconds)

  useEffect(() => {
    if (!timer.isRunning) return

    const interval = setInterval(() => {
      const now = new Date()
      const elapsed = Math.floor((now.getTime() - timer.startTime.getTime()) / 1000)
      setElapsedSeconds(elapsed + timer.elapsedSeconds)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = estimatedMinutes
    ? Math.min((elapsedSeconds / (estimatedMinutes * 60)) * 100, 100)
    : 0

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">⏱️ 進行中</p>
          <p className="text-2xl font-mono font-semibold">{formatTime(elapsedSeconds)}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onPause} className="gap-2">
          <Pause className="h-4 w-4" />
          一時停止
        </Button>
      </div>

      {estimatedMinutes && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              経過時間: {Math.floor(elapsedSeconds / 60)}分 / 目標{estimatedMinutes}分
            </span>
            <span>進捗: {Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-300',
                progressPercentage < 100 ? 'bg-blue-500' : 'bg-orange-500'
              )}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
