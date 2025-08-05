# CI/CD ローカル事前確認ルール

## 概要

プルリクエストやプッシュを行う前に、CI/CDで実行される内容をローカル環境で事前に確認することで、CIでの失敗を防ぎ、開発効率を向上させます。

## ローカルCI確認コマンド

### 1. 完全なCI確認（推奨）

すべてのCI/CDチェックをローカルで実行します：

```bash
# すべてのチェックを順番に実行
npm run ci:local
```

このコマンドは以下を順番に実行します：

1. フォーマットチェック（Prettier）
2. リントチェック（ESLint）
3. 型チェック（TypeScript）
4. ユニットテスト（Jest）
5. E2Eテスト（Playwright）

### 2. 個別チェック

必要に応じて個別に実行することも可能です：

```bash
# フォーマットチェック
npm run format:check

# フォーマット修正
npm run format

# ESLintによるコード品質チェック
npm run lint

# ESLint自動修正
npm run lint:fix

# TypeScriptの型チェック
npm run typecheck

# ユニットテストの実行
npm run test

# E2Eテストの実行
npm run test:e2e

# ビルドの確認
npm run build
```

## プッシュ前チェックリスト

- [ ] `npm run format` - コードがフォーマットされていることを確認
- [ ] `npm run ci:local` - すべてのチェックが通ることを確認
  - [ ] フォーマットチェック
  - [ ] Lintエラーがない
  - [ ] 型エラーがない
  - [ ] すべてのテストが通る
  - [ ] E2Eテストが通る

## トラブルシューティング

### テストがローカルで通るがCIで失敗する場合

1. 環境変数 `CI=true` を設定して再実行
2. Node.jsのバージョンを確認（18.x, 20.x）
3. `npm ci` で依存関係をクリーンインストール

### ESModuleエラーが発生する場合

- Supabaseなどの外部サービスに依存するテストは、CI環境用のプレースホルダーテストを用意する
- 実際のintegrationテストはローカル環境でのみ実行

## npm scriptsの追加

package.jsonに以下のスクリプトを追加することを推奨：

```json
{
  "scripts": {
    "ci:local": "npm run format:check && npm run lint && npm run typecheck && npm run test && npm run test:e2e",
    "precommit": "npm run format && npm run lint",
    "prepush": "npm run ci:local"
  }
}
```

## Git Hooksの設定（オプション）

Huskyを使用して自動化することも可能：

```bash
# Huskyのインストール
npm install --save-dev husky

# Git hooksの設定
npx husky add .husky/pre-commit "npm run precommit"
npx husky add .husky/pre-push "npm run prepush"
```

## 注意事項

1. **CI環境変数**: `CI=true`を設定することで、CI環境と同じ挙動でテストを実行できます
2. **キャッシュ**: 問題が発生した場合は`npm ci`でクリーンインストール
3. **環境依存**: Supabaseなど外部サービスに依存する機能は、適切な環境変数が必要
