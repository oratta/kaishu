#PROJECTS/KAISHU

# LLMベース ライフマネジメントシステム - プロダクト要件定義書 (PRD)

## 1. 製品概要

### 1.1 製品名

**AI Life Management System (ALMS)**

### 1.2 ビジョン

LLMとの対話を通じて人生の目標を実現するための時間配分を最適化し、「今この瞬間何をすべきか」を常に明確にすることで、ユーザが人生で達成したい目標を着実に達成できるようにサポートするライフオーケストレーションシステム。

### 1.3 コア機能コンセプト

**リアルタイムタスク生成**

- 現在の時間ブロックで何をすべきかをLLMがリアルタイムで提案
- 各時間ブロック開始時に「これから1時間で何を成し遂げるか」をLLMとセッション
- 生成されたタスクリストに基づいて作業を進行

**動的計画調整**

- 二日酔い・体調不良・モチベーション変化に応じて当日の計画を自動調整
- 負荷軽減と後日の回復プランを同時に提案
- 状況変化を伝えるだけで最適化された代替案を生成

**時間割ベース管理**

- カレンダーに「LLM研究」「KGプロジェクト作業」等の時間ブロックを配置
- LLMが時間の使い方グラフを作成し、週間予定を自動生成
- 時間ブロック内の具体的な作業内容はセッション時に決定

**継続的タスク管理**

- 未完了タスクは自動的に次回同プロジェクトの時間に引き継ぎ
- プロジェクトごとのタスク管理でコンテキストを維持
- タスク管理ツールとして機能する充実した機能セット

### 1.4 コアバリュー

- **対話型計画立案**: LLMとの自然な対話でユーザの目標を達成するためのプロジェクトの設計と、プロジェクト間の時間配分を設計
- **リアルタイム最適化**: 今この瞬間の最適な一週間分のカレンダーを動的に生成
- **柔軟な適応**: 体調や状況の変化に応じて自動的に計画を調整
- **包括的管理**: 目標達成のためのプロジェクト・タスク・習慣を統合的に管理

## 2. ユーザーペルソナ

### 2.1 プライマリペルソナ

- **属性**:
  - 多様な目標を持つ知識労働者
  - 自己実現への意欲が高い
  - 計画性はあるが実行時の柔軟性に課題
- **目標例**:
  - 英語学習の継続
  - 運動習慣の確立
  - ソフトウェア開発
  - 家族時間の確保
  - 健康習慣（禁煙、ダイエット）の実現
- **課題**:
  - 複数目標のバランス調整が困難
  - 日々の変動への対応が手動では追いつかない
  - 「今何をすべきか」の判断に迷う
  - 習慣化の継続が難しい

### 2.2 利用シナリオ

1. **初期設定**: LLMと対話しながら人生の目標と時間配分を設計
2. **週次計画**: 今日から1週間の時間割をLLMが自動生成
3. **毎朝の調整**: 体調や状況を伝えて当日の計画を最適化
4. **作業開始時**: 時間割の各ブロック開始時に具体的なタスクをLLMと決定
5. **進捗管理**: タスクの実行状況を記録し、次回に引き継ぎ

## 3. 機能要件

### 3.1 LLM対話機能

#### 3.1.1 対話型目標設定

```typescript
interface GoalSettingDialog {
  startConversation(): ConversationSession

  extractGoals(conversation: Message[]): LifeGoal[]

  suggestTimeAllocation(goals: LifeGoal[]): TimeAllocationPlan

  refineWithFeedback(plan: TimeAllocationPlan, feedback: string): TimeAllocationPlan
}

interface LifeGoal {
  id: string
  type: 'project' | 'habit' | 'skill' | 'health' | 'relationship'
  name: string
  description: string
  targetOutcome: string
  suggestedTimePerWeek: number
  priority: 1 | 2 | 3
  measurementCriteria: string[]
}
```

#### 3.1.2 リアルタイムタスク生成

```typescript
interface TaskGenerationSession {
  context: {
    currentTimeBlock: TimeBlock
    projectContext: Project
    previousTasks: Task[]
    energyLevel: EnergyLevel
    availableTime: number
  }

  generateTasks(): Promise<{
    suggestedTasks: Task[]
    reasoning: string
    expectedOutcomes: string[]
  }>

  refineTask(taskId: string, feedback: string): Promise<Task>
}
```

#### 3.1.3 動的調整対話

```typescript
interface AdjustmentDialog {
  reportCondition(condition: {
    type: 'hangover' | 'sick' | 'tired' | 'motivated' | 'busy'
    severity: 1 | 2 | 3
    details?: string
  }): void

  generateAdjustedPlan(): {
    todaysPlan: DailyPlan
    recoveryPlan: WeeklyAdjustment
    recommendations: string[]
  }
}
```

### 3.2 時間管理機能

#### 3.2.1 時間配分グラフ生成

```typescript
interface TimeAllocationVisualizer {
  generateAllocationChart(params: {
    goals: LifeGoal[]
    period: 'daily' | 'weekly' | 'monthly'
    type: 'target' | 'actual' | 'comparison'
  }): {
    chartData: ChartData
    insights: string[]
    recommendations: Adjustment[]
  }
}

interface ChartData {
  type: 'pie' | 'bar' | 'stacked' | 'sunburst'
  data: {
    categories: string[]
    values: number[]
    colors: string[]
  }
  annotations: ChartAnnotation[]
}
```

#### 3.2.2 カレンダー統合

