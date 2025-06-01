# AI Life Management System (ALMS) - Phase 1 実装計画書

## 🎯 Phase 1 概要

### 期間
2ヶ月（8週間）

### スコープ
- LLMとの基本的な対話機能
- プロジェクト・タスク管理
- 週次時間割生成
- ダッシュボードビュー

### 技術スタック（Phase 1用に絞り込み）
```yaml
frontend:
  framework: Next.js 14 + TypeScript
  styling: TailwindCSS + shadcn/ui
  state: Zustand
  api-client: TanStack Query

backend:
  api: Node.js + Fastify + TypeScript
  database: PostgreSQL + Prisma
  llm-integration: n8n workflows

infrastructure:
  deployment: Vercel
  database: Supabase
  auth: Clerk
```

## 📋 実装順序とマイルストーン

### 基盤構築
- プロジェクト初期設定
- 認証システム
- データベース設計

### コア機能実装
- プロジェクト管理CRUD
- タスク管理基本機能
- n8n LLMワークフロー構築

### LLM統合
- 対話型目標設定
- 週次計画生成
- タスク生成機能

### UI/UX実装
- ダッシュボードビュー
- プロジェクトビュー
- 最終調整とテスト

## 🔧 技術アーキテクチャ詳細

### n8n ワークフロー設計

```typescript
// n8nワークフローのエンドポイント定義
interface N8nEndpoints {
  goalSetting: {
    url: '/webhook/goal-setting-dialog';
    method: 'POST';
    payload: {
      userId: string;
      message: string;
      conversationHistory?: Message[];
    };
    response: {
      reply: string;
      extractedGoals?: LifeGoal[];
      suggestedTimeAllocation?: TimeAllocationPlan;
    };
  };
  
  weeklyPlanGeneration: {
    url: '/webhook/generate-weekly-plan';
    method: 'POST';
    payload: {
      userId: string;
      goals: LifeGoal[];
      constraints: Constraint[];
      previousWeekData?: WeeklyPerformance;
    };
    response: {
      weeklyPlan: WeeklyPlan;
      insights: string[];
      recommendations: string[];
    };
  };
  
  taskGeneration: {
    url: '/webhook/generate-tasks';
    method: 'POST';
    payload: {
      projectContext: Project;
      availableTime: number;
      energyLevel: string;
      previousTasks: Task[];
    };
    response: {
      tasks: Task[];
      reasoning: string;
    };
  };
}
```

### データベーススキーマ（Phase 1用）

```sql
-- 最小限のテーブル定義
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE life_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    target_hours_per_week DECIMAL(5,2),
    priority INTEGER DEFAULT 2,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    goal_id UUID REFERENCES life_goals(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'personal',
    weekly_target_hours DECIMAL(5,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_duration INTEGER, -- 分単位
    status VARCHAR(50) DEFAULT 'todo',
    created_by VARCHAR(50) DEFAULT 'user', -- 'user' or 'llm'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE time_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id),
    title VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'planned',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE llm_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'goal_setting', 'task_generation', etc
    messages JSONB NOT NULL,
    outcome JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 📝 GitHub Issues タスクリスト

### 🏗️ Week 1-2: 基盤構築

#### Issue #1: プロジェクト初期設定
```markdown
## 概要
Next.js 14とFastifyを使用したモノレポプロジェクトの初期設定

## タスク
- [ ] モノレポ構造の作成（turbo使用）
- [ ] Next.js 14プロジェクトセットアップ
- [ ] Fastify APIプロジェクトセットアップ
- [ ] 共通型定義パッケージの作成
- [ ] ESLint/Prettier設定
- [ ] Git hooks設定（husky）

## 技術詳細
- Turborepo設定
- TypeScript設定（strict mode）
- 開発環境のDockerfile作成

## 完了条件
- `pnpm dev`で全サービスが起動する
- 型チェックが通る
- Lintが通る
```

#### Issue #2: Clerk認証実装
```markdown
## 概要
Clerkを使用した認証システムの実装

## タスク
- [ ] Clerkアカウント作成と設定
- [ ] Next.jsへのClerk統合
- [ ] APIルートの認証ミドルウェア実装
- [ ] ユーザー作成時のDB連携
- [ ] 認証付きAPI呼び出しのヘルパー関数作成

## 技術詳細
- Clerk webhookでユーザー作成時にDBに登録
- JWTトークン検証ミドルウェア
- 認証エラーハンドリング

## 完了条件
- ログイン/ログアウトが動作する
- 認証付きAPIエンドポイントが保護される
- ユーザー情報がDBに保存される
```

#### Issue #3: データベース設計と初期設定
```markdown
## 概要
PostgreSQL（Supabase）のセットアップとPrisma設定

## タスク
- [ ] Supabaseプロジェクト作成
- [ ] Prismaスキーマ定義（Phase 1用）
- [ ] マイグレーション実行
- [ ] Seedデータ作成
- [ ] Prisma Clientの型生成

