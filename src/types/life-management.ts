export interface LifeGoal {
  id: string
  name: string
  description: string
  status: 0 | 1 | 2 | 3 | 10 | 11
  priority: 1 | 2 | 3 | 4 | 5
  targetCompletionDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface GoalCondition {
  id: string
  lifeGoalId: string
  name: string
  description?: string
  status: 1 | 2 | 3 | 10 | 11 | 12
  displayOrder: number
  prerequisiteConditionId?: string
  estimatedCompletionWeeks?: number
}

export interface Project {
  id: string
  goalConditionId: string
  name: string
  type: 'learning' | 'health' | 'work' | 'hobby' | 'relationship' | 'other'
  description?: string
  status: 1 | 2 | 3 | 10 | 11
  weeklyTargetHours?: number
  weeklyFreeTimePercentage?: number
  startDate?: Date
  targetEndDate?: Date
  actualEndDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface TimeBlock {
  id: string
  projectId: string
  milestoneId?: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  actualStartTime?: Date
  actualEndTime?: Date
  plannedTasks?: any[]
  actualTasks?: any[]
  sessionNotes?: string
  energyLevel?: 1 | 2 | 3 | 4 | 5
  status: 'scheduled' | 'in_progress' | 'completed' | 'skipped' | 'cancelled'
}

export interface Task {
  id: string
  projectId: string
  milestoneId?: string
  timeBlockId?: string
  title: string
  description?: string
  estimatedDuration?: number
  actualDuration?: number
  status: 'todo' | 'in_progress' | 'completed' | 'carried_over' | 'cancelled'
  priority: 1 | 2 | 3 | 4 | 5
  carriedFrom?: string
  dependsOn?: string
  createdBy: 'user' | 'llm'
  startedAt?: Date
  completedAt?: Date
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface LLMConversation {
  id: string
  sessionId?: string
  type:
    | 'goal_setting'
    | 'task_generation'
    | 'schedule_adjustment'
    | 'project_planning'
    | 'habit_coaching'
    | 'general_chat'
    | 'analysis'
  title?: string
  context?: any
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>
  outcome?: any
  outcomeType?: 'projects' | 'tasks' | 'schedule' | 'insights' | 'plans'
  llmModel?: string
  llmVersion?: string
  totalTokens?: number
  promptTokens?: number
  completionTokens?: number
  responseTimeMs?: number
  userRating?: 1 | 2 | 3 | 4 | 5
  userFeedback?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserContext {
  currentProjects: Project[]
  todayTasks: Task[]
  availableTime: number
  energyLevel: 1 | 2 | 3 | 4 | 5
  preferences: UserPreferences
}

export interface UserPreferences {
  workingHours: {
    start: string
    end: string
  }
  workingDays: string[]
  preferredBreakDuration: number
  loadLevel: 'relaxed' | 'normal' | 'intensive'
}
