import { Message } from '@/components/chat/types'

export interface ConversationSession {
  id: string
  type: 'goal_setting' | 'task_planning' | 'weekly_review' | 'adjustment' | 'timeblock_start'
  projectId?: string
  timeBlockId?: string
  messages: Message[]
  context: {
    relatedGoals?: string[]
    relatedProjects?: string[]
    relatedTasks?: string[]
    relatedHabits?: string[]
  }
  createdAt: Date
  summary?: string
  actionItems?: string[]
}

export const mockConversations: ConversationSession[] = [
  {
    id: 'conv-1',
    type: 'goal_setting',
    messages: [
      {
        id: 'msg-1-1',
        role: 'user',
        content: '英語力を向上させたいです。ビジネスで使えるレベルまで到達したいと考えています。',
        timestamp: new Date('2025-01-05T10:00:00')
      },
      {
        id: 'msg-1-2',
        role: 'assistant',
        content: `素晴らしい目標ですね！ビジネス英語の習得について、詳しくお聞かせください。

現在の英語レベルと、具体的な目標について教えていただけますか？
- 現在のTOEICスコアや英語学習歴
- どのようなビジネスシーンで使いたいか（会議、プレゼン、メール等）
- いつまでに達成したいか
- 週にどれくらいの時間を確保できそうか`,
        timestamp: new Date('2025-01-05T10:01:00')
      },
      {
        id: 'msg-1-3',
        role: 'user',
        content: 'TOEIC600点程度です。国際会議でディスカッションできるレベルになりたいです。1年以内にTOEIC900点を目指したい。週10時間は確保できます。',
        timestamp: new Date('2025-01-05T10:05:00')
      },
      {
        id: 'msg-1-4',
        role: 'assistant',
        content: `理解しました。TOEIC600点から900点への向上と、実践的な会話能力の習得ですね。

週10時間を効果的に使うための学習プランを提案します：

**フェーズ1（3ヶ月）: 基礎固め**
- 文法・語彙の強化（週3時間）
- リスニング基礎（週3時間）
- オンライン英会話（週2時間）
- TOEIC対策（週2時間）

**フェーズ2（3ヶ月）: ビジネス英語強化**
- ビジネス表現の習得（週3時間）
- ディスカッション練習（週3時間）
- プレゼン練習（週2時間）
- TOEIC対策継続（週2時間）

**フェーズ3（6ヶ月）: 実践応用**
- 実践的なディスカッション（週4時間）
- ビジネスケーススタディ（週3時間）
- TOEIC最終対策（週3時間）

このプランでいかがでしょうか？`,
        timestamp: new Date('2025-01-05T10:10:00')
      }
    ],
    context: {
      relatedGoals: ['goal-1'],
      relatedProjects: ['english-learning']
    },
    createdAt: new Date('2025-01-05T10:00:00'),
    summary: 'TOEIC600点から900点を目指す1年間の英語学習計画を策定。週10時間の学習時間で、基礎固め→ビジネス英語→実践応用の3フェーズで進行。',
    actionItems: [
      'オンライン英会話サービスの選定と登録',
      'TOEIC公式問題集の購入',
      'ビジネス英語教材の選定'
    ]
  },
  {
    id: 'conv-2',
    type: 'timeblock_start',
    projectId: 'english-learning',
    timeBlockId: 'tb-today-english',
    messages: [
      {
        id: 'msg-2-1',
        role: 'assistant',
        content: `おはようございます！英語学習の時間ですね。

前回はTOEIC模試を実施し、リスニングパートで課題が見つかりました。
今日の2時間で取り組むタスクを決めましょう。

現在の未完了タスク：
1. リスニングパート復習（優先度：高）
2. 頻出単語100個暗記（優先度：中）
3. ビジネスメール作成練習（優先度：中）

体調や気分はいかがですか？`,
        timestamp: new Date('2025-06-03T07:00:00')
      },
      {
        id: 'msg-2-2',
        role: 'user',
        content: '体調は良好です。リスニングの復習を中心にやりたいです。',
        timestamp: new Date('2025-06-03T07:02:00')
      },
      {
        id: 'msg-2-3',
        role: 'assistant',
        content: `素晴らしいです！リスニング復習を中心に、効果的な2時間の計画を立てました：

**本日の学習プラン（7:00-9:00）**

**7:00-8:00 リスニング集中復習**
- 模試の間違い箇所を再度聴く（15分）
- シャドーイング練習（20分）
- ディクテーション練習（20分）
- 語彙・表現の確認（5分）

**8:00-8:30 関連単語学習**
- リスニングで出てきた単語を整理
- 類似表現やコロケーションを学習

**8:30-9:00 実践練習**
- 新しいリスニング問題に挑戦
- 学んだ表現を使って要約練習

このプランで進めていきましょう！何か調整したい点はありますか？`,
        timestamp: new Date('2025-06-03T07:05:00')
      }
    ],
    context: {
      relatedProjects: ['english-learning'],
      relatedTasks: ['task-2', 'task-3', 'task-4']
    },
    createdAt: new Date('2025-06-03T07:00:00'),
    summary: '英語学習タイムブロック開始。リスニング復習を中心とした2時間の学習計画を作成。',
    actionItems: [
      'リスニングパート復習（シャドーイング・ディクテーション）',
      '関連単語の整理と学習',
      '新しいリスニング問題への挑戦'
    ]
  },
  {
    id: 'conv-3',
    type: 'weekly_review',
    messages: [
      {
        id: 'msg-3-1',
        role: 'assistant',
        content: `週次レビューの時間です。今週の振り返りをしましょう。

**今週の実績サマリー**
- 英語学習: 6.5時間 / 10時間（65%）
- Web開発: 12時間 / 15時間（80%）
- 運動習慣: 4時間 / 5時間（80%）
- 読書習慣: 5.5時間 / 7時間（79%）

全体的に良好な進捗ですが、英語学習の時間が目標に届いていません。
何か課題がありましたか？`,
        timestamp: new Date('2025-06-02T20:00:00')
      },
      {
        id: 'msg-3-2',
        role: 'user',
        content: '月曜の午後に急な会議が入って、その分の遅れを取り戻せませんでした。来週は時間を確保したいです。',
        timestamp: new Date('2025-06-02T20:05:00')
      },
      {
        id: 'msg-3-3',
        role: 'assistant',
        content: `なるほど、突発的な予定変更への対応ですね。来週の計画を調整しましょう。

**来週の改善案**

1. **バッファ時間の確保**
   - 金曜午後に2時間の予備枠を設定
   - スキップした場合の振替先を事前に決定

2. **英語学習の優先順位アップ**
   - 朝の時間帯を7:00→6:30開始に前倒し
   - 土曜日に追加で2時間の枠を確保

3. **効率化の工夫**
   - 通勤時間でリスニング練習（+週2時間）
   - 昼休みに単語学習アプリ（+週2.5時間）

これらの調整で、より柔軟に目標時間を達成できるようになります。
他に改善したい点はありますか？`,
        timestamp: new Date('2025-06-02T20:10:00')
      }
    ],
    context: {
      relatedProjects: ['english-learning', 'web-development', 'exercise-habit', 'reading-habit']
    },
    createdAt: new Date('2025-06-02T20:00:00'),
    summary: '週次レビュー実施。英語学習時間の不足（65%達成）を改善するため、バッファ時間確保と通勤時間の活用を提案。',
    actionItems: [
      '金曜午後にバッファ時間を設定',
      '朝の英語学習を6:30開始に変更',
      '通勤時間用のリスニング教材準備'
    ]
  },
  {
    id: 'conv-4',
    type: 'adjustment',
    messages: [
      {
        id: 'msg-4-1',
        role: 'user',
        content: '今日は体調が悪くて、集中力が出ません。予定を軽めに調整してもらえますか？',
        timestamp: new Date('2025-05-28T06:30:00')
      },
      {
        id: 'msg-4-2',
        role: 'assistant',
        content: `体調が優れないのですね。無理は禁物です。今日の予定を軽めに調整しました。

**本日の調整プラン**

**削除するタスク:**
- 10:00-12:00 Web開発（集中作業）→ 休息
- 19:00-20:00 運動 → 軽いストレッチ15分に変更

**軽めのタスクに変更:**
- 7:00-9:00 英語学習 → リスニングのみ1時間に短縮
- 13:00-15:00 Web開発 → ドキュメント読みなど軽作業

**追加の回復サポート:**
- 十分な水分補給
- 可能なら昼寝30分
- 早めの就寝（21時目標）

明日以降で今日の分をカバーする計画も用意しています。
まずは体調回復を優先してください。`,
        timestamp: new Date('2025-05-28T06:35:00')
      },
      {
        id: 'msg-4-3',
        role: 'user',
        content: 'ありがとうございます。この調整で進めます。',
        timestamp: new Date('2025-05-28T06:40:00')
      }
    ],
    context: {
      relatedProjects: ['english-learning', 'web-development', 'exercise-habit']
    },
    createdAt: new Date('2025-05-28T06:30:00'),
    summary: '体調不良による当日計画の調整。集中作業を削除し、軽めのタスクに変更。回復を優先した計画に修正。',
    actionItems: [
      '英語学習を1時間のリスニングのみに短縮',
      'Web開発の集中作業をキャンセル',
      '運動を軽いストレッチに変更'
    ]
  },
  {
    id: 'conv-5',
    type: 'task_planning',
    projectId: 'web-development',
    messages: [
      {
        id: 'msg-5-1',
        role: 'user',
        content: 'Next.jsでブログサイトを作っていますが、どんな機能から実装すべきでしょうか？',
        timestamp: new Date('2025-05-25T14:00:00')
      },
      {
        id: 'msg-5-2',
        role: 'assistant',
        content: `Next.jsでのブログサイト構築ですね！効率的な開発順序を提案します。

**実装優先順位（MVP approach）**

**Phase 1: 基本構造（1週間）**
1. プロジェクトセットアップ
   - Next.js 14 App Router
   - TypeScript設定
   - TailwindCSS導入
   
2. レイアウトコンポーネント
   - ヘッダー/フッター
   - レスポンシブナビゲーション
   
3. ルーティング構造
   - ホーム、記事一覧、記事詳細

**Phase 2: コンテンツ管理（1週間）**
1. MDXセットアップ
   - MDXパーサー設定
   - シンタックスハイライト
   
2. 記事管理システム
   - フロントマター解析
   - 記事一覧生成
   
**Phase 3: 機能拡張（2週間）**
1. 検索機能
2. タグ/カテゴリー
3. 目次自動生成
4. OGP対応

この順序でいかがでしょうか？`,
        timestamp: new Date('2025-05-25T14:05:00')
      }
    ],
    context: {
      relatedProjects: ['web-development'],
      relatedTasks: ['task-11', 'task-12']
    },
    createdAt: new Date('2025-05-25T14:00:00'),
    summary: 'Next.jsブログサイトの実装計画を策定。MVP approachで基本構造→コンテンツ管理→機能拡張の3フェーズで進行。',
    actionItems: [
      'プロジェクトの初期セットアップ',
      'レイアウトコンポーネントの作成',
      'MDXパーサーの設定'
    ]
  }
]

export function getConversationsByType(type: ConversationSession['type']): ConversationSession[] {
  return mockConversations.filter(conv => conv.type === type)
}

export function getConversationsByProject(projectId: string): ConversationSession[] {
  return mockConversations.filter(conv => conv.projectId === projectId)
}

export function getLatestConversation(): ConversationSession {
  return mockConversations.sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  )[0]
}

export function getConversationSummaries(): Array<{
  id: string
  type: string
  summary: string
  date: Date
  projectName?: string
}> {
  return mockConversations.map(conv => ({
    id: conv.id,
    type: conv.type,
    summary: conv.summary || 'No summary available',
    date: conv.createdAt,
    projectName: conv.projectId ? 
      conv.projectId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ') : undefined
  }))
}