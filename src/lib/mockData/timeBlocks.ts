import { TimeBlock } from '@/types/calendar'
import { mockProjects } from '@/lib/mock-data'

const getProjectByName = (name: string) => {
  const project = mockProjects.find(p => p.name === name)
  if (!project) {
    throw new Error(`Project ${name} not found`)
  }
  return project
}

const createTimeBlock = (
  date: string,
  startTime: string,
  endTime: string,
  projectName: string,
  description?: string
): TimeBlock => {
  const project = getProjectByName(projectName)
  return {
    id: `tb-${date}-${startTime.replace(':', '')}-${project.id}`,
    title: project.name,
    projectId: project.id,
    projectName: project.name,
    startTime,
    endTime,
    date,
    color: project.color,
    description
  }
}

// 週間のタイムブロックデータ（2025年1月6日から始まる週）
export const weeklyTimeBlocks: TimeBlock[] = [
  // 月曜日 (2025-01-06)
  createTimeBlock('2025-01-06', '07:00', '08:00', '英語学習', '朝の英語学習セッション'),
  createTimeBlock('2025-01-06', '09:00', '12:00', 'Webアプリ開発', 'Next.js開発作業'),
  createTimeBlock('2025-01-06', '13:00', '17:00', '仕事時間', '通常業務'),
  createTimeBlock('2025-01-06', '19:00', '20:00', '運動・健康', 'ジムでのトレーニング'),
  
  // 火曜日 (2025-01-07)
  createTimeBlock('2025-01-07', '07:00', '08:00', '英語学習', 'リスニング練習'),
  createTimeBlock('2025-01-07', '09:00', '12:00', 'Webアプリ開発', 'API開発'),
  createTimeBlock('2025-01-07', '13:00', '17:00', '仕事時間', '通常業務'),
  createTimeBlock('2025-01-07', '19:00', '20:00', '運動・健康', 'ランニング'),
  
  // 水曜日 (2025-01-08)
  createTimeBlock('2025-01-08', '07:00', '08:00', '英語学習', 'スピーキング練習'),
  createTimeBlock('2025-01-08', '09:00', '12:00', 'Webアプリ開発', 'UI実装'),
  createTimeBlock('2025-01-08', '13:00', '17:00', '仕事時間', '通常業務'),
  createTimeBlock('2025-01-08', '19:00', '20:00', '運動・健康', 'ヨガ'),
  
  // 木曜日 (2025-01-09)
  createTimeBlock('2025-01-09', '07:00', '08:00', '英語学習', 'ライティング練習'),
  createTimeBlock('2025-01-09', '09:00', '12:00', 'Webアプリ開発', 'テスト実装'),
  createTimeBlock('2025-01-09', '13:00', '17:00', '仕事時間', '通常業務'),
  createTimeBlock('2025-01-09', '19:00', '20:00', '運動・健康', 'ジムでのトレーニング'),
  
  // 金曜日 (2025-01-10)
  createTimeBlock('2025-01-10', '07:00', '08:00', '英語学習', '総合復習'),
  createTimeBlock('2025-01-10', '09:00', '12:00', 'Webアプリ開発', 'コードレビューとリファクタリング'),
  createTimeBlock('2025-01-10', '13:00', '17:00', '仕事時間', '通常業務'),
  createTimeBlock('2025-01-10', '19:00', '20:00', '運動・健康', 'ストレッチング'),
  
  // 土曜日 (2025-01-11) - 週末のパターン
  createTimeBlock('2025-01-11', '10:00', '12:00', 'Webアプリ開発', '個人プロジェクト開発'),
  createTimeBlock('2025-01-11', '14:00', '16:00', '英語学習', '映画を使った学習'),
  createTimeBlock('2025-01-11', '16:00', '17:00', '運動・健康', '散歩'),
  
  // 日曜日 (2025-01-12) - 週末のパターン
  createTimeBlock('2025-01-12', '10:00', '12:00', 'Webアプリ開発', 'オープンソース貢献'),
  createTimeBlock('2025-01-12', '14:00', '16:00', '英語学習', '読書とボキャブラリー'),
  createTimeBlock('2025-01-12', '16:00', '17:00', '運動・健康', 'サイクリング'),
]

// 日付を指定してタイムブロックを取得
export function getTimeBlocksByDate(date: string): TimeBlock[] {
  return weeklyTimeBlocks.filter(block => block.date === date)
}

// 週の開始日を指定して1週間分のタイムブロックを取得
export function getWeeklyTimeBlocks(startDate: Date): TimeBlock[] {
  const blocks: TimeBlock[] = []
  
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    const dateStr = currentDate.toISOString().split('T')[0]
    
    // 既存のデータから該当する曜日のパターンを取得して日付を調整
    const dayOfWeek = currentDate.getDay()
    const templateBlocks = weeklyTimeBlocks.filter(block => {
      const blockDate = new Date(block.date)
      return blockDate.getDay() === dayOfWeek
    })
    
    templateBlocks.forEach(template => {
      blocks.push({
        ...template,
        id: `tb-${dateStr}-${template.startTime.replace(':', '')}-${template.projectId}`,
        date: dateStr
      })
    })
  }
  
  return blocks
}

// プロジェクトIDでタイムブロックをフィルタリング
export function getTimeBlocksByProject(projectId: string): TimeBlock[] {
  return weeklyTimeBlocks.filter(block => block.projectId === projectId)
}