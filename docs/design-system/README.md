# KAISHU デザインシステム

## 概要

KAISHUプロジェクトのデザインシステムは、「Calm Technology meets AI Intelligence」というコンセプトに基づいて設計されています。ユーザーが人生をオーケストレーションする体験を、直感的かつ心地よく実現することを目指しています。

## カラーシステム

### プライマリカラー（深い青緑）

信頼と成長を表現する色です。

- `#0F766E` - メインカラー
- 使用場面：主要なCTA、重要な情報、ナビゲーション要素

### セカンダリカラー（温かみのあるベージュ）

穏やかさと親しみやすさを表現します。

- `#F5E6D3` - メインカラー
- 使用場面：背景、補助的な要素、カード

### アクセントカラー（ソフトコーラル）

達成感と喜びを表現します。

- `#FF6B6B` - メインカラー
- 使用場面：成功メッセージ、達成表示、ハイライト

### 背景色

- Primary: `#FAFAFA` - メイン背景
- Secondary: `#F5F5F5` - セクション背景

### セマンティックカラー

- Success: `#10B981` - 成功、完了、肯定的なフィードバック
- Warning: `#F59E0B` - 警告、注意、重要な通知
- Error: `#EF4444` - エラー、削除、否定的なフィードバック
- Info: `#3B82F6` - 情報、ヒント、補足説明

## タイポグラフィ

### フォントファミリー

- Sans-serif: `Noto Sans JP`, `Inter`, `system-ui`, `sans-serif`
- Monospace: `Fira Code`, `Consolas`, `Monaco`, `monospace`

### フォントサイズ

- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)
- 5xl: 3rem (48px)

### フォントウェイト

- normal: 400
- medium: 500
- semibold: 600
- bold: 700

### 行間

- tight: 1.25
- normal: 1.5
- relaxed: 1.75

## スペーシング

8の倍数を基本としたスペーシングシステムを採用しています。

- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 4: 1rem (16px)
- 8: 2rem (32px)
- 16: 4rem (64px)
- 32: 8rem (128px)

## レスポンシブブレークポイント

- sm: 640px (モバイル横向き)
- md: 768px (タブレット)
- lg: 1024px (デスクトップ)
- xl: 1280px (大画面デスクトップ)
- 2xl: 1536px (超大画面)

## シャドウ

深度を表現するためのシャドウスケール：

- sm: 微細なシャドウ
- DEFAULT: 標準的なカード用
- md: 中程度の浮き上がり
- lg: モーダルやドロップダウン
- xl: フローティング要素

## アニメーション

### 継続時間

- fast: 150ms (マイクロインタラクション)
- normal: 200ms (標準的な遷移)
- slow: 300ms (複雑な動き)

### イージング

穏やかで自然な動きを実現：

- DEFAULT: cubic-bezier(0.4, 0.0, 0.2, 1)
- in: cubic-bezier(0.4, 0.0, 1, 1)
- out: cubic-bezier(0.0, 0.0, 0.2, 1)
- inOut: cubic-bezier(0.4, 0.0, 0.2, 1)

## 使用方法

### Tailwind CSSでの利用

```html
<div class="bg-primary text-white p-4 rounded-lg shadow-md transition-all duration-normal ease-out">
  プライマリカラーのボックス
</div>
```

### JavaScript/TypeScriptでの利用

```typescript
import { colors, typography, spacing } from '@/lib/design-system';

const styles = {
  color: colors.primary.DEFAULT,
  fontSize: typography.fontSize.lg,
  padding: spacing[4],
};
```

## デザイン原則

1. **明確性**: 情報は明確で理解しやすく
2. **一貫性**: UIパターンの統一
3. **アクセシビリティ**: WCAG 2.1 AA準拠
4. **パフォーマンス**: 軽量で高速な体験
5. **レスポンシブ**: あらゆるデバイスで最適な表示
