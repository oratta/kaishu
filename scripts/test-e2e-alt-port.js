#!/usr/bin/env node

const { spawn } = require('child_process');
const { createServer } = require('http');

// 利用可能なポートを探す
const findAvailablePort = async (startPort = 3001) => {
  for (let port = startPort; port < startPort + 100; port++) {
    try {
      await new Promise((resolve, reject) => {
        const server = createServer();
        server.once('error', reject);
        server.once('listening', () => {
          server.close();
          resolve();
        });
        server.listen(port);
      });
      return port;
    } catch (error) {
      // このポートは使用中
    }
  }
  throw new Error('利用可能なポートが見つかりません');
};

const runE2ETests = async () => {
  console.log('🔍 利用可能なポートを探しています...');

  try {
    const port = await findAvailablePort();
    console.log(`✅ ポート ${port} を使用します`);

    // 環境変数を設定してE2Eテストを実行
    const env = { ...process.env, PORT: port, CI: 'true' };
    const child = spawn('npm', ['run', 'test:e2e'], {
      env,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      process.exit(code);
    });
  } catch (error) {
    console.error('❌ エラー:', error.message);
    process.exit(1);
  }
};

runE2ETests();
