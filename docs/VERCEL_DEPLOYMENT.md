# Vercel Deployment Setup Guide

このドキュメントでは、KAISHUプロジェクトのVercelデプロイ設定手順を説明します。

## 前提条件

- Vercelアカウントを作成済み
- GitHubリポジトリが設定済み
- Vercel CLIをインストール済み（オプション）

## セットアップ手順

### 1. Vercelプロジェクトの作成

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. "New Project"をクリック
3. GitHubリポジトリ（oratta/kaishu）をインポート
4. Framework Preset: "Next.js"を選択
5. Environment Variables（後述）を設定

### 2. 環境変数の設定

#### Vercel Dashboard で設定する環境変数

プロジェクトの環境変数として以下を設定：

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# その他必要な環境変数
DATABASE_URL=your_database_url
```

#### GitHub Secrets の設定

リポジトリの Settings > Secrets and variables > Actions で以下を設定：

1. **VERCEL_TOKEN**
   - Vercel Dashboard > Account Settings > Tokens
   - "Create Token"をクリックして新規作成
   - Scopeは"Full Access"を選択

2. **VERCEL_ORG_ID**
   - Vercel CLIで確認: `vercel whoami`
   - または、Vercel Dashboard > Team Settings で確認

3. **VERCEL_PROJECT_ID**
   - プロジェクト作成後、Project Settings > General で確認
   - または、`vercel link`コマンドで`.vercel/project.json`を生成して確認

### 3. デプロイの動作確認

#### プレビューデプロイ

1. 新しいブランチを作成してプッシュ
2. Pull Requestを作成
3. 自動的にプレビューデプロイが開始
4. PRにプレビューURLがコメントされる

#### 本番デプロイ

1. PRをmainブランチにマージ
2. 自動的に本番デプロイが開始
3. https://kaishu.vercel.app で確認

## トラブルシューティング

### デプロイが失敗する場合

1. **ビルドエラー**
   - `npm run build`をローカルで実行して確認
   - 環境変数が正しく設定されているか確認

2. **権限エラー**
   - VERCEL_TOKENが正しく設定されているか確認
   - トークンの有効期限を確認

3. **プロジェクトが見つからない**
   - VERCEL_PROJECT_IDが正しいか確認
   - Vercelプロジェクトが存在するか確認

### Vercel CLIでの確認方法

```bash
# Vercelにログイン
vercel login

# プロジェクトをリンク
vercel link

# 環境変数を確認
vercel env ls

# ローカルでVercel環境を再現
vercel dev
```

## 環境ごとの設定

### Development

- ブランチ: すべて
- 環境変数: Development用

### Preview

- ブランチ: PR
- 環境変数: Preview用

### Production

- ブランチ: main
- 環境変数: Production用

## セキュリティ注意事項

- APIキーやシークレットは絶対にコードにハードコードしない
- 環境変数は適切なスコープ（Development/Preview/Production）で設定
- NEXT*PUBLIC*プレフィックスの付いた環境変数はクライアントサイドで露出することに注意

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