```typescript
interface CalendarManager {
  createTimeBlocks(plan: WeeklyPlan): void

  timeBlockFormat: {
    title: string // 例: "LLM研究", "KGプロジェクト作業"
    color: string
    project: Project
    plannedTasks?: Task[]
  }

  syncWithExternalCalendar(provider: 'google' | 'outlook' | 'apple'): void
}
```

### 3.3 プロジェクト管理機能

#### 3.3.1 プロジェクト構造

```typescript
interface Project {
  id: string
  name: string
  type: 'work' | 'learning' | 'health' | 'personal'
  goal: string
  phases: Phase[]
  requiredHabits: Habit[]
  relatedProjects: string[]
  weeklyTargetHours: number
  actualHoursThisWeek: number
  notes: Note[]
  llmGeneratedSummary?: string
}

interface Phase {
  id: string
  name: string
  startDate: Date
  endDate: Date
  objectives: string[]
  tasks: Task[]
  status: 'planned' | 'active' | 'completed'
}
```

#### 3.3.2 タスク管理

```typescript
interface Task {
  id: string
  projectId: string
  phaseId?: string
  title: string
  description: string
  estimatedDuration: number // LLM推定時間
  actualDuration?: number
  status: 'todo' | 'doing' | 'done' | 'carried_over'
  carriedFrom?: string // 前回から引き継がれたタスクID
  createdBy: 'user' | 'llm'
  createdAt: Date
  startedAt?: Date
  completedAt?: Date
}

interface TaskSession {
  timeBlockId: string
  tasks: Task[]

  startTask(taskId: string): void
  pauseTask(taskId: string): void
  completeTask(taskId: string): void
  carryOverTasks(): Task[] // 未完了タスクを次回に引き継ぎ
}
```

### 3.4 習慣管理機能

#### 3.4.1 習慣定義

```typescript
interface Habit {
  id: string
  projectId: string
  name: string
  type: 'daily' | 'weekly' | 'count_based'
  target: {
    daily?: { count: number; unit: string }
    weekly?: { count: number; unit: string }
    countBased?: {
      action: string // 例: "タバコを吸わない"
      trackingType: 'streak' | 'total'
    }
  }
  tracking: HabitTracking
  reminders: Reminder[]
}

interface HabitTracking {
  todayStatus: 'pending' | 'completed' | 'failed'
  streak: number
  totalCount: number
  history: HabitRecord[]
  successRate: number
}
```

### 3.5 UI/UXビュー仕様

#### 3.5.1 ダッシュボード

**画面イメージ**

```
┌─────────────────────────────────────────────────────────────┐
│  🏠 KAISHU Dashboard               💬 [LLMチャット]        │
├─────────────────────┬───────────────────────────────────────┤
│  📅 今日のカレンダー  │  📝 現在のプロジェクトタスク           │
│  ┌─────────────────┐  │  ┌─────────────────────────────────────┐ │
│  │ 09:00 ▶ 英語学習 │  │  │ ✓ 単語帳アプリ起動 (15分)           │ │
│  │ 10:00   開発作業 │  │  │ 🔵 文法練習 (30分) ← 実行中        │ │
│  │ 12:00   昼食     │  │  │ ⚪ リスニング (15分)               │ │
│  │ 13:00   開発作業 │  │  └─────────────────────────────────────┘ │
│  │ 15:00   休憩     │  │                                       │
│  └─────────────────┘  │  ⏱️ 進行中: 文法練習                 │
│                      │  ├ 経過時間: 12分 / 目標30分          │
│                      │  └ 進捗: ████████░░ 40%             │
│                      │                                       │
│                      │  📋 プロジェクトメモ                  │
│                      │  ┌─────────────────────────────────────┐ │
│                      │  │ - 今日は発音に重点を置く            │ │
│                      │  │ - 次回は過去形の復習                │ │
│                      │  └─────────────────────────────────────┘ │
└─────────────────────┴───────────────────────────────────────┘
```

**機能一覧**

- **リアルタイム時間表示**: 現在時刻のハイライト表示
- **当日カレンダー**: 今日の時間ブロック一覧
- **現在のタスク表示**: アクティブなプロジェクトのタスク一覧
- **ワンタップタスク開始**: タスクをdoing状態に変更
- **作業中タイマー**: 経過時間と目標時間の進捗表示
- **作業中アニメーション**: 実行中タスクの視覚的フィードバック
- **プロジェクトメモ**: リアルタイムメモ機能
- **フローティングLLMチャット**: 全画面からアクセス可能

```typescript
interface DashboardView {
  layout: {
    left: {
      todayCalendar: CalendarWidget
      currentTimeHighlight: TimeIndicator
    }
    right: {
      upper: {
        currentProjectTasks: TaskListWidget
        activeTask?: ActiveTaskDisplay
      }
      lower: {
        projectNotes: NotesWidget
      }
    }
  }

  floatingLLMChat: ChatInterface // どこからでも呼び出し可能
}

interface ActiveTaskDisplay {
  taskName: string
  animation: 'working' | 'paused'
  timer: {
    elapsed: number
    target: number
    progress: number // パーセンテージ
  }
}
```

#### 3.5.2 プロジェクトリストビュー

**画面イメージ**

