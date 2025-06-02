# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KAISHU/ALMS (AI Life Management System) - A life orchestration tool that helps users manage their goals, projects, and time through LLM-powered planning and Google Calendar integration.

## Common Development Commands

```bash
# Development
npm run dev          # Start Next.js development server (http://localhost:3000)
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Architecture Overview

The system follows a hierarchical data structure for life management:

```
life_goals (人生目標)
  └── goal_conditions (達成条件)
      └── projects (プロジェクト)
          └── milestones (マイルストーン)
              ├── tasks (タスク)
              └── habits (習慣)
```

### Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS (shadcn/ui planned)
- **State Management**: React Query (server), useState/useContext (local)
- **LLM Integration**: OpenAI GPT-4o (primary), Claude 3.5 Sonnet (fallback)

### Directory Structure

- `/contexts/` - Project requirements and specifications (ALWAYS reference before implementation)
- `/src/app/` - Next.js pages (dashboard, projects, calendar, settings)
- `/src/components/` - React components
- `/src/lib/` - Utility libraries
- `/src/types/` - TypeScript type definitions
- `/rules/` - Development guidelines
- `/plans/` - Project planning documents

## Development Guidelines

### コミュニケーションガイドライン

ユーザとのコミュニケーションに関しては以下のルールに従ってください。

- 技術的質問にはcontext7を使って最新の情報を調べてから回答してください。
- ユーザと議論して決定した内容はルートディレクトリに .dev/contexts ディレクトリを作成してその中にmdファイルとして記録してください
- githubのissueのクローズはユーザに依頼されない限り禁止です。作業の途中で必要になった場合はユーザに依頼してください。
- contextsディレクトリには作業に必要な情報が入っているので常に参照してください
- plansディレクトリにはプロジェクトの情報が入っていますが、必ずしも作業に必要ではないので、ユーザの指示があった場合に参照してください。
- contextsディレクトリ内のファイルに定義されている内容と違う実装を行なう場合は必ずユーザの承認を得てください。
- ユーザの指示でcontexts内のファイルに定義されている内容と違う実装を行う場合は、作業後にcontexts内の該当ファイルを更新してください。その場合にplans内のファイルにも影響がないか確認して、影響があればplans内のファイルも更新してください。

### コーディングガイドライン

コーディングに関しては以下に従ってください。

1. Code Quality and Organization:
   - Create small, focused components (< 50 lines)
   - Follow established project structure
   - Implement responsive designs by default
   - Write extensive console logs for debugging
2. Component Creation:
   - Create new files for each component
   - Use shadcn/ui components when possible
   - Follow atomic design principles
   - Ensure proper file organization
3. State Management:
   - Use React Query for server state
   - Implement local state with useState/useContext
   - Avoid prop drilling
   - Cache responses when appropriate
4. Error Handling:
   - Use toast notifications for user feedback
   - Implement proper error boundaries
   - Log errors for debugging
   - Provide user-friendly error messages
5. Performance:
   - Implement code splitting where needed
   - Optimize image loading
   - Use proper React hooks
   - Minimize unnecessary re-renders
6. Security:
   - Validate all user inputs
   - Implement proper authentication flows
   - Sanitize data before display
   - Follow OWASP security guidelines
7. Testing:
   - Write unit tests for critical functions
   - Implement integration tests
   - Test responsive layouts
   - Verify error handling
8. Documentation:
   - Document complex functions
   - Keep README up to date
   - Include setup instructions
   - Document API endpoints
9. Coding Best Practices:
   - Do not add comments to the code you write, unless the user asks you to, or the code is complex and requires additional context.
   - When making changes to files, first understand the file's code conventions. Mimic code style, use existing libraries and utilities, and follow existing patterns.
   - NEVER assume that a given library is available, even if it is well known. Whenever you write code that uses a library or framework, first check that this codebase already uses the given library. For example, you might look at neighboring files, or check the package.json (or cargo.toml, and so on depending on the language).
   - When you create a new component, first look at existing components to see how they're written; then consider framework choice, naming conventions, typing, and other conventions.
   - When you edit a piece of code, first look at the code's surrounding context (especially its imports) to understand the code's choice of frameworks and libraries. Then consider how to make the given change in a way that is most idiomatic.

### Important Instruction Reminders

- Do what has been asked; nothing more, nothing less.
- NEVER create files unless they're absolutely necessary for achieving your goal.
- ALWAYS prefer editing an existing file to creating a new one.
- NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
