'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Calendar, Clock, Target, TrendingUp } from 'lucide-react'
import { ProjectProgress } from './ProjectProgress'

export interface ProjectCardProps {
  className?: string
  project: {
    id: string
    name: string
    type: 'learning' | 'health' | 'work' | 'hobby' | 'relationship' | 'other'
    status: 'active' | 'paused' | 'planned' | 'completed' | 'cancelled'
    weeklyTargetHours: number
    weeklyActualHours: number
    progressRate: number
    lastUpdated: Date
  }
  variant?: 'grid' | 'list'
}

const statusColors = {
  active: 'border-green-500 dark:border-green-400',
  paused: 'border-yellow-500 dark:border-yellow-400',
  planned: 'border-gray-500 dark:border-gray-400',
  completed: 'border-blue-500 dark:border-blue-400',
  cancelled: 'border-red-500 dark:border-red-400',
}

const statusEmojis = {
  active: '🟢',
  paused: '🟡',
  planned: '⚪',
  completed: '🔵',
  cancelled: '🔴',
}

const typeIcons = {
  learning: '📚',
  health: '💪',
  work: '💼',
  hobby: '🎨',
  relationship: '👥',
  other: '📌',
}

export function ProjectCard({ className, project, variant = 'grid' }: ProjectCardProps) {
  const isOnTrack = project.weeklyActualHours >= project.weeklyTargetHours * 0.8

  if (variant === 'list') {
    return (
      <Card
        className={cn('transition-all hover:shadow-md', statusColors[project.status], className)}
      >
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{typeIcons[project.type]}</span>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                {project.name}
                <span>{statusEmojis[project.status]}</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                最終更新: {project.lastUpdated.toLocaleDateString('ja-JP')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">週目標 / 実績</p>
              <p className="font-semibold">
                {project.weeklyTargetHours}h / {project.weeklyActualHours}h
              </p>
            </div>
            <ProjectProgress progress={project.progressRate} size="sm" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md border-2',
        statusColors[project.status],
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-xl">{typeIcons[project.type]}</span>
            {project.name}
          </span>
          <span>{statusEmojis[project.status]}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>週目標: {project.weeklyTargetHours}h</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>実績: {project.weeklyActualHours}h</span>
          </div>
        </div>

        <ProjectProgress progress={project.progressRate} showLabel />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp
              className={cn('h-4 w-4', isOnTrack ? 'text-green-500' : 'text-yellow-500')}
            />
            <span
              className={
                isOnTrack
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-yellow-600 dark:text-yellow-400'
              }
            >
              {isOnTrack ? '順調' : '要調整'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{project.lastUpdated.toLocaleDateString('ja-JP')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