```
┌─────────────────────────────────────────────────────────────┐
│  📊 プロジェクト管理                    💬 [LLMチャット]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📋 プロジェクト一覧                                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ プロジェクト名  │週目標│実績│達成率│ステータス         │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │ 英語能力向上    │ 10h  │ 8h │ 80% │ 🟢 順調           │ │
│  │ 運動習慣確立    │  5h  │ 6h │120% │ 🔵 超過達成       │ │
│  │ Web開発学習     │ 15h  │ 9h │ 60% │ 🟡 要調整         │ │
│  │ 家族時間確保    │  8h  │ 8h │100% │ 🟢 達成           │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  📈 時間配分グラフ                                         │
│  ┌─────────────────┐     ┌─────────────────┐                 │
│  │   目標配分      │     │   実績配分      │                 │
│  │  ┌─ 英語 26%    │     │  ┌─ 英語 25%    │                 │
│  │  ├─ 運動 13%    │     │  ├─ 運動 19%    │                 │
│  │  ├─ 開発 39%    │     │  ├─ 開発 29%    │                 │
│  │  └─ 家族 21%    │     │  └─ 家族 26%    │                 │
│  └─────────────────┘     └─────────────────┘                 │
│                                                             │
│  🤖 LLMインサイト                                          │
│  「運動習慣が予想以上に順調です。Web開発の時間を確保する   │
│   ため、明日の英語学習時間を30分短縮することを提案します」 │
└─────────────────────────────────────────────────────────────┘
```

**機能一覧**

- **プロジェクト進捗テーブル**: 週目標vs実績の一覧表示
- **達成率カラーコーディング**: 視覚的な進捗状況表示
- **目標・実績時間配分円グラフ**: 双方向の時間配分比較
- **LLM生成インサイト**: 進捗に基づく自動提案
- **プロジェクト詳細遷移**: 行クリックで詳細画面へ
- **時間配分調整提案**: バランス改善の具体的提案

```typescript
interface ProjectListView {
  projectTable: {
    columns: ['プロジェクト名', '週目標時間', '実績時間', '達成率', 'ステータス']
  }

  allocationCharts: {
    targetPieChart: PieChart
    actualPieChart: PieChart
  }

  insights: LLMGeneratedInsights
}
```

#### 3.5.3 プロジェクトビュー

**画面イメージ**

```
┌─────────────────────────────────────────────────────────────┐
│  📚 英語能力向上プロジェクト              💬 [LLMチャット]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📖 プロジェクト概要                                       │
│  目標: TOEIC 800点突破, 日常会話レベル到達                 │
│  期間: 2025/01/01 - 2025/06/30 (6ヶ月)                    │
│                                                             │
│  🤖 LLMサマリー                                            │
│  「現在マイルストーン1の基礎固めを実行中。語彙力強化が順調で、    │
│   次のマイルストーン2でリスニング強化に移行予定」               │
│                                                             │
│  🔗 関連プロジェクト                                       │
│  [Web開発学習] ← 英語ドキュメント読解で相互作用            │
│  [海外旅行計画] ← 実践的な英会話スキル活用                 │
│                                                             │
│  📋 マイルストーン一覧                                           │
│  ▼ Milestone 1: 基礎固め (1-2月) 🟢進行中                     │
│  ▷ Milestone 2: リスニング強化 (3-4月)                        │
│  ▷ Milestone 3: スピーキング練習 (5-6月)                      │
│                                                             │
│  ──────── Milestone 1 詳細 ────────                           │
│  ┌─────────────────┬───────────────────────────────────────┤
│  │  📅 カレンダー   │  ✅ タスクリスト                     │
│  │  ┌─────────────┐ │  ┌─────────────────────────────────────┐ │
│  │  │月 火 水 木 金│ │  │ ✓ 単語帳100語 (完了)                │ │
│  │  │■  ■  ■  ■  ■│ │  │ 🔵 文法書Ch.3 (進行中)               │ │
│  │  │■  ■  ■  ■  ■│ │  │ ⚪ 発音練習30分                      │ │
│  │  └─────────────┘ │  │ ⚪ リスニング教材                    │ │
│  │                  │  └─────────────────────────────────────┘ │
│  └─────────────────┴───────────────────────────────────────┤
│                                                             │
│  🔄 必要な習慣                                             │
│  • 毎日単語10個暗記 (連続15日) ✅                          │
│  • 英語ニュース読解 (連続8日) 🟡                           │
│  • シャドーイング練習 (連続3日) 🔴                         │
└─────────────────────────────────────────────────────────────┘
```

**機能一覧**

- **プロジェクト概要表示**: 目標・期間・現在状況
- **LLM生成サマリー**: 進捗状況の自動要約
- **関連プロジェクトグラフ**: 依存関係の可視化
- **マイルストーンアコーディオン**: 展開可能なマイルストーン一覧
- **現在マイルストーン詳細**: カレンダー＋タスクリスト連携表示
- **必要な習慣表示**: プロジェクト固有の習慣管理
- **進捗インジケーター**: マイルストーンごとの達成状況
- **メモ・ノート機能**: プロジェクト固有の記録

```typescript
interface ProjectDetailView {
  header: {
    overview: ProjectSummary
    llmSummary: string
    relatedProjectsGraph: NetworkGraph
  }

  body: {
    phases: PhaseAccordion
    habits: HabitList
    notes: NotesList
  }

  activePhaseDetail: {
    calendar: CalendarWidget
    taskList: TaskListWidget
    progress: ProgressIndicators
  }
}
```

#### 3.5.4 タスクリストビュー

**画面イメージ**

