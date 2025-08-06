# KAISHU - Life Orchestration Tool

[![CI](https://github.com/oratta/kaishu/actions/workflows/ci.yml/badge.svg)](https://github.com/oratta/kaishu/actions/workflows/ci.yml)
[![Vercel Production](https://img.shields.io/badge/Vercel-Production-000000?style=flat&logo=vercel)](https://kaishu.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

理想の人生から逆算して必要なアクション（学習・実践・アウトプット）を特定し、カレンダーの空き時間に自動配置するAIコーチ・秘書サービス。

## 🚀 Features

- **AIヒアリングセッション**: 20分のガイド付き対話フローで目標と価値観を抽出
- **目標分解エンジン**: LLMを使用して抽象的な目標を実行可能なタスクに分解
- **自動計画生成**: ヒアリング結果から実行可能な計画を自動生成
- **現状分析**: 3つのアセット（人的・経済・社会資本）の評価とギャップ分析
- **進捗可視化**: GitHubスタイルのヒートマップで進捗を視覚化
- **カレンダー統合**: Google Calendarと連携して空き時間にタスクを自動配置

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4.4 (App Router), TypeScript 5, Tailwind CSS 3.4.16
- **Backend**: Node.js + Express, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **AI**: OpenAI API (GPT-4)
- **Auth & Payment**: Supabase Auth, Stripe
- **Hosting**: Vercel
- **Testing**: Jest, React Testing Library, Playwright

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/oratta/kaishu.git
cd kaishu

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Run all CI checks locally
npm run ci:local
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run ci:local` - Run all CI checks locally

## 🚀 Deployment

This project is automatically deployed to Vercel:

- **Production**: Merges to `main` branch are automatically deployed to production
- **Preview**: Pull requests get preview deployments with unique URLs

### Required Environment Variables

⚠️ **Important**: Vercel deployment workflows will fail until these secrets are configured in GitHub.

For Vercel deployment, set these secrets in GitHub (Settings → Secrets and variables → Actions):

- `VERCEL_TOKEN` - Get from Vercel Dashboard > Account Settings > Tokens
- `VERCEL_ORG_ID` - Get from `vercel whoami` or Team Settings
- `VERCEL_PROJECT_ID` - Get from Project Settings after creating the project

See [docs/VERCEL_DEPLOYMENT.md](docs/VERCEL_DEPLOYMENT.md) for detailed setup instructions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm run ci:local`)
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- [@oratta](https://github.com/oratta) - Project Lead

---

Built with ❤️ using Next.js and TypeScript
