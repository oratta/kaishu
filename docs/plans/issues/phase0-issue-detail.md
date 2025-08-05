## Phase 0: プロジェクト基盤 - タスク詳細

---

# [P0-001] 開発環境セットアップとプロジェクト初期化

## 🎯 目的

ライフオーケストレーションMVPの開発環境を構築し、Next.js 14ベースのプロジェクトを初期化して、チーム全体で統一された開発環境を確立する

## 📋 作業内容

### 1. セットアップ手順

- [ ] Node.js v20以上のインストール確認
- [ ] pnpmのインストール（パッケージマネージャーとして使用）
- [ ] Next.js 14プロジェクトの作成（App Router使用）
- [ ] TypeScript設定の確認と調整
- [ ] 基本的な依存関係のインストール
- [ ] .env.exampleファイルの作成
- [ ] VSCode推奨拡張機能リストの作成

### 2. 確認項目

- [ ] `pnpm dev`でローカルサーバーが起動することを確認
- [ ] TypeScriptのコンパイルエラーがないことを確認
- [ ] 初期ページが表示されることを確認

### 3. 判断が必要な項目

- モノレポ構成にするか単一リポジトリにするか（推奨：MVP段階では単一リポジトリ）
- パッケージマネージャーの選択（推奨：pnpm for 効率的な依存関係管理）

## 🧪 テスト確認手順

1. `pnpm test`を実行して初期テスト環境が動作することを確認
2. `pnpm build`でビルドが成功することを確認
3. `pnpm lint`でLintエラーがないことを確認

## ✅ 受け入れ基準

- [ ] Next.js 14プロジェクトが正常に初期化されている
- [ ] TypeScript設定が完了している
- [ ] 開発サーバーが起動し、初期ページが表示される
- [ ] README.mdに開発環境セットアップ手順が記載されている
- [ ] .env.exampleファイルが作成されている

## 📊 確認用チェックリスト

- [ ] Node.jsバージョンが要件を満たしているか
- [ ] 必要な環境変数がすべて.env.exampleに記載されているか
- [ ] .gitignoreが適切に設定されているか
- [ ] package.jsonのスクリプトが適切に設定されているか

## 🏷️ ラベル

`human-task`, `setup`, `infrastructure`

## 👤 アサイン

@oratta

---

# [P0-002] リポジトリ設定とブランチ戦略策定

## 🎯 目的

効率的な開発フローを実現するため、GitHubリポジトリの初期設定を行い、チーム全体で統一されたブランチ戦略とコラボレーションルールを確立する

## 📋 前提条件

- [ ] 依存タスク: #P0-001 開発環境セットアップ完了
- [ ] GitHubアカウントとリポジトリへのアクセス権限

## 🔧 実装内容

### ファイル構成

`.github/
├── PULL_REQUEST_TEMPLATE.md  # 新規作成
├── ISSUE_TEMPLATE/
│   ├── bug_report.md         # 新規作成
│   ├── feature_request.md    # 新規作成
│   └── task_template.md      # 新規作成
└── CODEOWNERS               # 新規作成
CONTRIBUTING.md              # 新規作成`

### 実装要件

1. **ブランチ保護ルールの設定**
   - mainブランチへの直接プッシュを禁止
   - PRレビュー必須（最低1人）
   - CIチェックの通過を必須
   - ブランチの最新性を要求
2. **ブランチ命名規則**

   `feature/[issue-number]-[brief-description]
fix/[issue-number]-[brief-description]
chore/[issue-number]-[brief-description]`

3. **コミットメッセージ規約**
   - Conventional Commitsフォーマットを採用
   - 例: `feat: add user authentication #123`

## ✅ 完了条件

- [ ] リポジトリの基本設定が完了している
- [ ] ブランチ保護ルールが設定されている
- [ ] Issue/PRテンプレートが作成されている
- [ ] CONTRIBUTING.mdにルールが明文化されている
- [ ] CODEOWNERSファイルが設定されている

## 📝 成果物

- [ ] .github/ディレクトリ配下のテンプレートファイル
- [ ] CONTRIBUTING.mdドキュメント
- [ ] ブランチ保護設定のスクリーンショット

## 🏷️ ラベル

`documentation`, `llm-task`, `infrastructure`

## 👤 アサイン

@oratta-copy-robot

---

# [P0-003] CI/CD基本設定（GitHub Actions + Vercel）

## 🎯 目的

継続的インテグレーション/デプロイメントパイプラインを構築し、コード品質の自動チェックとステージング環境への自動デプロイを実現する

## 📋 前提条件

- [ ] 依存タスク: #P0-001, #P0-002 完了
- [ ] Vercelアカウントの作成
- [ ] GitHub ActionsのSecretsへのアクセス権限

## 🔧 実装内容

### ファイル構成

`.github/workflows/
├── ci.yml              # 新規作成
├── deploy-staging.yml  # 新規作成
└── dependabot.yml     # 新規作成（設定に注意）`

### 実装要件

1. **CI設定（ci.yml）**
   - PRトリガーでの自動実行
   - TypeScriptコンパイルチェック
   - ESLint/Prettier実行
   - ユニットテスト実行
   - ビルドチェック
2. **デプロイ設定（deploy-staging.yml）**
   - developブランチへのマージでステージング環境にデプロイ
   - Vercel CLIを使用したデプロイ
   - デプロイURL通知
