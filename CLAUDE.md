# KAISHU プロジェクト開発ガイド

このドキュメントは、AI開発アシスタントがKAISHUプロジェクトの開発を支援する際の重要な情報をまとめたものです。

## プロジェクト概要

### ビジョン

理想の人生から逆算して必要なアクション（学習・実践・アウトプット）を特定し、カレンダーの空き時間に自動配置するAIコーチ・秘書サービス。

### 技術スタック

- **フロントエンド**: Next.js 15.4.4 (App Router), TypeScript 5, Tailwind CSS 3.4.16, Shadcn/ui
- **バックエンド**: Node.js + Express, Prisma ORM
- **データベース**: PostgreSQL (Supabase)
- **AI**: OpenAI API (GPT-4)
- **認証・決済**: Supabase Auth, Stripe
- **ホスティング**: Vercel
- **テスト**: Jest 29.7.0, React Testing Library 16.1.0, Playwright 1.54.1

### プロジェクト構造

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # ルートレイアウト
│   ├── page.tsx         # ホームページ
│   └── globals.css      # グローバルスタイル
├── components/          # UIコンポーネント
│   └── layout/         # レイアウトコンポーネント
│       └── AppLayout.tsx
├── lib/                 # ユーティリティ関数
│   └── utils.ts
└── __tests__/          # テストファイル
    ├── pages/
    └── components/

__tests__/               # プロジェクトレベルのテスト
├── pages/              # ページテスト
├── components/         # コンポーネントテスト
└── utils/              # テストユーティリティ
    └── test-utils.tsx  # カスタムレンダー関数

e2e/                    # E2Eテスト
└── home.spec.ts       # ホームページE2Eテスト

.github/
└── workflows/
    └── test.yml       # CI/CDテスト設定
```

## 開発ルール

### 1. 基本方針

- ユーザの指示に従って正確に作業を実行する
- 不明な点は必ずユーザに確認する
- 作業の進捗と結果を明確に報告する
- プロジェクトの一貫性を保持する
- 同じエラーが5回以上連続する場合は次のアクションを示してユーザに指示を仰ぐ

### 2. ツール利用ガイドライン

- 技術的質問にはcontext7を使って最新の情報を調べる
- ソースコードのサンプルを探すときはcontext7を使う
- GitHubのissue管理はGitHub MCPサーバーを使用
- Supabaseの操作や状態確認はSupabase MCPサーバーを使用

### 3. ファイル管理

- 決定事項は `.dev/contexts` ディレクトリにmdファイルとして記録
- `docs/contexts` ディレクトリの内容は常に参照
- `docs/plans` ディレクトリはユーザの指示がある場合に参照
- `docs/contexts` の内容と異なる実装を行う場合は必ずユーザの承認を得る

### 4. テスト駆動開発（TDD）必須

#### Red-Green-Refactorサイクル

1. **Red**: 失敗するテストを書く
2. **Green**: テストを通す最小限のコードを書く
3. **Refactor**: コードを改善する（テストは通ったまま）

#### タスク完了条件

- [ ] npm test（すべてのテストが通過）
- [ ] npm run lint（エラー・警告なし）
- [ ] npm run typecheck（型エラーなし）
- [ ] npm run test:e2e（該当する場合）
- [ ] UI検証完了（Playwright使用）

### 5. UI実装の確認

- UIを実装する場合は、作業完了後にPlaywrightを使って視覚的に実装内容を確認
- レスポンシブ確認（デスクトップ、タブレット、モバイル）
- インタラクション検証（クリック、フォーム入力、アニメーション）

### 6. コーディング規約

- コメントはユーザから要求されない限り追加しない
- ファイルのコード規約を理解し、既存のスタイルに従う
- ライブラリ使用前に必ずpackage.jsonで確認
- 新規コンポーネント作成時は既存コンポーネントを参考にする

## 主要機能仕様

### F1: AIヒアリングセッション機能

- 20分のガイド付き対話フロー
- ユーザーの回答から目標と価値観を抽出
- セッション結果のデータベース保存

### F2: LLM駆動型目標分解エンジン

- 抽象的な目標を実行可能なタスクに分解
- 各タスクに「なぜ」の文脈を付与
- 分解結果の承認・編集機能

### F3: 自動計画生成・更新システム

- ヒアリング結果から実行可能な計画を自動生成
- 定期的な計画の自動更新
- 変更理由の説明表示

### F4: 現状分析システム

- 3つのアセット（人的・経済・社会資本）の評価
- ギャップ分析と改善提案
- 視覚的なレーダーチャート表示

### F9: 進捗可視化ダッシュボード

- GitHubスタイルのヒートマップ
- 年/月/週/日の切り替えビュー
- カスタマイズ可能なウィジェット

### F11: カレンダー統合・自動配置

- Google Calendar OAuth認証
- 空き時間の自動検出
- ドラッグ&ドロップでの調整

## UIデザイン原則

### カラーシステム

- プライマリ：深い青緑（#0F766E）- 信頼と成長
- セカンダリ：温かみのあるベージュ（#F5E6D3）- 穏やかさ
- アクセント：ソフトコーラル（#FF6B6B）- 達成感
- 背景：オフホワイト（#FAFAFA）とライトグレー（#F5F5F5）

### デザインフィロソフィー

「Calm Technology meets AI Intelligence」

- 落ち着いたデザイン
- ミニマルで高速な情報アーキテクチャ
- 透明性のあるAI表示
- 意味のある達成感デザイン

## データモデル概要

### 主要エンティティ

- **User**: ユーザー情報、プロファイル
- **Goal**: 目標、分解情報、成功確率
- **Task**: タスク、なぜの文脈、推定時間
- **Milestone**: マイルストーン、目標日、期待される状態
- **Session**: AIヒアリングセッション
- **CalendarSync**: カレンダー同期情報

## 開発時の注意事項

1. **セキュリティ**
   - JWT認証によるAPI保護
   - SQLインジェクション対策（Prisma使用）
   - XSS対策（React自動エスケープ）

2. **パフォーマンス**
   - ページロード時間: 3秒以内
   - APIレスポンス: 95%が1秒以内
   - LLM処理: 5秒以内

3. **エラーハンドリング**
   - ユーザーフィードバックにはトースト通知を使用
   - 適切なエラーバウンダリを実装
   - デバッグ用にエラーをログ出力

## コマンド一覧

```bash
# 開発サーバー起動
npm run dev

