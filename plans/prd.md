#PROJECTS/KAISHU 
# LLMベース ライフマネジメントシステム - プロダクト要件定義書 (PRD)

## 1. 製品概要

### 1.1 製品名

**AI Life Management System (ALMS)**

### 1.2 ビジョン

LLMとの対話を通じて人生の目標を実現するための時間配分を最適化し、「今この瞬間何をすべきか」を常に明確にすることで、ユーザが人生で達成したい目標を着実に達成できるようにサポートするライフオーケストレーションシステム。

### 1.3 コアバリュー

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
  startConversation(): ConversationSession;
  
  extractGoals(conversation: Message[]): LifeGoal[];
  
  suggestTimeAllocation(goals: LifeGoal[]): TimeAllocationPlan;
  
  refineWithFeedback(
    plan: TimeAllocationPlan,
    feedback: string
  ): TimeAllocationPlan;
}

interface LifeGoal {
  id: string;
  type: 'project' | 'habit' | 'skill' | 'health' | 'relationship';
  name: string;
  description: string;
  targetOutcome: string;
  suggestedTimePerWeek: number;
  priority: 1 | 2 | 3;
  measurementCriteria: string[];
}
```

#### 3.1.2 リアルタイムタスク生成

```typescript
interface TaskGenerationSession {
  context: {
    currentTimeBlock: TimeBlock;
    projectContext: Project;
    previousTasks: Task[];
    energyLevel: EnergyLevel;
    availableTime: number;
  };
  
  generateTasks(): Promise<{
    suggestedTasks: Task[];
    reasoning: string;
    expectedOutcomes: string[];
  }>;
  
  refineTask(taskId: string, feedback: string): Promise<Task>;
}
```

#### 3.1.3 動的調整対話

```typescript
interface AdjustmentDialog {
  reportCondition(condition: {
    type: 'hangover' | 'sick' | 'tired' | 'motivated' | 'busy';
    severity: 1 | 2 | 3;
    details?: string;
  }): void;
  
  generateAdjustedPlan(): {
    todaysPlan: DailyPlan;
    recoveryPlan: WeeklyAdjustment;
    recommendations: string[];
  };
}
```

### 3.2 時間管理機能

#### 3.2.1 時間配分グラフ生成

```typescript
interface TimeAllocationVisualizer {
  generateAllocationChart(params: {
    goals: LifeGoal[];
    period: 'daily' | 'weekly' | 'monthly';
    type: 'target' | 'actual' | 'comparison';
  }): {
    chartData: ChartData;
    insights: string[];
    recommendations: Adjustment[];
  };
}

interface ChartData {
  type: 'pie' | 'bar' | 'stacked' | 'sunburst';
  data: {
    categories: string[];
    values: number[];
    colors: string[];
  };
  annotations: ChartAnnotation[];
}
```

#### 3.2.2 カレンダー統合

```typescript
interface CalendarManager {
  createTimeBlocks(plan: WeeklyPlan): void;
  
  timeBlockFormat: {
    title: string; // 例: "LLM研究", "KGプロジェクト作業"
    color: string;
    project: Project;
    plannedTasks?: Task[];
  };
  
  syncWithExternalCalendar(
    provider: 'google' | 'outlook' | 'apple'
  ): void;
}
```

### 3.3 プロジェクト管理機能

#### 3.3.1 プロジェクト構造

```typescript
interface Project {
  id: string;
  name: string;
  type: 'work' | 'learning' | 'health' | 'personal';
  goal: string;
  phases: Phase[];
  requiredHabits: Habit[];
  relatedProjects: string[];
  weeklyTargetHours: number;
  actualHoursThisWeek: number;
  notes: Note[];
  llmGeneratedSummary?: string;
}

interface Phase {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  objectives: string[];
  tasks: Task[];
  status: 'planned' | 'active' | 'completed';
}
```

#### 3.3.2 タスク管理

```typescript
interface Task {
  id: string;
  projectId: string;
  phaseId?: string;
  title: string;
  description: string;
  estimatedDuration: number; // LLM推定時間
  actualDuration?: number;
  status: 'todo' | 'doing' | 'done' | 'carried_over';
  carriedFrom?: string; // 前回から引き継がれたタスクID
  createdBy: 'user' | 'llm';
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

interface TaskSession {
  timeBlockId: string;
  tasks: Task[];
  
  startTask(taskId: string): void;
  pauseTask(taskId: string): void;
  completeTask(taskId: string): void;
  carryOverTasks(): Task[]; // 未完了タスクを次回に引き継ぎ
}
```

### 3.4 習慣管理機能

#### 3.4.1 習慣定義

```typescript
interface Habit {
  id: string;
  projectId: string;
  name: string;
  type: 'daily' | 'weekly' | 'count_based';
  target: {
    daily?: { count: number; unit: string };
    weekly?: { count: number; unit: string };
    countBased?: { 
      action: string; // 例: "タバコを吸わない"
      trackingType: 'streak' | 'total';
    };
  };
  tracking: HabitTracking;
  reminders: Reminder[];
}

interface HabitTracking {
  todayStatus: 'pending' | 'completed' | 'failed';
  streak: number;
  totalCount: number;
  history: HabitRecord[];
  successRate: number;
}
```

### 3.5 UI/UXビュー仕様

#### 3.5.1 ダッシュボード

```typescript
interface DashboardView {
  layout: {
    left: {
      todayCalendar: CalendarWidget;
      currentTimeHighlight: TimeIndicator;
    };
    right: {
      upper: {
        currentProjectTasks: TaskListWidget;
        activeTask?: ActiveTaskDisplay;
      };
      lower: {
        projectNotes: NotesWidget;
      };
    };
  };
  