```
┌─────────────────────────────────────────────────────────────┐
│  📝 タスク管理                          💬 [LLMチャット]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🔍 フィルター                                             │
│  [🎯すべてのプロジェクト▼] [📊すべてのステータス▼] [📅今週▼] │
│                                                             │
│  📊 表示形式: [📋リスト] [📌カンバン] [📈タイムライン]       │
│                                                             │
│  ──────── プロジェクト別グループ ────────                   │
│                                                             │
│  📚 英語能力向上                                           │
│  ┌─ TODO ─────┬─ DOING ────┬─ DONE ──────────────────────┐ │
│  │ 📖 文法練習  │ 🎧 リスニング│ ✅ 単語帳100語              │ │
│  │   30分       │   45分      │ ✅ 発音練習                │ │
│  │              │            │ ✅ 英作文5題                │ │
│  │ 📝 英作文    │            │                            │ │
│  │   20分       │            │                            │ │
│  └─────────────┴────────────┴────────────────────────────┘ │
│                                                             │
│  💻 Web開発学習                                            │
│  ┌─ TODO ─────┬─ DOING ────┬─ DONE ──────────────────────┐ │
│  │ ⚛️ React復習 │            │ ✅ JavaScript基礎           │ │
│  │   90分       │            │ ✅ HTML/CSS復習             │ │
│  │              │            │                            │ │
│  │ 🔧 API実装   │            │                            │ │
│  │   120分      │            │                            │ │
│  └─────────────┴────────────┴────────────────────────────┘ │
│                                                             │
│  ➕ [クイック追加] 💡 [LLMタスク生成] 🔄 [一括編集]        │
└─────────────────────────────────────────────────────────────┘
```

**機能一覧**

- **多軸フィルタリング**: プロジェクト・ステータス・日付範囲
- **複数表示形式**: リスト・カンバン・タイムライン切替
- **プロジェクト別グルーピング**: コンテキスト別整理
- **ドラッグ&ドロップ**: ステータス間の移動
- **バルク編集**: 複数タスクの一括操作
- **クイック追加**: 素早いタスク作成
- **LLMタスク生成**: AIによる自動タスク提案
- **時間見積もり表示**: 各タスクの推定所要時間
- **進捗状況可視化**: TODO/DOING/DONEの状態管理

```typescript
interface TaskListView {
  filters: {
    project: MultiSelect
    status: MultiSelect
    dateRange: DateRangePicker
  }

  grouping: 'project' | 'date' | 'status' | 'phase'

  taskList: {
    style: 'kanban' | 'list' | 'timeline'
    features: ['drag_drop', 'bulk_edit', 'quick_add']
  }
}
```

#### 3.5.5 習慣ビュー

**画面イメージ**

```
┌─────────────────────────────────────────────────────────────┐
│  🔄 習慣管理                            💬 [LLMチャット]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📅 今日の習慣                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 📚 英語単語10個      [✅完了]    連続15日 🔥              │ │
│  │ 🏃 ランニング30分    [⏳実行中]  連続8日               │ │
│  │ 🚭 禁煙継続         [✅完了]    連続45日 🎉             │ │
│  │ 💧 水2L摂取         [⚪未実行]  連続3日                │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  📊 週間進捗                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │        月 火 水 木 金 土 日                            │ │
│  │ 英語学習 ✅ ✅ ✅ ✅ ✅ ✅ ⚪   6/7日                     │ │
│  │ 運動     ✅ ❌ ✅ ✅ ✅ ✅ ⚪   5/7日                     │ │
│  │ 禁煙     ✅ ✅ ✅ ✅ ✅ ✅ ✅   7/7日 Perfect!           │ │
│  │ 水分補給 ✅ ✅ ❌ ✅ ✅ ❌ ⚪   4/7日                     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  🏆 ストリーク & 実績                                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🥇 最長ストリーク: 禁煙 45日                            │ │
│  │ 🔥 現在の記録: 英語学習 15日                            │ │
│  │ 🎯 今月の成功率: 87%                                   │ │
│  │ 🏅 バッジ: [📚学習マスター] [💪健康戦士] [🚭禁煙ヒーロー] │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  📈 分析 & 提案                                            │
│  🤖 「水分補給の成功率が低下しています。リマインダーを     │
│     午前10時と午後3時に設定することを提案します」          │
│                                                             │
│  📊 [詳細分析] 🔔 [リマインダー設定] ➕ [新しい習慣]      │
└─────────────────────────────────────────────────────────────┘
```

**機能一覧**

- **今日の習慣チェック**: 当日実行すべき習慣一覧
- **ワンタップ完了**: 簡単な習慣記録
- **ストリーク表示**: 連続実行日数の可視化
- **週間進捗グリッド**: 7日間の実行状況マトリックス
- **成功率カラーコーディング**: 視覚的な達成度表示
- **実績バッジシステム**: ゲーミフィケーション要素
- **LLM分析・提案**: パターン分析と改善提案
- **プロジェクト連携**: 関連プロジェクトとの統合管理
- **カスタムリマインダー**: 個別通知設定
- **詳細分析ダッシュボード**: 長期トレンド分析

```typescript
interface HabitView {
  habitGrid: {
    todayHabits: HabitCard[]
    weeklyProgress: WeeklyHabitChart
  }

  streakDisplay: {
    currentStreaks: StreakCard[]
    achievements: AchievementBadges
  }

  habitAnalytics: {
    successRates: Chart
    patterns: LLMAnalysis
    recommendations: string[]
  }
}
```

### 3.6 LLM統合アーキテクチャ

#### 3.6.1 LLMエージェント

