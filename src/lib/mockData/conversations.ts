export interface Conversation {
  id: string
  title: string
  category: 'goal-setting' | 'project-creation' | 'schedule-adjustment' | 'progress-review' | 'habit-formation'
  tags: string[]
  relatedProjectIds?: string[]
  createdAt: Date
  lastMessageAt: Date
  messageCount: number
}

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: '初回目標設定: エンジニアとしてのキャリア構築',
    category: 'goal-setting',
    tags: ['人生目標', 'キャリア', 'スキルアップ'],
    relatedProjectIds: ['pro-1', 'pro-2'],
    createdAt: new Date('2024-01-15T09:00:00'),
    lastMessageAt: new Date('2024-01-15T09:45:00'),
    messageCount: 12
  },
  {
    id: 'conv-2',
    title: 'プロジェクト作成支援: React学習プラン',
    category: 'project-creation',
    tags: ['学習計画', 'React', 'フロントエンド'],
    relatedProjectIds: ['pro-1'],
    createdAt: new Date('2024-01-16T14:00:00'),
    lastMessageAt: new Date('2024-01-16T14:30:00'),
    messageCount: 8
  },
  {
    id: 'conv-3',
    title: 'スケジュール調整: 体調不良時の優先度変更',
    category: 'schedule-adjustment',
    tags: ['緊急対応', 'スケジュール', '体調管理'],
    relatedProjectIds: ['pro-1', 'pro-2', 'pro-3'],
    createdAt: new Date('2024-01-20T08:00:00'),
    lastMessageAt: new Date('2024-01-20T08:20:00'),
    messageCount: 6
  },
  {
    id: 'conv-4',
    title: '週次レビュー: 学習進捗と改善点',
    category: 'progress-review',
    tags: ['振り返り', '進捗確認', '改善提案'],
    relatedProjectIds: ['pro-1', 'pro-2'],
    createdAt: new Date('2024-01-21T19:00:00'),
    lastMessageAt: new Date('2024-01-21T19:40:00'),
    messageCount: 10
  },
  {
    id: 'conv-5',
    title: '習慣化支援: 朝活ルーティンの最適化',
    category: 'habit-formation',
    tags: ['習慣化', '朝活', '生産性向上'],
    relatedProjectIds: ['pro-4'],
    createdAt: new Date('2024-01-22T06:00:00'),
    lastMessageAt: new Date('2024-01-22T06:25:00'),
    messageCount: 7
  }
]

export function getConversationById(id: string): Conversation | undefined {
  return mockConversations.find(conv => conv.id === id)
}

export function getConversationsByCategory(category: Conversation['category']): Conversation[] {
  return mockConversations.filter(conv => conv.category === category)
}

export function getConversationsByProjectId(projectId: string): Conversation[] {
  return mockConversations.filter(conv => 
    conv.relatedProjectIds?.includes(projectId)
  )
}