3. **Dependabot設定（重要）**
   - 依存関係の更新を週次で実行
   - Vercel無料枠を圧迫しないよう、自動マージは無効化
   - セキュリティアップデートのみ優先度高

### エラーハンドリング

- Vercelデプロイ失敗時: エラーログをPRにコメント
- テスト失敗時: 失敗したテストの詳細をPRに表示

## ✅ 完了条件

- [ ] GitHub ActionsでCIが正常に動作する
- [ ] PRを作成するとチェックが自動実行される
- [ ] developブランチへのマージでステージング環境にデプロイされる
- [ ] Dependabotが設定され、無料枠を圧迫しない設定になっている
- [ ] Vercel環境変数が適切に設定されている

## 📝 成果物

- [ ] GitHub Actionsワークフローファイル
- [ ] CI/CD実行結果のスクリーンショット
- [ ] ステージング環境のURL

## 🏷️ ラベル

`infrastructure`, `llm-task`, `ci-cd`

## 👤 アサイン

@oratta-copy-robot

---

# [P0-004] コーディング規約とLinter設定

## 🎯 目的

統一されたコーディングスタイルを維持し、コード品質を自動的に保証するためのLinterとフォーマッター設定を確立する

## 📋 前提条件

- [ ] 依存タスク: #P0-001 完了
- [ ] Next.js 14プロジェクトが初期化済み

## 🧪 TDD要件（必須）

### 作成するテストファイル

- `__tests__/linter/eslint.config.test.js` - ESLint設定のテスト
- `__tests__/linter/prettier.config.test.js` - Prettier設定のテスト

### テストケース（最低限）

1. **正常系**
   - ESLintルールが正しく適用されることを確認
   - Prettierフォーマットが期待通りに動作することを確認
2. **異常系**
   - 不正なコードに対してエラーが検出されることを確認
   - conflictするルールがないことを確認

## 🔧 実装内容

### TDDプロセス

1. **ステップ1: テスト作成**
   - Linter設定の動作確認テストを作成
   - サンプルコードでルールが適用されることを確認
2. **ステップ2: 実装**
   - ESLint/Prettier設定ファイルの作成
   - VSCode設定の追加

### ファイル構成

`.eslintrc.json          # 新規作成
.prettierrc.json        # 新規作成
.prettierignore         # 新規作成
.vscode/settings.json   # 新規作成`

### 実装要件

1. **ESLint設定**
   - Next.js推奨ルールセット
   - TypeScript対応
   - React Hooks規則
   - アクセシビリティチェック（jsx-a11y）
2. **Prettier設定**
   - セミコロンあり
   - シングルクォート
   - タブ幅2
   - 末尾カンマあり
3. **VSCode統合**
   - 保存時自動フォーマット
   - ESLintエラーの表示

## ✅ 完了条件

- [ ] すべてのテストが作成されている
- [ ] すべてのテストが通過している
- [ ] `pnpm lint`がエラーなく実行される
- [ ] `pnpm format`でコードが自動整形される
- [ ] VSCodeで保存時に自動フォーマットが動作する
- [ ] pre-commitフックが設定されている

## 📝 成果物

- [ ] テストコード（必須・最初に作成）
- [ ] ESLint/Prettier設定ファイル
- [ ] VSCode設定ファイル
- [ ] コーディング規約ドキュメント（CONTRIBUTING.mdに追記）

## 🏷️ ラベル

`frontend`, `llm-task`, `tdd`, `infrastructure`

## 👤 アサイン

@oratta-copy-robot

---

# [P0-005] データベース環境構築（PostgreSQL + Prisma）

## 🎯 目的

MVPアプリケーションのデータ永続化層を構築し、型安全なデータベースアクセスを実現するためのPostgreSQLとPrismaの環境を整備する

## 📋 作業内容

### 1. セットアップ手順

- [ ] ローカルPostgreSQLのインストールまたはDockerセットアップ
- [ ] データベースの作成（life_orchestration_dev）
- [ ] Prismaの初期設定
- [ ] 環境変数の設定（DATABASE_URL）
- [ ] 初期マイグレーションの作成と実行

### 2. 確認項目

- [ ] Prisma Studioでデータベースに接続できることを確認
- [ ] マイグレーションが正常に実行されることを確認
- [ ] シードデータが投入できることを確認

### 3. 判断が必要な項目

- ローカル開発用DBの選択（Docker PostgreSQL vs ローカルインストール）
- 本番環境DBサービスの選定（Supabase, Vercel Postgres, Neon等）

## 🧪 テスト確認手順

1. `pnpm prisma db push`でスキーマが同期されることを確認
2. `pnpm prisma studio`でGUIが起動することを確認
3. `pnpm prisma generate`でクライアントが生成されることを確認

## ✅ 受け入れ基準

- [ ] PostgreSQLが起動し、接続可能である
- [ ] Prismaスキーマファイルが作成されている
- [ ] 初期スキーマ（User, Goal, Task等）が定義されている
- [ ] データベース接続が環境変数で管理されている
- [ ] docker-compose.ymlが作成されている（Docker使用の場合）

## 📊 確認用チェックリスト

- [ ] DATABASE_URLが.env.exampleに記載されているか
- [ ] Prismaスキーマがドキュメントと一致しているか
- [ ] インデックスが適切に設定されているか
- [ ] データベースのバックアップ方針が決定されているか

## 🏷️ ラベル

`human-task`, `setup`, `backend`, `database`

## 👤 アサイン

@oratta
