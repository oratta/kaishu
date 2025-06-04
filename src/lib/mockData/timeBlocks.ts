import { TimeBlock } from '@/types/calendar'

export interface ExtendedTimeBlock extends TimeBlock {
  actualStartTime?: string
  actualEndTime?: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'skipped'
  completedTasks?: string[]
  notes?: string
  energyLevel?: 1 | 2 | 3 | 4 | 5
  focusQuality?: 1 | 2 | 3 | 4 | 5
}

export interface TimeBlockTemplate {
  id: string
  name: string
  projectId: string
  defaultDuration: number
  preferredTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'any'
  recurringDays?: number[]
  description: string
}

export const timeBlockTemplates: TimeBlockTemplate[] = [
  {
    id: 'template-1',
    name: '朝の英語学習',
    projectId: 'english-learning',
    defaultDuration: 120,
    preferredTimeOfDay: 'morning',
    recurringDays: [1, 2, 3, 4, 5],
    description: 'リスニング・スピーキング練習を中心に',
  },
  {
    id: 'template-2',
    name: '開発作業（集中）',
    projectId: 'web-development',
    defaultDuration: 120,
    preferredTimeOfDay: 'morning',
    recurringDays: [1, 2, 3, 4, 5],
    description: '難しい実装や設計作業',
  },
  {
    id: 'template-3',
    name: '開発作業（通常）',
    projectId: 'web-development',
    defaultDuration: 120,
    preferredTimeOfDay: 'afternoon',
    recurringDays: [1, 2, 3, 4, 5],
    description: '通常の実装作業やレビュー',
  },
  {
    id: 'template-4',
    name: '夕方の運動',
    projectId: 'exercise-habit',
    defaultDuration: 60,
    preferredTimeOfDay: 'evening',
    recurringDays: [1, 2, 3, 4, 5],
    description: '筋トレまたは有酸素運動',
  },
  {
    id: 'template-5',
    name: '朝の読書',
    projectId: 'reading-habit',
    defaultDuration: 60,
    preferredTimeOfDay: 'morning',
    recurringDays: [1, 2, 3, 4, 5, 6, 7],
    description: '技術書やビジネス書の読書',
  },
]

function getWeekDates(): string[] {
  const today = new Date()
  const currentDay = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1))

  const weekDates = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    weekDates.push(date.toISOString().split('T')[0])
  }
  return weekDates
}

function createExtendedTimeBlock(
  id: string,
  projectId: string,
  startTime: string,
  endTime: string,
  date: string,
  status: ExtendedTimeBlock['status'] = 'scheduled',
  additionalProps?: Partial<ExtendedTimeBlock>
): ExtendedTimeBlock {
  const projectMap: Record<string, { name: string; color: string }> = {
    'english-learning': { name: '英語学習', color: 'bg-blue-500' },
    'web-development': { name: 'Web開発スキル向上', color: 'bg-green-500' },
    'exercise-habit': { name: '運動習慣確立', color: 'bg-red-500' },
    'reading-habit': { name: '読書習慣', color: 'bg-purple-500' },
    'ai-tool-dev': { name: 'AIツール開発', color: 'bg-indigo-500' },
  }

  const project = projectMap[projectId]

  return {
    id,
    title: project.name,
    projectId,
    projectName: project.name,
    startTime,
    endTime,
    date,
    color: project.color,
    status,
    ...additionalProps,
  }
}