## 技術詳細
- 上記のデータベーススキーマを実装
- RLSポリシーの設定
- インデックスの最適化

## 完了条件
- マイグレーションが成功する
- Prisma Studioでデータが確認できる
- 型安全なDB操作ができる
```

### 🔨 Week 3-4: コア機能実装

#### Issue #4: プロジェクト管理API実装
```markdown
## 概要
プロジェクトのCRUD操作APIエンドポイント実装

## タスク
- [ ] POST /api/v1/projects - プロジェクト作成
- [ ] GET /api/v1/projects - プロジェクト一覧取得
- [ ] GET /api/v1/projects/:id - プロジェクト詳細取得
- [ ] PUT /api/v1/projects/:id - プロジェクト更新
- [ ] DELETE /api/v1/projects/:id - プロジェクト削除

## 技術詳細
```typescript
// エンドポイント定義例
interface CreateProjectRequest {
  name: string;
  type: 'work' | 'learning' | 'health' | 'personal';
  goalId?: string;
  weeklyTargetHours: number;
}

interface ProjectResponse {
  id: string;
  name: string;
  type: string;
  goal?: LifeGoal;
  weeklyTargetHours: number;
  actualHoursThisWeek: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 完了条件
- 全エンドポイントが動作する
- 適切なバリデーション
- エラーハンドリング
- Postmanコレクション作成
```

#### Issue #5: タスク管理API実装
```markdown
## 概要
タスクのCRUD操作APIエンドポイント実装

## タスク
- [ ] POST /api/v1/tasks - タスク作成
- [ ] GET /api/v1/tasks - タスク一覧取得（フィルタ付き）
- [ ] GET /api/v1/tasks/:id - タスク詳細取得
- [ ] PUT /api/v1/tasks/:id - タスク更新
- [ ] DELETE /api/v1/tasks/:id - タスク削除
- [ ] POST /api/v1/tasks/:id/status - ステータス更新

## 技術詳細
```typescript
interface CreateTaskRequest {
  projectId: string;
  title: string;
  description?: string;
  estimatedDuration?: number;
}

interface UpdateTaskStatusRequest {
  status: 'todo' | 'doing' | 'done';
}
```

## 完了条件
- プロジェクトに紐づくタスクが作成できる
- ステータス遷移が正しく動作する
- フィルタリングが機能する
```

#### Issue #6: n8n LLMワークフロー基本構築
```markdown
## 概要
n8nで基本的なLLMワークフローを構築

## タスク
- [ ] n8nインスタンスのセットアップ
- [ ] OpenAI API連携設定
- [ ] 基本的なプロンプトテンプレート作成
- [ ] Webhookエンドポイント設定
- [ ] エラーハンドリングワークフロー

## 技術詳細
- 3つの基本ワークフロー作成
  1. goal-setting-dialog
  2. generate-weekly-plan
  3. generate-tasks
- JSONレスポンス形式の統一
- レート制限の実装

## 完了条件
- 各ワークフローがWebhook経由で呼び出せる
- 適切なJSONレスポンスが返る
- エラー時の適切なレスポンス
```

### 🤖 Week 5-6: LLM統合

#### Issue #7: 目標設定対話機能実装
```markdown
## 概要
LLMとの対話を通じた目標設定機能の実装

## タスク
- [ ] 対話セッション管理API実装
- [ ] n8nワークフロー詳細実装（goal-setting）
- [ ] 対話履歴の保存機能
- [ ] 目標抽出ロジック実装
- [ ] 時間配分提案機能

## 技術詳細
```typescript
// APIエンドポイント
POST /api/v1/llm/goal-setting/start
POST /api/v1/llm/goal-setting/continue
POST /api/v1/llm/goal-setting/finalize

// n8nワークフロー内のプロンプト
const GOAL_EXTRACTION_PROMPT = `
ユーザーとの対話から人生の目標を抽出し、
週間時間配分を提案してください。
...
`;
```

## 完了条件
- 自然な対話で目標設定ができる
- 目標がDBに保存される
- 時間配分の提案が表示される
```

#### Issue #8: 週次計画生成機能実装
```markdown
## 概要
目標に基づいた週次時間割の自動生成

## タスク
- [ ] 時間ブロック生成API実装
- [ ] n8nワークフロー詳細実装（weekly-plan）
- [ ] カレンダーデータ構造の実装
- [ ] 制約条件の考慮ロジック
- [ ] 計画の保存と更新機能

## 技術詳細
```typescript
interface GenerateWeeklyPlanRequest {
  userId: string;
  startDate: Date;
  constraints?: {
    workingHours?: { start: string; end: string };
    excludeDays?: string[];
    fixedEvents?: TimeBlock[];
  };
}
```

## 完了条件
- 1週間分の時間割が生成される
- プロジェクトごとの時間配分が反映される
- DBに時間ブロックが保存される
```

