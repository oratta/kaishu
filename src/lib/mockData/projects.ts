import { Project } from '@/types/calendar'

export interface LifeGoal {
  id: string
  type: 'project' | 'habit' | 'skill' | 'health' | 'relationship'
  name: string
  description: string
  targetOutcome: string
  suggestedTimePerWeek: number
  priority: 1 | 2 | 3
  goalConditions: GoalCondition[]
}

export interface GoalCondition {
  id: string
  goalId: string
  description: string
  measurableTarget: string
  deadline?: Date
  status: 'pending' | 'in_progress' | 'completed'
  projects: string[]
}

export interface ExtendedProject extends Project {
  goalId?: string
  phases: Phase[]
  milestones: Milestone[]
  weeklyTargetHours: number
  actualHoursThisWeek: number
  notes: Note[]
  llmGeneratedSummary?: string
}

export interface Phase {
  id: string
  name: string
  projectId: string
  startDate: Date
  endDate: Date
  objectives: string[]
  status: 'planned' | 'active' | 'completed'
}

export interface Milestone {
  id: string
  projectId: string
  phaseId?: string
  name: string
  description: string
  targetDate: Date
  completedDate?: Date
  status: 'pending' | 'in_progress' | 'completed'
  tasks: string[]
  habits: string[]
}

export interface Note {
  id: string
  projectId: string
  content: string
  createdAt: Date
  updatedAt: Date
  type: 'user' | 'llm_generated'
}

export const mockLifeGoals: LifeGoal[] = [
  {
    id: 'goal-1',
    type: 'skill',
    name: 'グローバルコミュニケーション能力向上',
    description: '国際的なビジネス環境で活躍できる英語力を身につける',
    targetOutcome: 'TOEIC 900点達成、ビジネス英会話でスムーズなディスカッション',
    suggestedTimePerWeek: 10,
    priority: 1,
    goalConditions: [
      {
        id: 'gc-1-1',
        goalId: 'goal-1',
        description: 'ビジネス英語コミュニケーション能力',
        measurableTarget: 'TOEIC 900点以上',
        deadline: new Date('2025-12-31'),
        status: 'in_progress',
        projects: ['english-learning']
      },
      {
        id: 'gc-1-2',
        goalId: 'goal-1',
        description: '実践的な会話能力',
        measurableTarget: '週3回以上のオンライン英会話レッスン完了',
        status: 'in_progress',
        projects: ['english-learning']
      }
    ]
  },
  {
    id: 'goal-2',
    type: 'project',
    name: 'フルスタックエンジニアとしての成長',
    description: 'モダンな Web 開発技術を習得し、個人プロジェクトを完成させる',
    targetOutcome: 'Next.js + TypeScript で本格的な SaaS アプリケーションを開発・運用',
    suggestedTimePerWeek: 15,
    priority: 1,
    goalConditions: [
      {
        id: 'gc-2-1',
        goalId: 'goal-2',
        description: 'React/Next.jsマスター',
        measurableTarget: '3つの実践的なプロジェクトを完成',
        deadline: new Date('2025-09-30'),
        status: 'in_progress',
        projects: ['web-development']
      },
      {
        id: 'gc-2-2',
        goalId: 'goal-2',
        description: 'TypeScript習熟',
        measurableTarget: '全プロジェクトでTypeScriptを使用',
        status: 'in_progress',
        projects: ['web-development']
      }
    ]
  },
  {
    id: 'goal-3',
    type: 'health',
    name: '健康的な生活習慣の確立',
    description: '運動習慣を確立し、体力・筋力を向上させる',
    targetOutcome: '週5回の運動習慣を確立、体脂肪率15%以下',
    suggestedTimePerWeek: 5,
    priority: 2,
    goalConditions: [
      {
        id: 'gc-3-1',
        goalId: 'goal-3',
        description: '運動習慣の定着',
        measurableTarget: '週5回・各1時間の運動実施',
        status: 'in_progress',
        projects: ['exercise-habit']
      },
      {
        id: 'gc-3-2',
        goalId: 'goal-3',
        description: '体組成の改善',
        measurableTarget: '体脂肪率15%以下、筋肉量3kg増加',
        deadline: new Date('2025-12-31'),
        status: 'pending',
        projects: ['exercise-habit']
      }
    ]
  },
  {
    id: 'goal-4',
    type: 'skill',
    name: '継続的学習習慣の確立',
    description: '技術書・ビジネス書を定期的に読み、知識を実践に活かす',
    targetOutcome: '月2冊以上の読書と実践的なアウトプット',
    suggestedTimePerWeek: 7,
    priority: 2,
    goalConditions: [
      {
        id: 'gc-4-1',
        goalId: 'goal-4',
        description: '読書習慣の定着',
        measurableTarget: '月2冊以上の完読',
        status: 'in_progress',
        projects: ['reading-habit']
      }
    ]
  },
  {
    id: 'goal-5',
    type: 'project',
    name: 'AIツール開発プロジェクト',
    description: 'LLMを活用した実用的なツールを開発し、公開する',
    targetOutcome: 'GitHub スター100以上の OSS プロジェクト',
    suggestedTimePerWeek: 8,
    priority: 2,
    goalConditions: [
      {
        id: 'gc-5-1',
        goalId: 'goal-5',
        description: 'MVP開発',
        measurableTarget: '基本機能を持つMVPのリリース',
        deadline: new Date('2025-07-31'),
        status: 'pending',
        projects: ['ai-tool-dev']
      }
    ]
  }
]