export const mockTimeBlocks: ExtendedTimeBlock[] = (() => {
  const weekDates = getWeekDates()
  const today = new Date().toISOString().split('T')[0]
  const blocks: ExtendedTimeBlock[] = []

  // 過去の完了済みタイムブロック（月曜日）
  if (weekDates[0] < today) {
    blocks.push(
      createExtendedTimeBlock(
        'tb-mon-reading',
        'reading-habit',
        '06:00',
        '07:00',
        weekDates[0],
        'completed',
        {
          actualStartTime: '06:05',
          actualEndTime: '07:00',
          completedTasks: ['task-30'],
          energyLevel: 4,
          focusQuality: 5,
          notes: '集中して読めた。朝の読書は効率が良い',
        }
      ),
      createExtendedTimeBlock(
        'tb-mon-english',
        'english-learning',
        '07:00',
        '09:00',
        weekDates[0],
        'completed',
        {
          actualStartTime: '07:10',
          actualEndTime: '09:05',
          completedTasks: ['task-1'],
          energyLevel: 4,
          focusQuality: 4,
          notes: 'TOEIC模試完了。リスニングが予想より難しかった',
        }
      ),
      createExtendedTimeBlock(
        'tb-mon-dev-morning',
        'web-development',
        '10:00',
        '12:00',
        weekDates[0],
        'completed',
        {
          actualStartTime: '10:00',
          actualEndTime: '12:15',
          completedTasks: ['task-10'],
          energyLevel: 5,
          focusQuality: 5,
          notes: 'App Routerの理解が深まった',
        }
      ),
      createExtendedTimeBlock(
        'tb-mon-dev-afternoon',
        'web-development',
        '13:00',
        '15:00',
        weekDates[0],
        'skipped',
        {
          notes: '急な会議が入ったためスキップ',
        }
      ),
      createExtendedTimeBlock(
        'tb-mon-exercise',
        'exercise-habit',
        '19:00',
        '20:00',
        weekDates[0],
        'completed',
        {
          actualStartTime: '19:15',
          actualEndTime: '20:10',
          energyLevel: 3,
          focusQuality: 4,
          notes: '上半身トレーニング完了。次回は重量を増やす',
        }
      )
    )
  }

  // 今日のタイムブロック
  const todayIndex = weekDates.indexOf(today)
  if (todayIndex >= 0) {
    const currentHour = new Date().getHours()

    blocks.push(
      createExtendedTimeBlock(
        'tb-today-reading',
        'reading-habit',
        '06:00',
        '07:00',
        today,
        currentHour >= 7 ? 'completed' : 'scheduled',
        currentHour >= 7
          ? {
              actualStartTime: '06:00',
              actualEndTime: '06:55',
              energyLevel: 4,
              focusQuality: 4,
            }
          : undefined
      ),
      createExtendedTimeBlock(
        'tb-today-english',
        'english-learning',
        '07:00',
        '09:00',
        today,
        currentHour < 7 ? 'scheduled' : currentHour < 9 ? 'in_progress' : 'completed',
        currentHour >= 7
          ? {
              actualStartTime: '07:00',
              completedTasks: currentHour >= 9 ? ['task-2'] : undefined,
              energyLevel: 4,
              focusQuality: 4,
            }
          : undefined
      ),
      createExtendedTimeBlock(
        'tb-today-dev-morning',
        'web-development',
        '10:00',
        '12:00',
        today,
        currentHour < 10 ? 'scheduled' : currentHour < 12 ? 'in_progress' : 'completed'
      ),
      createExtendedTimeBlock(
        'tb-today-dev-afternoon',
        'web-development',
        '13:00',
        '15:00',
        today,
        currentHour < 13 ? 'scheduled' : currentHour < 15 ? 'in_progress' : 'completed'
      ),
      createExtendedTimeBlock(
        'tb-today-exercise',
        'exercise-habit',
        '19:00',
        '20:00',
        today,
        'scheduled'
      )
    )
  }

  // 未来のスケジュール済みタイムブロック
  weekDates.forEach((date, index) => {
    if (date > today && index < 5) {
      // 平日のみ
      blocks.push(
        createExtendedTimeBlock(`tb-${date}-reading`, 'reading-habit', '06:00', '07:00', date),
        createExtendedTimeBlock(`tb-${date}-english`, 'english-learning', '07:00', '09:00', date),
        createExtendedTimeBlock(
          `tb-${date}-dev-morning`,
          'web-development',
          '10:00',
          '12:00',
          date
        ),
        createExtendedTimeBlock(
          `tb-${date}-dev-afternoon`,
          'web-development',
          '13:00',
          '15:00',
          date
        ),
        createExtendedTimeBlock(`tb-${date}-exercise`, 'exercise-habit', '19:00', '20:00', date)
      )
    }
  })

  // 土曜日の特別スケジュール
  if (weekDates[5] >= today) {
    blocks.push(
      createExtendedTimeBlock(
        `tb-sat-dev`,
        'web-development',
        '10:00',
        '12:00',
        weekDates[5],
        'scheduled',
        {
          description: '週末の集中開発時間',
        }
      ),
      createExtendedTimeBlock(
        `tb-sat-ai`,
        'ai-tool-dev',
        '14:00',
        '17:00',
        weekDates[5],
        'scheduled',
        {
          description: 'AIツール開発プロジェクトの検討',
        }
      )
    )
  }

  return blocks
})()

export function getTimeBlocksByDate(date: string): ExtendedTimeBlock[] {
  return mockTimeBlocks.filter((block) => block.date === date)
}

export function getTimeBlocksByProject(projectId: string): ExtendedTimeBlock[] {
  return mockTimeBlocks.filter((block) => block.projectId === projectId)
}

export function getCurrentTimeBlock(): ExtendedTimeBlock | null {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const currentTime = now.toTimeString().slice(0, 5)

  return (
    mockTimeBlocks.find(
      (block) =>
        block.date === today && block.startTime <= currentTime && block.endTime > currentTime
    ) || null
  )
}

export function getWeeklyTimeAllocation(): Record<string, number> {
  const allocation: Record<string, number> = {}

  mockTimeBlocks.forEach((block) => {
    const startHour = parseInt(block.startTime.split(':')[0])
    const endHour = parseInt(block.endTime.split(':')[0])
    const duration = endHour - startHour

    if (!allocation[block.projectId]) {
      allocation[block.projectId] = 0
    }
    allocation[block.projectId] += duration
  })

  return allocation
}

// Compatibility functions for calendar page
export function generateMockTimeBlocks(): TimeBlock[] {
  return mockTimeBlocks
}

// FullCalendar用のイベントフォーマットに変換
export function convertToFullCalendarEvents(timeBlocks: TimeBlock[]): any[] {
  const projectColorMap: Record<string, string> = {
    'english-learning': '#3b82f6', // blue-500
    'web-development': '#22c55e', // green-500
    'exercise-habit': '#ef4444', // red-500
    'reading-habit': '#a855f7', // purple-500
    'ai-tool-dev': '#6366f1', // indigo-600
  }

  return timeBlocks.map((block) => {
    return {
      id: block.id,
      title: block.title,
      start: `${block.date}T${block.startTime}:00`,
      end: `${block.date}T${block.endTime}:00`,
      backgroundColor: projectColorMap[block.projectId] || '#6b7280',
      borderColor: projectColorMap[block.projectId] || '#6b7280',
      textColor: 'white',
      classNames: [block.projectId],
      extendedProps: {
        projectId: block.projectId,
        projectName: block.projectName,
        description: block.description,
      },
    }
  })
}