# テスト実行
npm test                # ユニットテスト
npm run test:watch      # ウォッチモード
npm run test:e2e        # E2Eテスト
npm run test:e2e:headed # E2Eテスト（ブラウザ表示）
npm run test:e2e:ui     # E2EテストUI

# コード品質チェック
npm run lint            # ESLintチェック
npm run lint:fix        # ESLint自動修正
npm run format          # Prettierフォーマット
npm run format:check    # フォーマットチェック

# 型チェック
npm run typecheck

# CI/CDローカルチェック
npm run ci:local        # すべてのチェックを実行（フォーマット、リント、型、テスト）
npm run ci:local:strict # GitHub Actions環境と同じ条件で実行（CI=true）

# ビルド
npm run build

# 本番サーバー起動
npm start
```

## GitHub Issue連携

各Issueには以下のセクションを含める：

```markdown
## TDD要件

- [ ] テストファイル: `src/__tests__/feature.test.ts`
- [ ] 最低限のテストケース:
  - [ ] 正常系の動作
  - [ ] 異常系のエラーハンドリング
  - [ ] エッジケース
- [ ] UI検証が必要な場合はスクリーンショット添付
```

## 完了したフェーズ

### Phase 0 - 開発環境構築

- ✅ [#43] Next.jsプロジェクト初期化（TypeScript/Tailwind CSS）
  - Next.js 15.4.4 App Routerセットアップ
  - TypeScript 5設定（strict mode）
  - Tailwind CSS 3.4.16設定（カスタムカラーパレット）
  - 基本レイアウトコンポーネント作成
- ✅ [#44] テストフレームワーク基本設定（Jest/Testing Library/Playwright）
  - Jest 29.7.0 + React Testing Library 16.1.0設定
  - Playwright 1.54.1設定（6つのビューポート）
  - GitHub Actions CI/CD設定
  - サンプルテスト作成（ユニット/E2E）
- ✅ [#45] ESLint/Prettier設定（コード品質管理）
  - ESLint設定（TypeScript、React Hooks、import順序、アクセシビリティ）
  - Prettier設定（セミコロンあり、シングルクォート、100文字/行）
  - CI/CDローカルチェックスクリプト（npm run ci:local）
  - 実行結果サマリー表示機能
  - CI環境互換モード（npm run ci:local:strict）

## 問題発生時の対応

1. エラーメッセージを完全に表示
2. 関連するコードを確認
3. 5回試行しても解決しない場合は、具体的な対策案と共にユーザーに相談

## 禁止事項

- ❌ テストを書かずに実装を開始すること
- ❌ テストの実行をスキップして「通った」と報告すること
- ❌ UI変更時に視覚的確認を省略すること
- ❌ 既存のテストを壊したまま新機能を追加すること
- ❌ GitHubのissueをユーザの依頼なしにクローズすること
