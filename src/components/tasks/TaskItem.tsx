'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, PlayCircle, Clock, Edit } from 'lucide-react'
import { TaskItemProps, TaskStatus } from '@/types/task'
import { TaskTimer } from './TaskTimer'
import { TaskActions } from './TaskActions'

const statusIcons: Record<TaskStatus, React.ElementType> = {
  TODO: Circle,
  DOING: PlayCircle,
  DONE: CheckCircle2,
}

const statusColors: Record<TaskStatus, string> = {
  TODO: 'text-muted-foreground',
  DOING: 'text-blue-600 dark:text-blue-400',
  DONE: 'text-green-600 dark:text-green-400',
}

export function TaskItem({
  task,
  onStart,
  onComplete,
  onStatusChange,
  onEdit,
  isActive,
  timer,
}: TaskItemProps) {
  const StatusIcon = statusIcons[task.status]

  const handleStatusClick = () => {
    if (task.status === 'TODO') {
      onStatusChange('DOING')
      onStart()
    } else if (task.status === 'DOING') {
      onStatusChange('DONE')
      onComplete()
    }
  }

  return (
    <Card className={cn('transition-all', isActive && 'ring-2 ring-blue-500')}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <button
              onClick={handleStatusClick}
              className={cn(
                'mt-0.5 transition-colors hover:scale-110',
                statusColors[task.status]
              )}
            >
              <StatusIcon className="h-5 w-5" />
            </button>
            <div className="space-y-1">
              <CardTitle className="text-base font-medium">{task.title}</CardTitle>
              {task.description && (
                <CardDescription className="text-sm">{task.description}</CardDescription>
              )}
            </div>
          </div>
          <TaskActions
            taskId={task.id}
            status={task.status}
            isActive={isActive}
            onStart={onStart}
            onPause={() => onStatusChange('TODO')}
            onComplete={onComplete}
            onEdit={onEdit}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {task.estimatedMinutes && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{task.estimatedMinutes}分</span>
            </div>
          )}
          {task.projectName && (
            <span className="text-xs bg-secondary px-2 py-1 rounded-md">
              {task.projectName}
            </span>
          )}
        </div>
        {isActive && timer && (
          <TaskTimer
            timer={timer}
            estimatedMinutes={task.estimatedMinutes}
            onPause={() => onStatusChange('TODO')}
          />
        )}
      </CardContent>
    </Card>
  )
}