```typescript
interface LLMAgent {
  // コンテキスト管理
  context: {
    userProfile: UserProfile
    currentProjects: Project[]
    historicalData: UserHistory
    preferences: UserPreferences
  }

  // 各種エージェント
  agents: {
    planner: PlanningAgent
    taskGenerator: TaskGenerationAgent
    habitCoach: HabitCoachingAgent
    analyst: AnalyticsAgent
  }
}

class PlanningAgent {
  async generateWeeklyPlan(
    goals: LifeGoal[],
    constraints: Constraint[],
    context: UserContext
  ): Promise<WeeklyPlan> {
    const prompt = this.buildPlanningPrompt(goals, constraints, context)
    const response = await this.llm.complete(prompt)
    return this.parsePlanResponse(response)
  }

  async adjustDailyPlan(condition: UserCondition, originalPlan: DailyPlan): Promise<AdjustedPlan> {
    const prompt = this.buildAdjustmentPrompt(condition, originalPlan)
    const response = await this.llm.complete(prompt)
    return this.parseAdjustmentResponse(response)
  }
}
```

## 4. 技術アーキテクチャ

### 4.1 技術スタック

```yaml
frontend:
  web: Next.js 14 + TypeScript + TailwindCSS + shadcn/ui
  mobile: React Native + Expo
  state: Zustand + TanStack Query
  charts: Recharts + D3.js

backend:
  api: Node.js + Fastify + TypeScript
  database: PostgreSQL + Prisma
  cache: Redis
  queue: BullMQ
  vector_db: Pinecone # ユーザーコンテキスト用

llm_layer:
  primary: OpenAI GPT-4o
  fallback: Claude 3.5 Sonnet
  embedding: text-embedding-3-small
  prompt_management: LangChain
  context_window: 128k tokens

infrastructure:
  cloud: Vercel + AWS
  monitoring: Vercel Analytics + Sentry
  ci_cd: GitHub Actions
  auth: Clerk
```

### 4.2 データモデル

#### 4.2.1 life_goals: ユーザ目標

ユーザの人生目標を表現するマスターエンティティ。「どんな経験をしたいか」「どんな状態になりたいか」を定義する。

**データ構造の特徴:**

- life_goalsを達成するためには、1つ以上の達成条件(goal_conditions)が必要
- 各goal_conditionsは0個以上のプロジェクト(projects)によって実現される
- プロジェクトが未作成のgoal_conditionsも存在可能（計画段階）

**ステータス定義:**

- 0: 未計画 - 書き留められただけの初期状態
- 1: 計画中 - goal_conditionsは定義されているがプロジェクト未作成
- 2: 実行中 - 関連プロジェクトの一部または全部が進行中
- 3: 停止中 - 関連する全プロジェクトが停止状態
- 10: 達成済み - ユーザによる達成認定
- 11: 放棄 - ユーザによる放棄宣言

```sql
-- ユーザー目標 (どんな経験をしたいか、どんな状態になりたいか)
CREATE TABLE life_goals (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL, -- 例: 英語読解を向上させて日本語と変わらないスピードで英語キャッチアップができる経験をする
    description TEXT,
    status INTEGER NOT NULL DEFAULT 0,
    priority INTEGER NOT NULL DEFAULT 3, -- 優先度(1: 最優先, 2: 優先, 3: 普通, 4: 低い, 5: 最下位)
    target_completion_date DATE, -- 目標達成希望日
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_status CHECK (status IN (0,1,2,3,10,11)),
    CONSTRAINT chk_priority CHECK (priority BETWEEN 1 AND 5)
);
```

#### 4.2.2 goal_conditions: ユーザ目標の達成条件

life_goalsを達成するために必要な具体的な条件を定義する中間エンティティ。大きな目標を実現可能な単位に分解する役割を持つ。

**データ構造の特徴:**

- 1つのlife_goalに対して複数のgoal_conditionsが存在可能
- 各goal_conditionsは0個以上のプロジェクト(projects)によって実現される
- プロジェクト未作成でも条件として定義可能（将来の計画段階）
- 条件間の依存関係を表現可能（prerequisite_condition_id）

**ステータス定義:**

- 1: 計画中 - 関連プロジェクトが未作成
- 2: 実行中 - 関連プロジェクトの一部または全部が進行中
- 3: 停止中 - 関連する全プロジェクトが停止状態
- 10: 達成済み - ユーザによる達成認定
- 11: 放棄 - ユーザによる放棄宣言
- 12: ブロック中 - 前提条件未達成により開始不可

```sql
-- 目標達成条件
CREATE TABLE goal_conditions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    life_goal_id UUID REFERENCES life_goals(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- 例: TOEIC800点を取得する, 日常英会話ができるようになる
    description TEXT,
    status INTEGER NOT NULL DEFAULT 1,
    display_order INTEGER NOT NULL DEFAULT 0, -- 表示順序
    prerequisite_condition_id UUID REFERENCES goal_conditions(id), -- 前提となる条件
    estimated_completion_weeks INTEGER, -- 完了予想週数
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_condition_status CHECK (status IN (1,2,3,10,11,12))
);
```

#### 4.2.3 projects: プロジェクト

goal_conditionsを達成するための具体的な実行単位。時間配分とマイルストーンを持つ実装エンティティ。

**データ構造の特徴:**

- 各プロジェクトは特定のgoal_conditionに紐づく
- 0個以上のマイルストーン(milestones)で構成される
- タスク(tasks)と習慣(habits)を包含する
- 時間配分方式: 週N時間 または 空き時間のM%

**プロジェクトタイプ:**

- learning: 学習・スキルアップ
- health: 健康・運動
- work: 仕事・キャリア
- hobby: 趣味・創作
- relationship: 人間関係
- other: その他

