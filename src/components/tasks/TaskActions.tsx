'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Play, Pause, CheckCircle, Edit, MoreVertical } from 'lucide-react'
import { TaskActionsProps } from '@/types/task'

export function TaskActions({
  taskId,
  status,
  isActive,
  onStart,
  onPause,
  onComplete,
  onEdit,
}: TaskActionsProps) {
  const renderPrimaryAction = () => {
    if (status === 'DONE') {
      return null
    }

    if (isActive) {
      return (
        <Button
          variant="outline"
          size="icon"
          onClick={onPause}
          className="h-8 w-8"
        >
          <Pause className="h-4 w-4" />
        </Button>
      )
    }

    if (status === 'TODO') {
      return (
        <Button
          variant="outline"
          size="icon"
          onClick={onStart}
          className="h-8 w-8"
        >
          <Play className="h-4 w-4" />
        </Button>
      )
    }

    return (
      <Button
        variant="outline"
        size="icon"
        onClick={onComplete}
        className="h-8 w-8"
      >
        <CheckCircle className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-1">
      {renderPrimaryAction()}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {status !== 'DOING' && !isActive && (
            <DropdownMenuItem onClick={onStart}>
              <Play className="mr-2 h-4 w-4" />
              開始
            </DropdownMenuItem>
          )}
          {(status === 'DOING' || isActive) && (
            <DropdownMenuItem onClick={onPause}>
              <Pause className="mr-2 h-4 w-4" />
              一時停止
            </DropdownMenuItem>
          )}
          {status !== 'DONE' && (
            <DropdownMenuItem onClick={onComplete}>
              <CheckCircle className="mr-2 h-4 w-4" />
              完了
            </DropdownMenuItem>
          )}
          {onEdit && (
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              編集
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}