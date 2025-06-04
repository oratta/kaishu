'use client'

import React from 'react'
import { TaskItem } from './TaskItem'
import { TaskListProps, TaskStatus } from '@/types/task'
import { cn } from '@/lib/utils'

export function TaskList({
  tasks,
  onTaskStart,
  onTaskComplete,
  onTaskStatusChange,
  onTaskEdit,
  activeTaskId,
  activeTimer,
}: TaskListProps) {
  const groupedTasks = React.useMemo(() => {
    const groups: Record<TaskStatus, typeof tasks> = {
      TODO: [],
      DOING: [],
      DONE: [],
    }

    tasks.forEach((task) => {
      groups[task.status].push(task)
    })

    return groups
  }, [tasks])

  const statusLabels: Record<TaskStatus, string> = {
    TODO: 'TODO',
    DOING: 'DOING',
    DONE: 'DONE',
  }

  const statusStyles: Record<TaskStatus, string> = {
    TODO: 'bg-gray-100 dark:bg-gray-800',
    DOING: 'bg-blue-50 dark:bg-blue-950',
    DONE: 'bg-green-50 dark:bg-green-950',
  }

  return (
    <div className="space-y-6">
      {(Object.keys(groupedTasks) as TaskStatus[]).map((status) => (
        <div key={status} className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-muted-foreground">{statusLabels[status]}</h3>
            <span className="text-xs text-muted-foreground">({groupedTasks[status].length})</span>
          </div>
          <div className={cn('rounded-lg p-4 space-y-3', statusStyles[status])}>
            {groupedTasks[status].length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">タスクがありません</p>
            ) : (
              groupedTasks[status].map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStart={() => onTaskStart(task.id)}
                  onComplete={() => onTaskComplete(task.id)}
                  onStatusChange={(newStatus) => onTaskStatusChange(task.id, newStatus)}
                  onEdit={onTaskEdit ? () => onTaskEdit(task.id) : undefined}
                  isActive={activeTaskId === task.id}
                  timer={activeTaskId === task.id ? activeTimer : undefined}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
