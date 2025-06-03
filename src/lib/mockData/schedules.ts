import { TimeBlock } from '@/types/calendar'
import { getProjectByName } from './timeBlocks'

// スケジュールパターンの定義
export interface SchedulePattern {
  id: string
  name: string
  description: string
  dayType: 'weekday' | 'weekend'
  timeSlots: TimeSlot[]
}

export interface TimeSlot {
  startTime: string
  endTime: string
  projectName: string
  description?: string
}

// 平日のスケジュールパターン
export const weekdayPattern: SchedulePattern = {
  id: 'weekday-default',
  name: '平日スケジュール',
  description: '月曜日から金曜日の標準的なスケジュール',
  dayType: 'weekday',
  timeSlots: [
    {
      startTime: '07:00',
      endTime: '08:00',
      projectName: '英語学習',
      description: '朝の学習時間'
    },
    {
      startTime: '09:00',
      endTime: '12:00',
      projectName: 'Webアプリ開発',
      description: '午前の開発時間'
    },
    {
      startTime: '13:00',
      endTime: '17:00',
      projectName: '仕事時間',
      description: '通常業務'
    },
    {
      startTime: '19:00',
      endTime: '20:00',
      projectName: '運動・健康',
      description: '夜の運動時間'
    }
  ]
}

// 週末のスケジュールパターン
export const weekendPattern: SchedulePattern = {
  id: 'weekend-default',
  name: '週末スケジュール',
  description: '土曜日と日曜日のリラックスしたスケジュール',
  dayType: 'weekend',
  timeSlots: [
    {
      startTime: '10:00',
      endTime: '12:00',
      projectName: 'Webアプリ開発',
      description: '個人プロジェクト'
    },
    {
      startTime: '14:00',
      endTime: '16:00',
      projectName: '英語学習',
      description: '楽しい学習活動'
    },
    {
      startTime: '16:00',
      endTime: '17:00',
      projectName: '運動・健康',
      description: '軽い運動'
    }
  ]
}

// 集中作業日のパターン
export const focusPattern: SchedulePattern = {
  id: 'focus-day',
  name: '集中作業日',
  description: '開発に集中する日のスケジュール',
  dayType: 'weekday',
  timeSlots: [
    {
      startTime: '09:00',
      endTime: '12:00',
      projectName: 'Webアプリ開発',
      description: '午前の集中開発'
    },
    {
      startTime: '13:00',
      endTime: '17:00',
      projectName: 'Webアプリ開発',
      description: '午後の集中開発'
    },
    {
      startTime: '19:00',
      endTime: '21:00',
      projectName: 'Webアプリ開発',
      description: '夜の開発時間'
    }
  ]
}

// 学習強化日のパターン
export const learningPattern: SchedulePattern = {
  id: 'learning-day',
  name: '学習強化日',
  description: '英語学習に重点を置く日のスケジュール',
  dayType: 'weekend',
  timeSlots: [
    {
      startTime: '09:00',
      endTime: '11:00',
      projectName: '英語学習',
      description: '集中学習セッション1'
    },
    {
      startTime: '11:30',
      endTime: '12:30',
      projectName: '英語学習',
      description: '実践練習'
    },
    {
      startTime: '14:00',
      endTime: '16:00',
      projectName: '英語学習',
      description: '集中学習セッション2'
    },
    {
      startTime: '16:30',
      endTime: '17:30',
      projectName: '運動・健康',
      description: 'リフレッシュ運動'
    }
  ]
}

// すべてのパターンを配列で管理
export const schedulePatterns: SchedulePattern[] = [
  weekdayPattern,
  weekendPattern,
  focusPattern,
  learningPattern
]

// 曜日に基づいてデフォルトパターンを取得
export function getDefaultPattern(dayOfWeek: number): SchedulePattern {
  // 0 = Sunday, 6 = Saturday
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return weekendPattern
  }
  return weekdayPattern
}

// パターンからTimeBlockを生成
export function generateTimeBlocksFromPattern(
  pattern: SchedulePattern,
  date: string
): TimeBlock[] {
  return pattern.timeSlots.map((slot, index) => {
    const projectName = slot.projectName
    const project = mockProjects.find(p => p.name === projectName)
    if (!project) {
      throw new Error(`Project ${projectName} not found`)
    }
    
    return {
      id: `tb-${date}-${slot.startTime.replace(':', '')}-${project.id}-${index}`,
      title: project.name,
      projectId: project.id,
      projectName: project.name,
      startTime: slot.startTime,
      endTime: slot.endTime,
      date,
      color: project.color,
      description: slot.description
    }
  })
}

// 時間の重複をチェック
export function hasTimeConflict(
  newSlot: TimeSlot,
  existingSlots: TimeSlot[]
): boolean {
  return existingSlots.some(slot => {
    const newStart = timeToMinutes(newSlot.startTime)
    const newEnd = timeToMinutes(newSlot.endTime)
    const existingStart = timeToMinutes(slot.startTime)
    const existingEnd = timeToMinutes(slot.endTime)
    
    return (
      (newStart >= existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    )
  })
}

// 時間文字列を分に変換
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// 空き時間を検出
export function findFreeTimeSlots(
  timeSlots: TimeSlot[],
  dayStart: string = '06:00',
  dayEnd: string = '23:00'
): TimeSlot[] {
  const sortedSlots = [...timeSlots].sort((a, b) => 
    timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  )
  
  const freeSlots: TimeSlot[] = []
  let lastEndTime = dayStart
  
  sortedSlots.forEach(slot => {
    if (timeToMinutes(slot.startTime) > timeToMinutes(lastEndTime)) {
      freeSlots.push({
        startTime: lastEndTime,
        endTime: slot.startTime,
        projectName: '空き時間',
        description: '予定なし'
      })
    }
    lastEndTime = slot.endTime
  })
  
  // 最後のスロットから一日の終わりまでの空き時間
  if (timeToMinutes(lastEndTime) < timeToMinutes(dayEnd)) {
    freeSlots.push({
      startTime: lastEndTime,
      endTime: dayEnd,
      projectName: '空き時間',
      description: '予定なし'
    })
  }
  
  return freeSlots
}

// mockProjectsのインポートが必要
import { mockProjects } from '@/lib/mock-data'