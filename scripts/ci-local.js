#!/usr/bin/env node

const { execSync } = require('child_process');
const chalk = require('chalk');

// CI環境モードのチェック
const isCIMode = process.argv.includes('--ci') || process.env.CI === 'true';

if (isCIMode) {
  console.log('🔧 CI環境モードで実行します (CI=true)\n');
}

// チョークが利用できない場合のフォールバック
const colors = {
  green: (text) => chalk?.green?.(text) || `✓ ${text}`,
  red: (text) => chalk?.red?.(text) || `✗ ${text}`,
  yellow: (text) => chalk?.yellow?.(text) || `⚠ ${text}`,
  cyan: (text) => chalk?.cyan?.(text) || text,
  bold: (text) => chalk?.bold?.(text) || text,
};

const tasks = [
  { name: 'フォーマットチェック', command: 'npm run format:check', emoji: '🎨' },
  { name: 'ESLintチェック', command: 'npm run lint', emoji: '🔍' },
  { name: 'TypeScript型チェック', command: 'npm run typecheck', emoji: '📘' },
  { name: 'ユニットテスト', command: 'npm run test', emoji: '🧪', env: { CI: 'true' } },
  { name: 'E2Eテスト', command: 'npm run test:e2e', emoji: '🌐' },
];

const results = [];
let allPassed = true;

console.log(colors.bold('\n🚀 CI/CDローカルチェックを開始します...'));
console.log(
  colors.cyan(
    '💡 ヒント: GitHub Actions環境と同じ条件で実行するには --ci オプションを使用してください\n',
  ),
);

// 各タスクを実行
for (const task of tasks) {
  process.stdout.write(`${task.emoji} ${task.name}... `);

  const startTime = Date.now();

  try {
    // CI環境モードの場合、環境変数を設定
    const env = isCIMode
      ? { ...process.env, CI: 'true', ...task.env }
      : { ...process.env, ...task.env };
    execSync(task.command, { stdio: 'pipe', env });
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(colors.green(`✓ 成功 (${duration}s)`));
    results.push({ ...task, success: true, duration });
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(colors.red(`✗ 失敗 (${duration}s)`));
    results.push({ ...task, success: false, duration, error: error.message });
    allPassed = false;

    // エラーの詳細を表示
    if (error.stdout) {
      console.log(colors.yellow('\n詳細:'));
      console.log(error.stdout.toString().split('\n').slice(0, 10).join('\n'));
      console.log(colors.yellow('...\n'));
    }
  }
}

// サマリーを表示
console.log(colors.bold('\n📊 実行結果サマリー\n'));
console.log('─'.repeat(50));

results.forEach((result) => {
  const status = result.success ? colors.green('✓ PASS') : colors.red('✗ FAIL');
  const time = `(${result.duration}s)`;
  console.log(`${result.emoji} ${result.name.padEnd(20)} ${status} ${time}`);
});

console.log('─'.repeat(50));

// 統計情報
const passed = results.filter((r) => r.success).length;
const failed = results.filter((r) => !r.success).length;
const totalTime = results.reduce((sum, r) => sum + parseFloat(r.duration), 0).toFixed(1);

console.log(`\n📈 統計:`);
console.log(`   成功: ${colors.green(passed + '件')}`);
console.log(`   失敗: ${colors.red(failed + '件')}`);
console.log(`   合計時間: ${colors.cyan(totalTime + 's')}`);

// 最終結果
if (allPassed) {
  console.log(colors.green('\n✅ すべてのチェックが成功しました！\n'));
  process.exit(0);
} else {
  console.log(colors.red('\n❌ 一部のチェックが失敗しました。修正が必要です。\n'));

  // 失敗したタスクの一覧
  const failedTasks = results.filter((r) => !r.success);
  console.log(colors.yellow('失敗したタスク:'));
  failedTasks.forEach((task) => {
    console.log(`  - ${task.emoji} ${task.name}`);
  });
  console.log('');

  process.exit(1);
}
