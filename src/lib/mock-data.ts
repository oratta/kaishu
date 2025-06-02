import { Project, TimeBlock, CalendarDay } from '@/types/calendar'
import { EventInput } from '@fullcalendar/core'

export const mockProjects: Project[] = [
  {
    id: 'english',
    name: '英語学習',
    color: 'bg-blue-500',
    textColor: 'text-white',
    type: 'learning',
  },
  {
    id: 'development',
    name: '開発作業',
    color: 'bg-green-500',
    textColor: 'text-white',
    type: 'development',
  },
  {
    id: 'exercise',
    name: '運動',
    color: 'bg-red-500',
    textColor: 'text-white',
    type: 'exercise',
  },
  {
    id: 'reading',
    name: '読書',
    color: 'bg-purple-500',
    textColor: 'text-white',
    type: 'hobby',
  },
]

// 今週の日付を生成（月曜日から日曜日）
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

function createTimeBlock(
  id: string,
  projectId: string,
  startTime: string,
  endTime: string,
  date: string
): TimeBlock {
  const project = mockProjects.find((p) => p.id === projectId)!
  return {
    id,
    title: project.name,
    projectId,
    projectName: project.name,
    startTime,
    endTime,
    date,
    color: project.color,
  }
}

export function generateMockTimeBlocks(): TimeBlock[] {
  const weekDates = getWeekDates()
  const timeBlocks: TimeBlock[] = []

  // 平日（月-金）のタイムブロックを生成
  weekDates.slice(0, 5).forEach((date) => {
    // 朝読書: 平日 6:00-7:00
    timeBlocks.push(createTimeBlock(`reading-morning-${date}`, 'reading', '06:00', '07:00', date))

    // 英語学習: 平日 7:00-9:00
    timeBlocks.push(createTimeBlock(`english-${date}`, 'english', '07:00', '09:00', date))

    // 開発作業: 平日 10:00-12:00
    timeBlocks.push(createTimeBlock(`dev-morning-${date}`, 'development', '10:00', '12:00', date))

    // 開発作業: 平日 13:00-15:00
    timeBlocks.push(createTimeBlock(`dev-afternoon-${date}`, 'development', '13:00', '15:00', date))

    // 運動: 平日 19:00-20:00
    timeBlocks.push(createTimeBlock(`exercise-${date}`, 'exercise', '19:00', '20:00', date))
  })

  // 土曜日のタイムブロック
  const saturday = weekDates[5]
  timeBlocks.push(
    createTimeBlock(`dev-saturday-${saturday}`, 'development', '10:00', '12:00', saturday)
  )

  return timeBlocks
}

export function generateMockCalendarDays(): CalendarDay[] {
  const weekDates = getWeekDates()
  const timeBlocks = generateMockTimeBlocks()
  const today = new Date().toISOString().split('T')[0]

  return weekDates.map((date, index) => ({
    date,
    dayOfWeek: (index + 1) % 7, // 月曜日 = 1, 日曜日 = 0
    isToday: date === today,
    timeBlocks: timeBlocks.filter((block) => block.date === date),
  }))
}

// FullCalendar用のイベントフォーマットに変換
export function convertToFullCalendarEvents(timeBlocks: TimeBlock[]): EventInput[] {
  return timeBlocks.map((block) => {
    const project = mockProjects.find((p) => p.id === block.projectId)!
    return {
      id: block.id,
      title: block.title,
      start: `${block.date}T${block.startTime}:00`,
      end: `${block.date}T${block.endTime}:00`,
      backgroundColor: projectColorMap[block.projectId] || '#6b7280',
      borderColor: projectColorMap[block.projectId] || '#6b7280',
      textColor: project.textColor?.replace('text-', '') || 'white',
      classNames: [block.projectId],
      extendedProps: {
        projectId: block.projectId,
        projectName: block.projectName,
        description: block.description,
      },
    }
  })
}

// プロジェクトカラーマップ
export const projectColorMap: Record<string, string> = {
  english: '#3b82f6', // blue-500
  development: '#22c55e', // green-500
  exercise: '#ef4444', // red-500
  reading: '#a855f7', // purple-500
}
