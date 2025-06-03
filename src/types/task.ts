export type TaskStatus = 'TODO' | 'DOING' | 'DONE'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  projectId: string
  projectName?: string
  estimatedMinutes?: number
  actualMinutes?: number
  startedAt?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface TaskTimer {
  taskId: string
  startTime: Date
  elapsedSeconds: number
  isRunning: boolean
}

export interface TaskListProps {
  tasks: Task[]
  onTaskStart: (taskId: string) => void
  onTaskComplete: (taskId: string) => void
  onTaskStatusChange: (taskId: string, status: TaskStatus) => void
  onTaskEdit?: (taskId: string) => void
  activeTaskId?: string
  activeTimer?: TaskTimer
}

export interface TaskItemProps {
  task: Task
  onStart: () => void
  onComplete: () => void
  onStatusChange: (status: TaskStatus) => void
  onEdit?: () => void
  isActive: boolean
  timer?: TaskTimer
}

export interface TaskActionsProps {
  taskId: string
  status: TaskStatus
  isActive: boolean
  onStart: () => void
  onPause: () => void
  onComplete: () => void
  onEdit?: () => void
}

export interface TaskTimerProps {
  timer: TaskTimer
  estimatedMinutes?: number
  onPause: () => void
}