**ステータス定義:**

- 1: 計画中 - 作成されたが未開始
- 2: 実行中 - アクティブに進行中
- 3: 停止中 - 一時停止状態
- 10: 完了 - プロジェクト目標達成
- 11: 中止 - プロジェクト中止

```sql
-- プロジェクト (goal_conditionsを達成するための実行単位)
CREATE TABLE projects (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    goal_condition_id UUID REFERENCES goal_conditions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- learning, health, work, hobby, relationship, other
    description TEXT,
    status INTEGER NOT NULL DEFAULT 1,
    weekly_target_hours DECIMAL(5,2), -- 週N時間の時間配分
    weekly_free_time_percentage DECIMAL(5,2), -- 空き時間のM%の時間配分
    start_date DATE,
    target_end_date DATE,
    actual_end_date DATE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_project_status CHECK (status IN (1,2,3,10,11)),
    CONSTRAINT chk_time_allocation CHECK (
        (weekly_target_hours IS NOT NULL AND weekly_free_time_percentage IS NULL) OR
        (weekly_target_hours IS NULL AND weekly_free_time_percentage IS NOT NULL)
    )
);
```

#### 4.2.4 milestones: マイルストーン

プロジェクトを時系列で区切る中間目標。期限と達成基準を持つ進捗管理の単位。

**データ構造の特徴:**

- 各プロジェクトを複数のマイルストーンに分割
- 順序性を持つ（milestone_number）
- 期間設定（start_date, end_date）
- タスクと習慣の割り当て先
- 達成基準（objectives）の定義

**ステータス定義:**

- planned: 計画済み（未開始）
- active: 進行中
- completed: 完了
- blocked: ブロック中（前段階未完了）
- cancelled: キャンセル

```sql
-- マイルストーン (プロジェクトの中間目標・フェーズ管理)
CREATE TABLE milestones (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    milestone_number INTEGER NOT NULL, -- プロジェクト内での順序
    name VARCHAR(255) NOT NULL, -- 例: 基礎固め, リスニング強化, スピーキング練習
    description TEXT,
    objectives TEXT[], -- 達成基準の配列
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'planned',
    progress_percentage INTEGER DEFAULT 0, -- 進捗率 0-100
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    UNIQUE(project_id, milestone_number),
    CONSTRAINT chk_milestone_status CHECK (status IN ('planned','active','completed','blocked','cancelled')),
    CONSTRAINT chk_progress CHECK (progress_percentage BETWEEN 0 AND 100)
);
```

#### 4.2.5 time_blocks: 時間ブロック

カレンダー上の作業時間枠。特定プロジェクトへの時間割り当てと実行追跡を行うエンティティ。

**データ構造の特徴:**

- プロジェクトごとの時間枠配置
- 計画時間 vs 実際時間の追跡
- セッション開始により実働時間記録
- 計画タスク vs 実行タスクの管理
- LLMによるタスク生成結果の保存

**ステータス定義:**

- scheduled: スケジュール済み（未開始）
- in_progress: 実行中
- completed: 完了
- skipped: スキップ
- cancelled: キャンセル

```sql
-- 時間ブロック (カレンダー上の作業時間枠)
CREATE TABLE time_blocks (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id), -- 関連マイルストーン（任意）
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    actual_start_time TIMESTAMP, -- 実際の開始時間
    actual_end_time TIMESTAMP, -- 実際の終了時間
    planned_tasks JSONB, -- 計画されたタスクリスト
    actual_tasks JSONB, -- 実際に実行されたタスクリスト
    session_notes TEXT, -- セッション時のメモ
    energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 5), -- エネルギーレベル
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_timeblock_status CHECK (status IN ('scheduled','in_progress','completed','skipped','cancelled')),
    INDEX idx_user_time (user_id, start_time),
    INDEX idx_project_time (project_id, start_time)
);
```

#### 4.2.6 tasks: タスク

プロジェクト・マイルストーン配下の具体的な作業単位。LLMによるセッション時生成と手動作成の両方に対応。

**データ構造の特徴:**

- プロジェクト・マイルストーンへの紐づけ
- 推定時間 vs 実働時間の追跡
- 未完了タスクの自動引き継ぎ機能（carried_from）
- LLM生成 vs 手動作成の識別
- タスク間の依存関係表現

**ステータス定義:**

- todo: 未着手
- in_progress: 実行中
- completed: 完了
- carried_over: 次回に引き継ぎ
- cancelled: キャンセル

```sql
-- タスク (具体的な作業単位)
CREATE TABLE tasks (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id), -- 関連マイルストーン（任意）
    time_block_id UUID REFERENCES time_blocks(id), -- 生成元時間ブロック（任意）
    title VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_duration INTEGER, -- 推定所要時間（分）
    actual_duration INTEGER, -- 実際の所要時間（分）
    status VARCHAR(50) NOT NULL DEFAULT 'todo',
    priority INTEGER DEFAULT 3, -- 優先度 1-5
    carried_from UUID REFERENCES tasks(id), -- 引き継ぎ元タスク
    depends_on UUID REFERENCES tasks(id), -- 依存タスク
    created_by VARCHAR(50) NOT NULL, -- user | llm
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    due_date DATE, -- 期限日
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT chk_task_status CHECK (status IN ('todo','in_progress','completed','carried_over','cancelled')),
    CONSTRAINT chk_task_priority CHECK (priority BETWEEN 1 AND 5),
    INDEX idx_project_status (project_id, status),
    INDEX idx_milestone_status (milestone_id, status)
);
```

