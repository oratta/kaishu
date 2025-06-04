// Re-export all mock data modules
export * from './projects'
export * from './tasks'
export * from './timeBlocks'
export * from './conversations'
export * from './habits'

// Aggregate exports for convenience
import { mockLifeGoals, mockProjects } from './projects'
import { mockTasks } from './tasks'
import { mockTimeBlocks } from './timeBlocks'
import { mockConversations } from './conversations'
import { mockHabits } from './habits'

export const mockData = {
  lifeGoals: mockLifeGoals,
  projects: mockProjects,
  tasks: mockTasks,
  timeBlocks: mockTimeBlocks,
  conversations: mockConversations,
  habits: mockHabits,
}

// Statistics helpers
export function getMockDataStats() {
  return {
    lifeGoals: mockLifeGoals.length,
    projects: mockProjects.length,
    tasks: mockTasks.length,
    timeBlocks: mockTimeBlocks.length,
    conversations: mockConversations.length,
    habits: mockHabits.length,
    activeTasks: mockTasks.filter((t) => t.status === 'DOING').length,
    completedTasks: mockTasks.filter((t) => t.status === 'DONE').length,
    activeHabits: mockHabits.filter((h) => h.isActive).length,
  }
}