export const mockProjects: ExtendedProject[] = [
  {
    id: 'english-learning',
    name: '英語学習',
    color: 'bg-blue-500',
    textColor: 'text-white',
    type: 'learning',
    goalId: 'goal-1',
    weeklyTargetHours: 10,
    actualHoursThisWeek: 6.5,
    phases: [
      {
        id: 'phase-eng-1',
        name: '基礎固め',
        projectId: 'english-learning',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-03-31'),
        objectives: [
          '基本文法の復習完了',
          '頻出単語3000語マスター',
          'リスニング基礎力向上'
        ],
        status: 'active'
      },
      {
        id: 'phase-eng-2',
        name: 'ビジネス英語強化',
        projectId: 'english-learning',
        startDate: new Date('2025-04-01'),
        endDate: new Date('2025-06-30'),
        objectives: [
          'ビジネス頻出表現の習得',
          'プレゼンテーション練習',
          'メール・レポート作成'
        ],
        status: 'planned'
      },
      {
        id: 'phase-eng-3',
        name: '実践応用',
        projectId: 'english-learning',
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-09-30'),
        objectives: [
          'ディスカッション能力向上',
          '交渉・説得技術の習得',
          'TOEIC対策と受験'
        ],
        status: 'planned'
      }
    ],
    milestones: [
      {
        id: 'milestone-eng-1',
        projectId: 'english-learning',
        phaseId: 'phase-eng-1',
        name: 'TOEIC 700点達成',
        description: '基礎力確認のためのTOEIC受験',
        targetDate: new Date('2025-03-31'),
        status: 'in_progress',
        tasks: ['task-1', 'task-2', 'task-3'],
        habits: ['habit-1', 'habit-2']
      },
      {
        id: 'milestone-eng-2',
        projectId: 'english-learning',
        phaseId: 'phase-eng-2',
        name: 'ビジネス英会話レベル中級',
        description: 'オンライン英会話で中級認定',
        targetDate: new Date('2025-06-30'),
        status: 'pending',
        tasks: [],
        habits: ['habit-3']
      }
    ],
    notes: [
      {
        id: 'note-eng-1',
        projectId: 'english-learning',
        content: '今週はリスニング練習に重点を置く。通勤時間を活用してポッドキャストを聴く習慣をつける。',
        createdAt: new Date('2025-06-01'),
        updatedAt: new Date('2025-06-01'),
        type: 'user'
      },
      {
        id: 'note-eng-2',
        projectId: 'english-learning',
        content: 'オンライン英会話の頻度を週2回から3回に増やすことを推奨。実践的な会話機会の増加が上達の鍵となります。',
        createdAt: new Date('2025-06-02'),
        updatedAt: new Date('2025-06-02'),
        type: 'llm_generated'
      }
    ],
    llmGeneratedSummary: '順調に基礎学習を進めています。今月はリスニング力向上に注力し、来月からビジネス英語フェーズに移行予定です。'
  },
  {
    id: 'web-development',
    name: 'Web開発スキル向上',
    color: 'bg-green-500',
    textColor: 'text-white',
    type: 'work',
    goalId: 'goal-2',
    weeklyTargetHours: 15,
    actualHoursThisWeek: 12,
    phases: [
      {
        id: 'phase-dev-1',
        name: 'React基礎習得',
        projectId: 'web-development',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-02-28'),
        objectives: [
          'React Hooks完全理解',
          '状態管理パターン習得',
          'コンポーネント設計'
        ],
        status: 'completed'
      },
      {
        id: 'phase-dev-2',
        name: 'Next.js実践',
        projectId: 'web-development',
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-05-31'),
        objectives: [
          'App Router完全理解',
          'SSR/SSG/ISRの使い分け',
          'パフォーマンス最適化'
        ],
        status: 'active'
      },
      {
        id: 'phase-dev-3',
        name: 'フルスタックアプリ開発',
        projectId: 'web-development',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-08-31'),
        objectives: [
          'DB設計と実装',
          'API開発',
          'デプロイと運用'
        ],
        status: 'planned'
      }
    ],
    milestones: [
      {
        id: 'milestone-dev-1',
        projectId: 'web-development',
        phaseId: 'phase-dev-1',
        name: 'Todoアプリ完成',
        description: 'React Hooksを使った本格的なTodoアプリ',
        targetDate: new Date('2025-02-28'),
        completedDate: new Date('2025-02-25'),
        status: 'completed',
        tasks: [],
        habits: []
      },
      {
        id: 'milestone-dev-2',
        projectId: 'web-development',
        phaseId: 'phase-dev-2',
        name: 'ブログサイト構築',
        description: 'Next.js + MDXでブログサイト構築',
        targetDate: new Date('2025-04-30'),
        status: 'in_progress',
        tasks: ['task-10', 'task-11', 'task-12'],
        habits: ['habit-5']
      }
    ],
    notes: [
      {
        id: 'note-dev-1',
        projectId: 'web-development',
        content: 'TypeScriptの型定義でまだ迷うことが多い。実践を通じて慣れていく必要がある。',
        createdAt: new Date('2025-05-28'),
        updatedAt: new Date('2025-05-28'),
        type: 'user'
      }
    ],
    llmGeneratedSummary: 'React基礎は習得完了。現在Next.jsの実践フェーズで、App Routerの理解が深まっています。'
  },
  {
    id: 'exercise-habit',
    name: '運動習慣確立',
    color: 'bg-red-500',
    textColor: 'text-white',
    type: 'exercise',
    goalId: 'goal-3',
    weeklyTargetHours: 5,
    actualHoursThisWeek: 4,
    phases: [
      {
        id: 'phase-ex-1',
        name: '基礎体力向上',
        projectId: 'exercise-habit',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-03-31'),
        objectives: [
          '週3回の運動習慣確立',
          '基礎的な筋力トレーニング',
          '有酸素運動の導入'
        ],
        status: 'active'
      },
      {
        id: 'phase-ex-2',
        name: '筋力強化',
        projectId: 'exercise-habit',
        startDate: new Date('2025-04-01'),
        endDate: new Date('2025-06-30'),
        objectives: [
          '週4-5回のトレーニング',
          '各部位の筋力向上',
          '栄養管理の最適化'
        ],
        status: 'planned'
      }
    ],
    milestones: [
      {
        id: 'milestone-ex-1',
        projectId: 'exercise-habit',
        phaseId: 'phase-ex-1',
        name: '週3回運動の習慣化',
        description: '3ヶ月連続で週3回以上の運動実施',
        targetDate: new Date('2025-03-31'),
        status: 'in_progress',
        tasks: [],
        habits: ['habit-6', 'habit-7']
      }
    ],
    notes: [
      {
        id: 'note-ex-1',
        projectId: 'exercise-habit',
        content: '筋肉痛が残る日は軽めの有酸素運動に切り替えて継続性を重視',
        createdAt: new Date('2025-05-30'),
        updatedAt: new Date('2025-05-30'),
        type: 'user'
      }
    ],
    llmGeneratedSummary: '運動習慣は着実に定着しつつあります。週3回のペースを維持し、来月から強度を上げていく予定です。'
  },
  {
    id: 'reading-habit',
    name: '読書習慣',
    color: 'bg-purple-500',
    textColor: 'text-white',
    type: 'hobby',
    goalId: 'goal-4',
    weeklyTargetHours: 7,
    actualHoursThisWeek: 5.5,
    phases: [
      {
        id: 'phase-read-1',
        name: '習慣化フェーズ',
        projectId: 'reading-habit',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-06-30'),
        objectives: [
          '毎日30分以上の読書',
          '月2冊完読',
          '読書メモの作成'
        ],
        status: 'active'
      }
    ],
    milestones: [
      {
        id: 'milestone-read-1',
        projectId: 'reading-habit',
        phaseId: 'phase-read-1',
        name: '10冊読破',
        description: '技術書・ビジネス書を合計10冊完読',
        targetDate: new Date('2025-05-31'),
        status: 'in_progress',
        tasks: [],
        habits: ['habit-8']
      }
    ],
    notes: [
      {
        id: 'note-read-1',
        projectId: 'reading-habit',
        content: '朝の読書時間が最も集中できる。6:00-7:00を読書タイムとして固定',
        createdAt: new Date('2025-05-25'),
        updatedAt: new Date('2025-05-25'),
        type: 'user'
      }
    ],
    llmGeneratedSummary: '朝の読書習慣が定着。現在月2冊ペースを維持できています。'
  },
  {
    id: 'ai-tool-dev',
    name: 'AIツール開発',
    color: 'bg-indigo-500',
    textColor: 'text-white',
    type: 'development',
    goalId: 'goal-5',
    weeklyTargetHours: 8,
    actualHoursThisWeek: 0,
    phases: [
      {
        id: 'phase-ai-1',
        name: '要件定義・設計',
        projectId: 'ai-tool-dev',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-30'),
        objectives: [
          'ツールのコンセプト確定',
          '技術スタック選定',
          'MVP機能の定義'
        ],
        status: 'planned'
      }
    ],
    milestones: [
      {
        id: 'milestone-ai-1',
        projectId: 'ai-tool-dev',
        phaseId: 'phase-ai-1',
        name: '設計ドキュメント完成',
        description: '詳細な設計書とワイヤーフレーム作成',
        targetDate: new Date('2025-06-30'),
        status: 'pending',
        tasks: [],
        habits: []
      }
    ],
    notes: [],
    llmGeneratedSummary: '6月から開始予定の新プロジェクト。LLMを活用した生産性向上ツールの開発を計画中。'
  }
]