#### Issue #9: タスク自動生成機能実装
```markdown
## 概要
時間ブロック開始時のタスク自動生成

## タスク
- [ ] タスク生成API実装
- [ ] n8nワークフロー詳細実装（task-generation）
- [ ] コンテキスト情報の収集
- [ ] タスク粒度の最適化ロジック
- [ ] 生成タスクの保存

## 技術詳細
- 前回の未完了タスクの引き継ぎ
- プロジェクトコンテキストの活用
- 適切なタスク粒度（15-30分単位）

## 完了条件
- 時間ブロックに適したタスクが生成される
- 実行可能な粒度のタスクになっている
- LLM生成フラグが付いている
```

### 🎨 Week 7-8: UI/UX実装

#### Issue #10: UIコンポーネントライブラリ構築
```markdown
## 概要
shadcn/uiベースの共通コンポーネント実装

## タスク
- [ ] shadcn/ui初期設定
- [ ] カスタムテーマ設定
- [ ] 基本コンポーネントの拡張
- [ ] プロジェクト固有コンポーネント作成
- [ ] Storybookセットアップ

## 技術詳細
- Darkモード対応
- レスポンシブデザイン
- アクセシビリティ考慮

## 完了条件
- 全画面で統一されたUIが使える
- Storybookでコンポーネントが確認できる
```

#### Issue #11: ダッシュボードビュー実装
```markdown
## 概要
メインダッシュボード画面の実装

## タスク
- [ ] レイアウトコンポーネント作成
- [ ] 今日のカレンダーウィジェット
- [ ] 現在のタスクリスト表示
- [ ] プロジェクトメモエリア
- [ ] リアルタイム更新機能

## 技術詳細
```typescript
// コンポーネント構造
<DashboardLayout>
  <CalendarWidget />
  <CurrentTaskList />
  <ProjectNotes />
  <FloatingChat />
</DashboardLayout>
```

## 完了条件
- 現在時刻がハイライトされる
- タスクのステータス変更が即座に反映
- レスポンシブ対応
```

#### Issue #12: プロジェクト管理ビュー実装
```markdown
## 概要
プロジェクト一覧と詳細画面の実装

## タスク
- [ ] プロジェクト一覧テーブル
- [ ] 時間配分グラフ（円グラフ）
- [ ] プロジェクト詳細画面
- [ ] プロジェクト作成/編集モーダル
- [ ] 削除確認ダイアログ

## 技術詳細
- Rechartsを使用した円グラフ
- TanStack Tableでソート/フィルタ
- フォームバリデーション（zod）

## 完了条件
- CRUD操作が全て動作する
- グラフが正しく表示される
- エラーハンドリング
```

#### Issue #13: LLMチャットインターフェース実装
```markdown
## 概要
フローティングチャットUIの実装

## タスク
- [ ] チャットウィンドウコンポーネント
- [ ] メッセージ履歴表示
- [ ] 入力フォーム
- [ ] ローディング/エラー表示
- [ ] 最小化/最大化機能

## 技術詳細
```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

## 完了条件
- どの画面からでもチャットが開ける
- メッセージが適切に表示される
- スムーズなアニメーション
```

#### Issue #14: 統合テストとバグ修正
```markdown
## 概要
Phase 1の統合テストと最終調整

## タスク
- [ ] E2Eテストシナリオ作成
- [ ] APIエンドポイントテスト
- [ ] UIコンポーネントテスト
- [ ] パフォーマンス最適化
- [ ] バグ修正

## 技術詳細
- Playwright使用
- Vitestでユニットテスト
- Lighthouse CI統合

## 完了条件
- 主要フローが問題なく動作する
- パフォーマンススコア90以上
- 既知のバグが解決される
```

## 🚀 デプロイと運用準備

#### Issue #15: 本番環境デプロイ
```markdown
## 概要
Vercelへのデプロイと本番環境設定

## タスク
- [ ] 環境変数設定
- [ ] Vercelプロジェクト作成
- [ ] CI/CD設定
- [ ] ドメイン設定
- [ ] モニタリング設定

## 技術詳細
- GitHub Actions設定
- Sentry統合
- Vercel Analytics設定

## 完了条件
- 本番環境が正常に動作する
- エラー監視が機能する
- デプロイが自動化される
```

## 📊 成功指標（Phase 1）

- 基本的なプロジェクト/タスク管理が可能
- LLMとの対話で目標設定ができる
- 週次計画が自動生成される
- ダッシュボードで現在のタスクが確認できる
- 5人のテストユーザーが問題なく使用できる

## 🔍 Phase 2への準備事項

Phase 1完了時に以下を評価し、Phase 2の計画を調整：

1. ユーザーフィードバックの収集
2. パフォーマンスボトルネックの特定
3. LLMプロンプトの最適化ポイント
4. UIの改善点リスト
5. 追加機能の優先順位付け