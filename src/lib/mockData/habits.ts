export interface Habit {
  id: string
  projectId: string
  milestoneId?: string
  name: string
  type: 'daily' | 'weekly' | 'count_based'
  target: {
    daily?: { count: number; unit: string }
    weekly?: { count: number; unit: string }
    countBased?: {
      action: string
      trackingType: 'streak' | 'total'
    }
  }
  tracking: HabitTracking
  reminders: Reminder[]
  createdAt: Date
  isActive: boolean
}

export interface HabitTracking {
  todayStatus: 'pending' | 'completed' | 'failed'
  streak: number
  totalCount: number
  history: HabitRecord[]
  successRate: number
  lastCompletedAt?: Date
}

export interface HabitRecord {
  date: Date
  status: 'completed' | 'failed' | 'skipped'
  value?: number
  note?: string
}

export interface Reminder {
  id: string
  time: string
  days: number[]
  message: string
  isActive: boolean
}

export const mockHabits: Habit[] = [
  {
    id: 'habit-1',
    projectId: 'english-learning',
    milestoneId: 'milestone-eng-1',
    name: '毎日の英単語学習',
    type: 'daily',
    target: {
      daily: { count: 20, unit: '単語' },
    },
    tracking: {
      todayStatus: 'completed',
      streak: 15,
      totalCount: 300,
      successRate: 0.88,
      lastCompletedAt: new Date('2025-06-03T08:00:00'),
      history: generateHabitHistory(30, 0.88),
    },
    reminders: [
      {
        id: 'reminder-1',
        time: '07:30',
        days: [1, 2, 3, 4, 5, 6, 7],
        message: '英単語学習の時間です！今日の20単語を覚えましょう',
        isActive: true,
      },
    ],
    createdAt: new Date('2025-05-01'),
    isActive: true,
  },
  {
    id: 'habit-2',
    projectId: 'english-learning',
    milestoneId: 'milestone-eng-1',
    name: 'シャドーイング練習',
    type: 'daily',
    target: {
      daily: { count: 15, unit: '分' },
    },
    tracking: {
      todayStatus: 'pending',
      streak: 8,
      totalCount: 25,
      successRate: 0.75,
      lastCompletedAt: new Date('2025-06-02T19:00:00'),
      history: generateHabitHistory(30, 0.75),
    },
    reminders: [
      {
        id: 'reminder-2',
        time: '19:00',
        days: [1, 2, 3, 4, 5],
        message: 'シャドーイング練習の時間です',
        isActive: true,
      },
    ],
    createdAt: new Date('2025-05-05'),
    isActive: true,
  },
  {
    id: 'habit-3',
    projectId: 'english-learning',
    milestoneId: 'milestone-eng-2',
    name: 'オンライン英会話',
    type: 'weekly',
    target: {
      weekly: { count: 3, unit: '回' },
    },
    tracking: {
      todayStatus: 'pending',
      streak: 4,
      totalCount: 12,
      successRate: 0.8,
      lastCompletedAt: new Date('2025-06-01T20:00:00'),
      history: generateWeeklyHabitHistory(8, 0.8),
    },
    reminders: [
      {
        id: 'reminder-3',
        time: '20:00',
        days: [1, 3, 5],
        message: 'オンライン英会話の予約確認',
        isActive: true,
      },
    ],
    createdAt: new Date('2025-04-15'),
    isActive: true,
  },
  {
    id: 'habit-5',
    projectId: 'web-development',
    milestoneId: 'milestone-dev-2',
    name: 'コードレビュー',
    type: 'daily',
    target: {
      daily: { count: 30, unit: '分' },
    },
    tracking: {
      todayStatus: 'completed',
      streak: 10,
      totalCount: 20,
      successRate: 0.67,
      lastCompletedAt: new Date('2025-06-03T11:00:00'),
      history: generateHabitHistory(30, 0.67),
    },
    reminders: [],
    createdAt: new Date('2025-05-10'),
    isActive: true,
  },
  {
    id: 'habit-6',
    projectId: 'exercise-habit',
    milestoneId: 'milestone-ex-1',
    name: '筋力トレーニング',
    type: 'weekly',
    target: {
      weekly: { count: 3, unit: '回' },
    },
    tracking: {
      todayStatus: 'pending',
      streak: 3,
      totalCount: 15,
      successRate: 0.75,
      lastCompletedAt: new Date('2025-06-01T19:30:00'),
      history: generateWeeklyHabitHistory(8, 0.75),
    },
    reminders: [
      {
        id: 'reminder-6',
        time: '18:30',
        days: [1, 3, 5],
        message: '筋トレの時間です！今日は上半身の日',
        isActive: true,
      },
    ],
    createdAt: new Date('2025-04-01'),
    isActive: true,
  },
  {
    id: 'habit-7',
    projectId: 'exercise-habit',
    milestoneId: 'milestone-ex-1',
    name: '有酸素運動',
    type: 'weekly',
    target: {
      weekly: { count: 2, unit: '回' },
    },
    tracking: {
      todayStatus: 'pending',
      streak: 2,
      totalCount: 10,
      successRate: 0.7,
      lastCompletedAt: new Date('2025-05-30T07:00:00'),
      history: generateWeeklyHabitHistory(8, 0.7),
    },
    reminders: [
      {
        id: 'reminder-7',
        time: '06:30',
        days: [2, 4],
        message: 'ランニングまたはサイクリング',
        isActive: true,
      },
    ],
    createdAt: new Date('2025-04-01'),
    isActive: true,
  },
  {
    id: 'habit-8',
    projectId: 'reading-habit',
    milestoneId: 'milestone-read-1',
    name: '朝の読書',
    type: 'daily',
    target: {
      daily: { count: 30, unit: '分' },
    },
    tracking: {
      todayStatus: 'completed',
      streak: 20,
      totalCount: 50,
      successRate: 0.91,
      lastCompletedAt: new Date('2025-06-03T06:55:00'),
      history: generateHabitHistory(60, 0.91),
    },
    reminders: [
      {
        id: 'reminder-8',
        time: '05:50',
        days: [1, 2, 3, 4, 5, 6, 7],
        message: '読書の時間です。今日も30分頑張りましょう！',
        isActive: true,
      },
    ],
    createdAt: new Date('2025-04-01'),
    isActive: true,
  },
  {
    id: 'habit-9',
    projectId: 'reading-habit',
    name: '読書メモ作成',
    type: 'count_based',
    target: {
      countBased: {
        action: '読書メモを1つ作成',
        trackingType: 'total',
      },
    },
    tracking: {
      todayStatus: 'pending',
      streak: 0,
      totalCount: 25,
      successRate: 0.6,
      lastCompletedAt: new Date('2025-06-01T07:30:00'),
      history: generateHabitHistory(30, 0.6, 'count_based'),
    },
    reminders: [],
    createdAt: new Date('2025-04-15'),
    isActive: true,
  },
]

