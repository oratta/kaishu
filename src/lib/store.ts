import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  LifeGoal,
  Project,
  TimeBlock,
  Task,
  LLMConversation,
  UserPreferences,
} from '@/types/life-management'

interface AppState {
  // User preferences
  userPreferences: UserPreferences
  setUserPreferences: (preferences: UserPreferences) => void

  // Life goals
  lifeGoals: LifeGoal[]
  setLifeGoals: (goals: LifeGoal[]) => void
  addLifeGoal: (goal: LifeGoal) => void
  updateLifeGoal: (id: string, updates: Partial<LifeGoal>) => void

  // Projects
  projects: Project[]
  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void

  // Time blocks
  timeBlocks: TimeBlock[]
  setTimeBlocks: (blocks: TimeBlock[]) => void
  addTimeBlock: (block: TimeBlock) => void
  updateTimeBlock: (id: string, updates: Partial<TimeBlock>) => void

  // Tasks
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void

  // LLM conversations
  conversations: LLMConversation[]
  addConversation: (conversation: LLMConversation) => void
  updateConversation: (id: string, updates: Partial<LLMConversation>) => void

  // UI state
  isLLMChatOpen: boolean
  setLLMChatOpen: (open: boolean) => void
  currentView: 'dashboard' | 'projects' | 'tasks' | 'habits' | 'calendar'
  setCurrentView: (view: 'dashboard' | 'projects' | 'tasks' | 'habits' | 'calendar') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial user preferences
      userPreferences: {
        workingHours: { start: '09:00', end: '18:00' },
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        preferredBreakDuration: 15,
        loadLevel: 'normal',
      },
      setUserPreferences: (preferences) => set({ userPreferences: preferences }),

      // Life goals
      lifeGoals: [],
      setLifeGoals: (goals) => set({ lifeGoals: goals }),
      addLifeGoal: (goal) => set((state) => ({ lifeGoals: [...state.lifeGoals, goal] })),
      updateLifeGoal: (id, updates) =>
        set((state) => ({
          lifeGoals: state.lifeGoals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          ),
        })),

      // Projects
      projects: [],
      setProjects: (projects) => set({ projects }),
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updates } : project
          ),
        })),

      // Time blocks
      timeBlocks: [],
      setTimeBlocks: (blocks) => set({ timeBlocks: blocks }),
      addTimeBlock: (block) => set((state) => ({ timeBlocks: [...state.timeBlocks, block] })),
      updateTimeBlock: (id, updates) =>
        set((state) => ({
          timeBlocks: state.timeBlocks.map((block) =>
            block.id === id ? { ...block, ...updates } : block
          ),
        })),

      // Tasks
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        })),

      // LLM conversations
      conversations: [],
      addConversation: (conversation) =>
        set((state) => ({
          conversations: [...state.conversations, conversation],
        })),
      updateConversation: (id, updates) =>
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === id ? { ...conv, ...updates } : conv
          ),
        })),

      // UI state
      isLLMChatOpen: false,
      setLLMChatOpen: (open) => set({ isLLMChatOpen: open }),
      currentView: 'dashboard',
      setCurrentView: (view) => set({ currentView: view }),
    }),
    {
      name: 'kaishu-app-storage',
    }
  )
)
