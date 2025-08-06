#!/usr/bin/env node

const { execSync, exec } = require('child_process');
const chalk = require('chalk');
const net = require('net');

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

// ポートが使用中かチェックする関数
const isPortInUse = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(true));
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(port);
  });
};

// プロセスがKAISHUプロジェクトのものかチェック
const isKaishuProcess = async (port) => {
  try {
    const result = execSync(`lsof -i :${port} -P -n | grep LISTEN || true`, { encoding: 'utf8' });
    return result.includes('node') && (result.includes('next') || result.includes('npm'));
  } catch {
    return false;
  }
};

const tasks = [
  { name: 'フォーマットチェック', command: 'npm run format:check', emoji: '🎨' },
  { name: 'ESLintチェック', command: 'npm run lint', emoji: '🔍' },
  { name: 'TypeScript型チェック', command: 'npm run typecheck', emoji: '📘' },
  { name: 'ユニットテスト', command: 'npm run test', emoji: '🧪', env: { CI: 'true' } },
  { name: 'E2Eテスト', command: 'npm run test:e2e', emoji: '🌐', requiresPort: 3000 },
];

const results = [];
let allPassed = true;

// メイン実行関数
const runChecks = async () => {
  console.log(colors.bold('\n🚀 CI/CDローカルチェックを開始します...'));
  console.log(
    colors.cyan(
      '💡 ヒント: GitHub Actions環境と同じ条件で実行するには --ci オプションを使用してください\n',
    ),
  );

  // 各タスクを実行
  for (const task of tasks) {
    // ポートが必要なタスクの場合、事前チェック
    if (task.requiresPort) {
      const portInUse = await isPortInUse(task.requiresPort);
      if (portInUse) {
        const isOurProcess = await isKaishuProcess(task.requiresPort);
        if (!isOurProcess) {
          console.log(`${task.emoji} ${task.name}... ${colors.yellow('⚠ スキップ')}`);
          console.log(
            colors.yellow(`   ポート${task.requiresPort}が他のプロセスで使用されています`),
          );
          console.log(colors.cyan(`   E2Eテストを実行するには:`));
          console.log(colors.cyan(`   1. ポート${task.requiresPort}を使用しているプロセスを停止`));
          console.log(colors.cyan(`   2. または別のターミナルで: npm run test:e2e:ui`));
          results.push({ ...task, success: true, duration: 0, skipped: true });
          continue;
        }
      }
    }
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
    let status;
    if (result.skipped) {
      status = colors.yellow('⚠ SKIP');
    } else if (result.success) {
      status = colors.green('✓ PASS');
    } else {
      status = colors.red('✗ FAIL');
    }
    const time = result.skipped ? '' : `(${result.duration}s)`;
    console.log(`${result.emoji} ${result.name.padEnd(20)} ${status} ${time}`);
  });

  console.log('─'.repeat(50));

  // 統計情報
  const passed = results.filter((r) => r.success && !r.skipped).length;
  const failed = results.filter((r) => !r.success).length;
  const skipped = results.filter((r) => r.skipped).length;
  const totalTime = results.reduce((sum, r) => sum + parseFloat(r.duration || 0), 0).toFixed(1);

  console.log(`\n📈 統計:`);
  console.log(`   成功: ${colors.green(passed + '件')}`);
  console.log(`   失敗: ${colors.red(failed + '件')}`);
  if (skipped > 0) {
    console.log(`   スキップ: ${colors.yellow(skipped + '件')}`);
  }
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
};

// 実行
runChecks().catch((error) => {
  console.error(colors.red('\n❌ エラーが発生しました:'), error);
  process.exit(1);
});