  floatingLLMChat: ChatInterface; // どこからでも呼び出し可能
}

interface ActiveTaskDisplay {
  taskName: string;
  animation: 'working' | 'paused';
  timer: {
    elapsed: number;
    target: number;
    progress: number; // パーセンテージ
  };
}
```

#### 3.5.2 プロジェクトリストビュー

```typescript
interface ProjectListView {
  projectTable: {
    columns: [
      'プロジェクト名',
      '週目標時間',
      '実績時間',
      '達成率',
      'ステータス'
    ];
  };
  
  allocationCharts: {
    targetPieChart: PieChart;
    actualPieChart: PieChart;
  };
  
  insights: LLMGeneratedInsights;
}
```

#### 3.5.3 プロジェクトビュー

```typescript
interface ProjectDetailView {
  header: {
    overview: ProjectSummary;
    llmSummary: string;
    relatedProjectsGraph: NetworkGraph;
  };
  
  body: {
    phases: PhaseAccordion;
    habits: HabitList;
    notes: NotesList;
  };
  
  activePhaseDetail: {
    calendar: CalendarWidget;
    taskList: TaskListWidget;
    progress: ProgressIndicators;
  };
}
```

#### 3.5.4 タスクリストビュー

```typescript
interface TaskListView {
  filters: {
    project: MultiSelect;
    status: MultiSelect;
    dateRange: DateRangePicker;
  };
  
  grouping: 'project' | 'date' | 'status' | 'phase';
  
  taskList: {
    style: 'kanban' | 'list' | 'timeline';
    features: ['drag_drop', 'bulk_edit', 'quick_add'];
  };
}
```

#### 3.5.5 習慣ビュー

```typescript
interface HabitView {
  habitGrid: {
    todayHabits: HabitCard[];
    weeklyProgress: WeeklyHabitChart;
  };
  
  streakDisplay: {
    currentStreaks: StreakCard[];
    achievements: AchievementBadges;
  };
  
  habitAnalytics: {
    successRates: Chart;
    patterns: LLMAnalysis;
    recommendations: string[];
  };
}
```

### 3.6 LLM統合アーキテクチャ

#### 3.6.1 LLMエージェント

```typescript
interface LLMAgent {
  // コンテキスト管理
  context: {
    userProfile: UserProfile;
    currentProjects: Project[];
    historicalData: UserHistory;
    preferences: UserPreferences;
  };
  
  // 各種エージェント
  agents: {
    planner: PlanningAgent;
    taskGenerator: TaskGenerationAgent;
    habitCoach: HabitCoachingAgent;
    analyst: AnalyticsAgent;
  };
}

class PlanningAgent {
  async generateWeeklyPlan(
    goals: LifeGoal[],
    constraints: Constraint[],
    context: UserContext
  ): Promise<WeeklyPlan> {
    const prompt = this.buildPlanningPrompt(goals, constraints, context);
    const response = await this.llm.complete(prompt);
    return this.parsePlanResponse(response);
  }
  
  async adjustDailyPlan(
    condition: UserCondition,
    originalPlan: DailyPlan
  ): Promise<AdjustedPlan> {
    const prompt = this.buildAdjustmentPrompt(condition, originalPlan);
    const response = await this.llm.complete(prompt);
    return this.parseAdjustmentResponse(response);
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

#### 4.2.1 主要テーブル

```sql
-- ユーザー目標
CREATE TABLE life_goals (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    target_outcome TEXT,
    suggested_hours_per_week DECIMAL(5,2),
    priority INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- プロジェクト
CREATE TABLE projects (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    goal_id UUID REFERENCES life_goals(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    weekly_target_hours DECIMAL(5,2),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- 時間ブロック（カレンダー）
CREATE TABLE time_blocks (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    project_id UUID REFERENCES projects(id),
    title VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    planned_tasks JSONB,
    actual_tasks JSONB,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    INDEX idx_user_time (user_id, start_time)
);

-- タスク
CREATE TABLE tasks (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    phase_id UUID,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_duration INTEGER,
    actual_duration INTEGER,
    status VARCHAR(50) NOT NULL,
    carried_from UUID,
    created_by VARCHAR(50) NOT NULL,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL
);

-- 習慣
CREATE TABLE habits (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    target JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- 習慣記録
CREATE TABLE habit_records (
    id UUID PRIMARY KEY,
    habit_id UUID REFERENCES habits(id),
    date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    value DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP NOT NULL,
    UNIQUE(habit_id, date)
);

-- LLM対話履歴
CREATE TABLE llm_conversations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL,
    context JSONB,
    messages JSONB NOT NULL,
    outcome JSONB,
    created_at TIMESTAMP NOT NULL
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
`;
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
`;
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
    - **指標1.2:** 目標進捗: プロジェクトごとのフェーズ完了目標期間に対する達成率（目標: 少なくとも1つの主要目標で>60%の進捗）。
    - **指標1.3 (定性的):** ユーザーが報告するコントロール感の上昇量（アンケートベース、目標: >70%が改善を報告）。

その他目標はMVPリリース版にて考える