function generateHabitHistory(
  days: number,
  successRate: number,
  type: 'daily' | 'weekly' | 'count_based' = 'daily'
): HabitRecord[] {
  const history: HabitRecord[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const random = Math.random()
    let status: HabitRecord['status']

    if (random < successRate) {
      status = 'completed'
    } else if (random < successRate + 0.1) {
      status = 'skipped'
    } else {
      status = 'failed'
    }

    const record: HabitRecord = {
      date,
      status,
    }

    if (type === 'count_based' && status === 'completed') {
      record.value = Math.floor(Math.random() * 3) + 1
    }

    history.push(record)
  }

  return history
}

function generateWeeklyHabitHistory(weeks: number, successRate: number): HabitRecord[] {
  const history: HabitRecord[] = []
  const today = new Date()

  for (let w = weeks - 1; w >= 0; w--) {
    const weekStart = new Date(today)
    weekStart.setDate(weekStart.getDate() - w * 7)

    const completedDays = Math.floor(Math.random() * 4) + (Math.random() < successRate ? 2 : 0)

    for (let d = 0; d < 7; d++) {
      if (d < completedDays) {
        const date = new Date(weekStart)
        date.setDate(date.getDate() + d)
        history.push({
          date,
          status: 'completed',
        })
      }
    }
  }

  return history
}

export function getHabitsByProject(projectId: string): Habit[] {
  return mockHabits.filter((habit) => habit.projectId === projectId)
}

export function getActiveHabits(): Habit[] {
  return mockHabits.filter((habit) => habit.isActive)
}

export function getTodaysPendingHabits(): Habit[] {
  return mockHabits.filter((habit) => habit.isActive && habit.tracking.todayStatus === 'pending')
}

export function getHabitStreak(habitId: string): number {
  const habit = mockHabits.find((h) => h.id === habitId)
  return habit?.tracking.streak || 0
}

export function getHabitSuccessRate(habitId: string): number {
  const habit = mockHabits.find((h) => h.id === habitId)
  return habit?.tracking.successRate || 0
}