#### 4.2.7 habits: 習慣

プロジェクト達成に必要な継続的行動パターンを管理するエンティティ。タスクとは異なり、反復的な実行が期待される行動単位。

**データ構造の特徴:**

- 各プロジェクトに必要な習慣を定義
- 日次・週次・カウントベースの多様な習慣タイプに対応
- 目標設定（frequency, target_value）
- ストリーク（連続実行記録）の自動計算
- リマインダー設定による継続支援

**習慣タイプ:**

- daily: 毎日実行する習慣（例：英単語10個、筋トレ30分）
- weekly: 週N回実行する習慣（例：週3回ジム、週2回読書）
- count_based: カウント系習慣（例：禁煙連続日数、水分摂取量）
- streak: 連続記録重視（例：継続日数の記録）

**ステータス定義:**

- active: アクティブな習慣
- paused: 一時停止中
- completed: 習慣確立完了
- cancelled: 習慣中止

```sql
-- 習慣 (プロジェクト達成に必要な継続的行動パターン)
CREATE TABLE habits (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- 例: 英単語10個暗記, 毎日30分ランニング, 禁煙継続
    description TEXT,
    type VARCHAR(50) NOT NULL, -- daily, weekly, count_based, streak
    status VARCHAR(50) NOT NULL DEFAULT 'active',

    -- 目標設定（習慣タイプに応じて使い分け）
    frequency_type VARCHAR(50), -- daily, weekly, monthly
    target_frequency INTEGER, -- 週N回、月N回など
    target_value DECIMAL(10,2), -- 目標値（時間、個数、量など）
    target_unit VARCHAR(50), -- 単位（分、個、kg、など）

    -- リマインダー設定
    reminder_enabled BOOLEAN DEFAULT true,
    reminder_times TEXT[], -- リマインダー時刻の配列

    -- 統計用フィールド
    current_streak INTEGER DEFAULT 0, -- 現在の連続実行日数
    best_streak INTEGER DEFAULT 0, -- 最高連続記録
    total_count INTEGER DEFAULT 0, -- 総実行回数

    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT chk_habit_status CHECK (status IN ('active','paused','completed','cancelled')),
    CONSTRAINT chk_frequency_type CHECK (frequency_type IN ('daily','weekly','monthly') OR frequency_type IS NULL),
    INDEX idx_project_habits (project_id, status),
    INDEX idx_user_habits (user_id, status)
);
```

#### 4.2.8 habit_records: 習慣記録

習慣の日々の実行記録を保存するエンティティ。ストリーク計算、成功率分析、パターン分析の基礎データとなる。

**データ構造の特徴:**

- 習慣ごとの日次実行記録
- 実行状態（完了・失敗・部分完了）の追跡
- 実行値（時間、個数、量など）の記録
- メモによる詳細情報の保存
- 一意制約により重複記録を防止

**ステータス定義:**

- completed: 目標達成（習慣実行完了）
- partial: 部分達成（目標の一部実行）
- failed: 未実行（目標未達成）
- skipped: 意図的スキップ（病気、休暇など）

**記録方式:**

- 自動記録: タスク完了時の自動記録
- 手動記録: ユーザーによる手動入力
- デバイス連携: ウェアラブルデバイスからの自動同期

```sql
-- 習慣記録 (習慣の日々の実行記録)
CREATE TABLE habit_records (
    id UUID PRIMARY KEY,
    habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(50) NOT NULL, -- completed, partial, failed, skipped

    -- 実行値記録
    actual_value DECIMAL(10,2), -- 実際の実行値
    target_value DECIMAL(10,2), -- その日の目標値
    unit VARCHAR(50), -- 単位

    -- 追加情報
    notes TEXT, -- メモ・特記事項
    completion_time TIMESTAMP, -- 完了時刻

    -- メタデータ
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,

    UNIQUE(habit_id, date),
    CONSTRAINT chk_habit_record_status CHECK (status IN ('completed','partial','failed','skipped')),
    INDEX idx_habit_date (habit_id, date),
    INDEX idx_user_date (user_id, date)
);
```

#### 4.2.9 llm_conversations: LLM対話履歴

LLMとのすべての対話セッションを記録するエンティティ。コンテキスト保持、学習データ蓄積、デバッグ、ユーザー体験改善の基盤となる。

**データ構造の特徴:**

- 対話タイプ別の分類管理
- 対話コンテキストの構造化保存
- メッセージ履歴の完全保存
- 対話結果（生成物）の記録
- LLMパフォーマンス指標の追跡

**対話タイプ:**

- goal_setting: 目標設定ヒアリング
- task_generation: タスク生成セッション
- schedule_adjustment: スケジュール調整
- project_planning: プロジェクト計画
- habit_coaching: 習慣形成コーチング
- general_chat: 一般的な相談・質問
- analysis: 進捗分析・洞察生成

**対話結果タイプ:**

- projects: 生成されたプロジェクト
- tasks: 生成されたタスクリスト
- schedule: 調整されたスケジュール
- insights: 分析結果・推奨事項
- plans: 計画・提案

