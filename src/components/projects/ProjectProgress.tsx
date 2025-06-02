'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ProjectProgressProps {
  className?: string
  progress: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  barColor?: string
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
}

export function ProjectProgress({ 
  className, 
  progress, 
  size = 'md', 
  showLabel = false,
  barColor
}: ProjectProgressProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  
  const getProgressColor = () => {
    if (barColor) return barColor
    if (clampedProgress >= 100) return 'bg-blue-500 dark:bg-blue-400'
    if (clampedProgress >= 80) return 'bg-green-500 dark:bg-green-400'
    if (clampedProgress >= 50) return 'bg-yellow-500 dark:bg-yellow-400'
    return 'bg-red-500 dark:bg-red-400'
  }

  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">進捗率</span>
          <span className="font-medium">{clampedProgress}%</span>
        </div>
      )}
      <div 
        className={cn(
          'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            getProgressColor()
          )}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}