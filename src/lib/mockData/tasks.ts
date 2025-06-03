import { Task } from '@/types/task'

export interface ExtendedTask extends Task {
  milestoneId?: string
  priority: 'high' | 'medium' | 'low'
  tags: string[]
  dependencies?: string[]
  subtasks?: string[]
}

export const mockTasks: ExtendedTask[] = [
  // 英語学習タスク
  {
    id: 'task-1',
    title: 'TOEIC模試実施',
    description: '公式問題集Vol.9のTest1を時間を計って実施',
    status: 'DONE',
    projectId: 'english-learning',
    projectName: '英語学習',
    milestoneId: 'milestone-eng-1',
    estimatedMinutes: 120,
    actualMinutes: 125,
    priority: 'high',
    tags: ['TOEIC', 'テスト'],
    startedAt: new Date('2025-05-25T09:00:00'),
    completedAt: new Date('2025-05-25T11:05:00'),
    createdAt: new Date('2025-05-20'),
    updatedAt: new Date('2025-05-25')
  },
  {
    id: 'task-2',
    title: 'リスニングパート復習',
    description: '模試で間違えたリスニング問題の解き直しとシャドーイング',
    status: 'DOING',
    projectId: 'english-learning',
    projectName: '英語学習',
    milestoneId: 'milestone-eng-1',
    estimatedMinutes: 60,
    actualMinutes: 30,
    priority: 'high',
    tags: ['リスニング', '復習'],
    startedAt: new Date('2025-06-03T07:00:00'),
    createdAt: new Date('2025-05-26'),
    updatedAt: new Date('2025-06-03')
  },
  {
    id: 'task-3',
    title: '頻出単語100個暗記',
    description: 'TOEIC頻出単語帳のUnit5(100単語)を完全暗記',
    status: 'TODO',
    projectId: 'english-learning',
    projectName: '英語学習',
    milestoneId: 'milestone-eng-1',
    estimatedMinutes: 90,
    priority: 'medium',
    tags: ['単語', '暗記'],
    createdAt: new Date('2025-05-27'),
    updatedAt: new Date('2025-05-27')
  },
  {
    id: 'task-4',
    title: 'ビジネスメール作成練習',
    description: '問い合わせ・謝罪・提案の3パターンを英語で作成',
    status: 'TODO',
    projectId: 'english-learning',
    projectName: '英語学習',
    estimatedMinutes: 45,
    priority: 'medium',
    tags: ['ライティング', 'ビジネス'],
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-01')
  },
  {
    id: 'task-5',
    title: 'オンライン英会話予約',
    description: '今週3回分のレッスンを予約する',
    status: 'DONE',
    projectId: 'english-learning',
    projectName: '英語学習',
    estimatedMinutes: 15,
    actualMinutes: 10,
    priority: 'low',
    tags: ['管理', '予約'],
    completedAt: new Date('2025-06-01T20:00:00'),
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-01')
  },

  // Web開発タスク
  {
    id: 'task-10',
    title: 'Next.js App Router学習',
    description: '公式ドキュメントのApp Routerセクションを完読',
    status: 'DONE',
    projectId: 'web-development',
    projectName: 'Web開発スキル向上',
    milestoneId: 'milestone-dev-2',
    estimatedMinutes: 180,
    actualMinutes: 210,
    priority: 'high',
    tags: ['学習', 'Next.js'],
    completedAt: new Date('2025-05-28T15:00:00'),
    createdAt: new Date('2025-05-20'),
    updatedAt: new Date('2025-05-28')
  },
  {
    id: 'task-11',
    title: 'ブログのレイアウト実装',
    description: 'ヘッダー、フッター、サイドバーのコンポーネント作成',
    status: 'DOING',
    projectId: 'web-development',
    projectName: 'Web開発スキル向上',
    milestoneId: 'milestone-dev-2',
    estimatedMinutes: 240,
    actualMinutes: 120,
    priority: 'high',
    tags: ['実装', 'UI'],
    startedAt: new Date('2025-06-02T10:00:00'),
    createdAt: new Date('2025-05-29'),
    updatedAt: new Date('2025-06-02')
  },
  {
    id: 'task-12',
    title: 'MDXパーサー実装',
    description: 'ブログ記事用のMDXパーサーとシンタックスハイライト設定',
    status: 'TODO',
    projectId: 'web-development',
    projectName: 'Web開発スキル向上',
    milestoneId: 'milestone-dev-2',
    estimatedMinutes: 180,
    priority: 'high',
    tags: ['実装', 'MDX'],
    dependencies: ['task-11'],
    createdAt: new Date('2025-05-30'),
    updatedAt: new Date('2025-05-30')
  },
  {
    id: 'task-13',
    title: 'TypeScript型定義改善',
    description: '既存コードの型定義を見直し、any型を排除',
    status: 'TODO',
    projectId: 'web-development',
    projectName: 'Web開発スキル向上',
    estimatedMinutes: 120,
    priority: 'medium',
    tags: ['リファクタリング', 'TypeScript'],
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-01')
  },
  {
    id: 'task-14',
    title: 'パフォーマンス最適化調査',
    description: 'Lighthouse実行と改善ポイントの洗い出し',
    status: 'TODO',
    projectId: 'web-development',
    projectName: 'Web開発スキル向上',
    estimatedMinutes: 90,
    priority: 'low',
    tags: ['調査', 'パフォーマンス'],
    createdAt: new Date('2025-06-02'),
    updatedAt: new Date('2025-06-02')
  },

  // 運動タスク
  {
    id: 'task-20',
    title: '上半身筋トレメニュー作成',
    description: '胸・背中・肩を鍛える週間メニューの作成',
    status: 'DONE',
    projectId: 'exercise-habit',
    projectName: '運動習慣確立',
    estimatedMinutes: 30,
    actualMinutes: 25,
    priority: 'high',
    tags: ['計画', '筋トレ'],
    completedAt: new Date('2025-05-25T08:00:00'),
    createdAt: new Date('2025-05-24'),
    updatedAt: new Date('2025-05-25')
  },
  {
    id: 'task-21',
    title: 'ジム入会手続き',
    description: '近所のジムの見学と入会手続き',
    status: 'TODO',
    projectId: 'exercise-habit',
    projectName: '運動習慣確立',
    estimatedMinutes: 120,
    priority: 'high',
    tags: ['手続き', 'ジム'],
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-01')
  },
  {
    id: 'task-22',
    title: 'ランニングシューズ購入',
    description: '有酸素運動用のランニングシューズを選定・購入',
    status: 'TODO',
    projectId: 'exercise-habit',
    projectName: '運動習慣確立',
    estimatedMinutes: 180,
    priority: 'medium',
    tags: ['買い物', '装備'],
    createdAt: new Date('2025-06-02'),
    updatedAt: new Date('2025-06-02')
  },

  // 読書タスク
  {
    id: 'task-30',
    title: '「Clean Code」第5章読了',
    description: '第5章「書式」を読み、要点をノートにまとめる',
    status: 'DONE',
    projectId: 'reading-habit',
    projectName: '読書習慣',
    estimatedMinutes: 60,
    actualMinutes: 55,
    priority: 'medium',
    tags: ['技術書', '読書'],
    completedAt: new Date('2025-06-01T07:00:00'),
    createdAt: new Date('2025-05-30'),
    updatedAt: new Date('2025-06-01')
  },
  {
    id: 'task-31',
    title: '読書メモのデジタル化',
    description: '紙のメモをNotionに転記して整理',
    status: 'TODO',
    projectId: 'reading-habit',
    projectName: '読書習慣',
    estimatedMinutes: 45,
    priority: 'low',
    tags: ['整理', 'メモ'],
    createdAt: new Date('2025-06-02'),
    updatedAt: new Date('2025-06-02')
  },
  {
    id: 'task-32',
    title: '次の本の選定',
    description: '6月に読む技術書2冊を選定',
    status: 'TODO',
    projectId: 'reading-habit',
    projectName: '読書習慣',
    estimatedMinutes: 30,
    priority: 'medium',
    tags: ['計画', '選書'],
    createdAt: new Date('2025-06-02'),
    updatedAt: new Date('2025-06-02')
  }
]

export function getTasksByProject(projectId: string): ExtendedTask[] {
  return mockTasks.filter(task => task.projectId === projectId)
}

export function getTasksByMilestone(milestoneId: string): ExtendedTask[] {
  return mockTasks.filter(task => task.milestoneId === milestoneId)
}

export function getTasksByStatus(status: Task['status']): ExtendedTask[] {
  return mockTasks.filter(task => task.status === status)
}

export function getActiveTasks(): ExtendedTask[] {
  return mockTasks.filter(task => task.status === 'DOING')
}

export function getUpcomingTasks(projectId?: string): ExtendedTask[] {
  const todos = mockTasks.filter(task => task.status === 'TODO')
  if (projectId) {
    return todos.filter(task => task.projectId === projectId)
  }
  return todos
}