```sql
-- LLM対話履歴 (すべてのLLM対話セッションの記録)
CREATE TABLE llm_conversations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    session_id UUID, -- 関連セッションをグループ化
    type VARCHAR(50) NOT NULL, -- goal_setting, task_generation, schedule_adjustment等
    title VARCHAR(255), -- 対話セッションのタイトル

    -- 対話コンテキスト
    context JSONB, -- プロジェクト情報、時間ブロック情報等

    -- 対話内容
    messages JSONB NOT NULL, -- メッセージ履歴の配列

    -- 対話結果
    outcome JSONB, -- 生成されたタスク、プロジェクト、スケジュール等
    outcome_type VARCHAR(50), -- projects, tasks, schedule, insights, plans

    -- LLMメタデータ
    llm_model VARCHAR(100), -- 使用したLLMモデル
    llm_version VARCHAR(50), -- モデルバージョン
    total_tokens INTEGER, -- 使用トークン数
    prompt_tokens INTEGER, -- プロンプトトークン数
    completion_tokens INTEGER, -- 生成トークン数
    response_time_ms INTEGER, -- レスポンス時間（ミリ秒）

    -- ユーザー評価
    user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5), -- 1-5星評価
    user_feedback TEXT, -- ユーザーフィードバック

    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT chk_conversation_type CHECK (type IN (
        'goal_setting', 'task_generation', 'schedule_adjustment',
        'project_planning', 'habit_coaching', 'general_chat', 'analysis'
    )),
    CONSTRAINT chk_outcome_type CHECK (outcome_type IN (
        'projects', 'tasks', 'schedule', 'insights', 'plans'
    ) OR outcome_type IS NULL),

    INDEX idx_user_type (user_id, type),
    INDEX idx_session (session_id),
    INDEX idx_user_date (user_id, created_at)
);
```

### 4.3 LLMプロンプト設計

#### 4.3.1 週次計画生成プロンプト

```typescript
const WEEKLY_PLANNING_PROMPT = `
あなたはユーザーの人生目標達成を支援するライフマネジメントAIです。

# ユーザー情報
- 目標: {goals}
- 制約: {constraints}
- 前週の実績: {lastWeekPerformance}

# タスク
今日から1週間の時間割を作成してください。

# 要件
1. 各目標に設定された週間時間を満たす
2. ユーザーの生産性パターンを考慮
3. 適切な休憩時間を確保
4. 柔軟性のあるバッファを含める

# 出力形式
{
  "weeklyPlan": {
    "monday": [...],
    "tuesday": [...],
    ...
  },
  "insights": "...",
  "recommendations": [...]
}
`
```

#### 4.3.2 タスク生成プロンプト

```typescript
const TASK_GENERATION_PROMPT = `
現在のコンテキスト:
- プロジェクト: {projectName}
- 利用可能時間: {availableMinutes}分
- 前回の進捗: {previousProgress}
- エネルギーレベル: {energyLevel}

このセッションで取り組むべき具体的なタスクを3-5個提案してください。
各タスクには推定所要時間を含めてください。
`
```

## 5. API仕様

### 5.1 LLM対話API

```typescript
// 目標設定対話の開始
POST /api/v1/llm/goal-setting
Response: {
  sessionId: string;
  initialQuestions: string[];
}

// 対話の継続
POST /api/v1/llm/conversation
Request: {
  sessionId: string;
  message: string;
}
Response: {
  response: string;
  extractedData?: any;
  nextQuestions?: string[];
}

// タスク生成
POST /api/v1/llm/generate-tasks
Request: {
  timeBlockId: string;
  context: TaskGenerationContext;
}
Response: {
  tasks: Task[];
  reasoning: string;
}
```

### 5.2 プロジェクト管理API

```typescript
// プロジェクト作成
POST /api/v1/projects
Request: {
  name: string;
  type: string;
  goalId: string;
  weeklyTargetHours: number;
}

// タスクの開始
POST /api/v1/tasks/:id/start
Response: {
  task: Task;
  timer: TimerState;
}

// 習慣の記録
POST /api/v1/habits/:id/record
Request: {
  date: string;
  status: 'completed' | 'failed';
  value?: number;
  notes?: string;
}
```

## 6. バージョン計画

### 6.1 version 0.1.0: タイムブロック確認プロトタイプ

- googleカレンダーと連携できる
- 人生の目標からLLMがヒアリングしてプロジェクトが作成される
- LLMと連携して1週間分の納得できるタイムブロックが作成される
- タイムブロックを更新する指示をLLMに与えてリアルタイムで更新ができる

### 6.2 version 0.2.0: タスク作成確認プロトタイプ

- タスクツールとして使えるようになってる
- タスクが作成されていないプロジェクトに関して、LLMが納得感のあるタスクを提案してくれる

### 6.3 version 0.3.0: 習慣管理確認プロトタイプ

- 習慣管理ツールとして使えるようになっている
- タスクだけでなく、LLMが納得感のある習慣を提案してくる

### 6.4 version 0.4.0: プロトタイプ完成版

- 作業実績管理機能
- ダッシュボード機能

### 6.5 version 1.0.0: MVPリリース版

- LLMをPythonで実装し直す
- 課金機能
- ユーザ管理機能

### 6.6 リリース後追加機能

- 基本的にはユーザフィードバックを受けてリリース後の機能を考える

## 7. 成功指標

- **目標1:** ユーザーの生産性と目標達成率を向上させる。
  - **指標1.1:** タスク完了率: 当日計画したタスクが完了した割合（目標: >80%）。
  - **指標1.2:** 目標進捗: プロジェクトごとのマイルストーン完了目標期間に対する達成率（目標: 少なくとも1つの主要目標で>60%の進捗）。
  - **指標1.3 (定性的):** ユーザーが報告するコントロール感の上昇量（アンケートベース、目標: >70%が改善を報告）。

その他目標はMVPリリース版にて考える
