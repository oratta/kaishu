export interface TimeBlock {
  id: string
  title: string
  projectId: string
  projectName: string
  startTime: string // HH:MM format
  endTime: string // HH:MM format
  date: string // YYYY-MM-DD format
  color: string
  description?: string
}

export interface Project {
  id: string
  name: string
  color: string
  textColor?: string
  type: 'learning' | 'development' | 'exercise' | 'work' | 'personal' | 'hobby'
}

export interface CalendarDay {
  date: string // YYYY-MM-DD format
  dayOfWeek: number // 0 = Sunday, 6 = Saturday
  isToday: boolean
  timeBlocks: TimeBlock[]
}
