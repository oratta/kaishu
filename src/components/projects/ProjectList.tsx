'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ProjectCard } from './ProjectCard'
import { ProjectFilters, ProjectFilter, ProjectSort } from './ProjectFilters'

export interface ProjectListProps {
  className?: string
  projects: {
    id: string
    name: string
    type: 'learning' | 'health' | 'work' | 'hobby' | 'relationship' | 'other'
    status: 'active' | 'paused' | 'planned' | 'completed' | 'cancelled'
    weeklyTargetHours: number
    weeklyActualHours: number
    progressRate: number
    lastUpdated: Date
  }[]
}

export function ProjectList({ className, projects }: ProjectListProps) {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filter, setFilter] = React.useState<ProjectFilter>({})
  const [sort, setSort] = React.useState<ProjectSort>({
    field: 'lastUpdated',
    direction: 'desc',
  })

  const filteredAndSortedProjects = React.useMemo(() => {
    let filtered = [...projects]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply status filter
    if (filter.status && filter.status.length > 0) {
      filtered = filtered.filter((project) => filter.status!.includes(project.status))
    }

    // Apply type filter
    if (filter.type && filter.type.length > 0) {
      filtered = filtered.filter((project) => filter.type!.includes(project.type))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sort.field) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'progress':
          aValue = a.progressRate
          bValue = b.progressRate
          break
        case 'lastUpdated':
          aValue = a.lastUpdated.getTime()
          bValue = b.lastUpdated.getTime()
          break
        case 'weeklyHours':
          aValue = a.weeklyActualHours
          bValue = b.weeklyActualHours
          break
      }

      if (typeof aValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return sort.direction === 'asc' ? aValue - bValue : bValue - aValue
    })

    return filtered
  }, [projects, searchQuery, filter, sort])

  return (
    <div className={cn('space-y-4', className)}>
      <ProjectFilters
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onFilterChange={setFilter}
        onSortChange={setSort}
        onSearchChange={setSearchQuery}
      />

      {filteredAndSortedProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery || filter.status?.length || filter.type?.length
              ? '該当するプロジェクトが見つかりません'
              : 'プロジェクトがありません'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="list" />
          ))}
        </div>
      )}
    </div>
  )
}
