'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Filter, Grid, List, Search, SortAsc } from 'lucide-react'

export interface ProjectFiltersProps {
  className?: string
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  onFilterChange: (filter: ProjectFilter) => void
  onSortChange: (sort: ProjectSort) => void
  onSearchChange: (search: string) => void
}

export interface ProjectFilter {
  status?: ('active' | 'paused' | 'planned' | 'completed' | 'cancelled')[]
  type?: ('learning' | 'health' | 'work' | 'hobby' | 'relationship' | 'other')[]
}

export interface ProjectSort {
  field: 'name' | 'progress' | 'lastUpdated' | 'weeklyHours'
  direction: 'asc' | 'desc'
}

const statusOptions = [
  { value: 'active', label: '実行中', emoji: '🟢' },
  { value: 'paused', label: '一時停止', emoji: '🟡' },
  { value: 'planned', label: '計画中', emoji: '⚪' },
  { value: 'completed', label: '完了', emoji: '🔵' },
  { value: 'cancelled', label: 'キャンセル', emoji: '🔴' },
]

const typeOptions = [
  { value: 'learning', label: '学習', emoji: '📚' },
  { value: 'health', label: '健康', emoji: '💪' },
  { value: 'work', label: '仕事', emoji: '💼' },
  { value: 'hobby', label: '趣味', emoji: '🎨' },
  { value: 'relationship', label: '人間関係', emoji: '👥' },
  { value: 'other', label: 'その他', emoji: '📌' },
]

const sortOptions = [
  { value: 'name', label: 'プロジェクト名' },
  { value: 'progress', label: '進捗率' },
  { value: 'lastUpdated', label: '最終更新日' },
  { value: 'weeklyHours', label: '週時間' },
]

export function ProjectFilters({
  className,
  viewMode,
  onViewModeChange,
  onFilterChange,
  onSortChange,
  onSearchChange,
}: ProjectFiltersProps) {
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])
  const [sortField, setSortField] = React.useState<ProjectSort['field']>('lastUpdated')
  const [sortDirection, setSortDirection] = React.useState<ProjectSort['direction']>('desc')

  const handleStatusToggle = (status: string) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status]
    setSelectedStatuses(newStatuses)
    onFilterChange({ status: newStatuses as any[], type: selectedTypes as any[] })
  }

  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type]
    setSelectedTypes(newTypes)
    onFilterChange({ status: selectedStatuses as any[], type: newTypes as any[] })
  }

  const handleSortChange = (field: ProjectSort['field']) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortDirection(newDirection)
    onSortChange({ field, direction: newDirection })
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="プロジェクトを検索..."
            className="pl-8"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            フィルター
            {(selectedStatuses.length > 0 || selectedTypes.length > 0) && (
              <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                {selectedStatuses.length + selectedTypes.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>ステータス</DropdownMenuLabel>
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={(e) => {
                e.preventDefault()
                handleStatusToggle(option.value)
              }}
            >
              <span className="mr-2">{option.emoji}</span>
              {option.label}
              {selectedStatuses.includes(option.value) && (
                <span className="ml-auto">✓</span>
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>タイプ</DropdownMenuLabel>
          {typeOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={(e) => {
                e.preventDefault()
                handleTypeToggle(option.value)
              }}
            >
              <span className="mr-2">{option.emoji}</span>
              {option.label}
              {selectedTypes.includes(option.value) && (
                <span className="ml-auto">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <SortAsc className="mr-2 h-4 w-4" />
            並び替え
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => handleSortChange(option.value as ProjectSort['field'])}
            >
              {option.label}
              {sortField === option.value && (
                <span className="ml-auto">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center rounded-lg border">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          className="rounded-r-none"
          onClick={() => onViewModeChange('grid')}
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          className="rounded-l-none"
          onClick={() => onViewModeChange('list')}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}