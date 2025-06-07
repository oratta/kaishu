# kaishu-ai-planner View移行実行計画

## 概要

kaishu-ai-plannerリポジトリのView部分を現在のNext.jsプロジェクトに移行する実行計画。

## フェーズ1: 基盤整備 (必須)

### 1.1 パッケージ追加

以下のパッケージを追加インストール：

```bash
npm install @tanstack/react-query react-hook-form @hookform/resolvers zod \
  recharts sonner cmdk react-day-picker date-fns \
  @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-switch \
  @radix-ui/react-checkbox @radix-ui/react-select @radix-ui/react-popover \
  @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar \
  @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-hover-card \
  @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area @radix-ui/react-slider @radix-ui/react-toast \
  @radix-ui/react-toggle @radix-ui/react-toggle-group \
  zustand
```

### 1.2 shadcn/ui コンポーネント追加

kaishu-ai-plannerで使用されている全UIコンポーネントを追加：

- 既存: button, card, dropdown-menu, input, label, separator
- 追加必要: dialog, tabs, switch, checkbox, select, popover, accordion, alert-dialog,
  avatar, badge, calendar, chart, collapsible, command, context-menu, drawer,
  form, hover-card, menubar, navigation-menu, pagination, radio-group,
  scroll-area, sheet, skeleton, slider, table, textarea, toast, toggle, toggle-group

### 1.3 型定義の移行

- `/src/types/`に全ての型定義ファイルを移行
- 特に重要: `life-management.ts`, `ui.ts`, `llm.ts`

### 1.4 ストア設定

- Zustandストアの設定と永続化
- TanStack Queryのプロバイダー設定

## フェーズ2: レイアウト移行

### 2.1 メインレイアウト

- SPAレイアウトからApp Routerレイアウトへの変換
- `/src/app/layout.tsx`の更新

### 2.2 サイドバー

- kaishu-ai-plannerのサイドバーデザインを移行
- ナビゲーション項目の日本語化維持

### 2.3 フローティングチャット

- LLMチャットコンポーネントの移行
- グラスモーフィズムデザインの維持

## フェーズ3: ビューコンポーネント移行

### 3.1 ダッシュボード

- タイムブロックカレンダーの統合（FullCalendar vs カスタム実装の選択）
- 現在のタスク表示
- プロジェクトノート

### 3.2 プロジェクトビュー

- プロジェクトテーブル
- 進捗チャート（Recharts）
- LLMインサイト

### 3.3 タスクビュー

- タスク管理インターフェース
- フォーム実装（React Hook Form + Zod）

### 3.4 習慣ビュー

- 習慣トラッキングUI

### 3.5 カレンダービュー

- FullCalendarとの統合または置き換え

## フェーズ4: ルーティング調整

### 4.1 React Router → App Router

- クライアントサイドルーティングからファイルベースルーティングへ
- 各ビューを個別のpage.tsxファイルとして配置

### 4.2 状態管理の調整

- Zustandのcurrentview状態をURLベースに変更
- ナビゲーション時の状態同期

## フェーズ5: スタイリング統合

### 5.1 カラーパレット

- kaishuカラー（indigo系）の追加
- CSS変数の統合

### 5.2 レスポンシブデザイン

- モバイルファーストアプローチの維持
- ブレークポイントの調整

## フェーズ6: 機能統合

### 6.1 データフロー

- モックデータから実データへの段階的移行
- APIルートの実装（必要に応じて）

### 6.2 LLM統合

- チャットインターフェースの接続
- OpenAI/Claude APIの統合

## 移行順序（推奨）

1. **Week 1**: フェーズ1（基盤整備）
2. **Week 2**: フェーズ2（レイアウト移行）
3. **Week 3-4**: フェーズ3（ビューコンポーネント移行）
4. **Week 5**: フェーズ4-5（ルーティング・スタイリング）
5. **Week 6**: フェーズ6（機能統合・テスト）

## 注意事項

- Vite特有の実装（import.meta.envなど）はNext.js方式に変換
- React 19との互換性確認（kaishu-ai-plannerはReact 18）
- App RouterのServer/Client Componentの適切な使い分け
- 既存のFullCalendar実装との統合方針の決定

## 成功基準

- 全てのUIコンポーネントが正常に表示される
- ナビゲーションが正常に動作する
- レスポンシブデザインが維持される
- ダークモードが正常に動作する
- TypeScriptの型エラーがない
- ESLintエラーがない
