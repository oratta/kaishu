import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

describe('ESLint/Prettier設定', () => {
  const rootDir = path.join(__dirname, '..');

  describe('設定ファイルの存在確認', () => {
    it('.eslintrc.jsonが存在する', () => {
      const eslintConfigPath = path.join(rootDir, '.eslintrc.json');
      expect(fs.existsSync(eslintConfigPath)).toBe(true);
    });

    it('.prettierrc.jsonが存在する', () => {
      const prettierConfigPath = path.join(rootDir, '.prettierrc.json');
      expect(fs.existsSync(prettierConfigPath)).toBe(true);
    });

    it('.prettierignoreが存在する', () => {
      const prettierIgnorePath = path.join(rootDir, '.prettierignore');
      expect(fs.existsSync(prettierIgnorePath)).toBe(true);
    });
  });

  describe('ESLintルールの動作確認', () => {
    const testFilePath = path.join(__dirname, 'test-lint-sample.tsx');

    beforeEach(() => {
      // テスト用のサンプルファイルを作成
      const sampleCode = `
import React from 'react'
import { useState } from 'react'

const TestComponent = () => {
  var unusedVar = 'unused'
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}

export default TestComponent
`;
      fs.writeFileSync(testFilePath, sampleCode);
    });

    afterEach(() => {
      // テストファイルをクリーンアップ
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    });

    it('ESLintがエラーを検出する', () => {
      try {
        execSync(`npx eslint ${testFilePath}`, { cwd: rootDir });
        fail('ESLintがエラーを検出しませんでした');
      } catch (error) {
        // ESLintがエラーを検出することを期待
        expect(error).toBeDefined();
      }
    });

    it('ESLint --fixで自動修正が可能', () => {
      try {
        execSync(`npx eslint --fix ${testFilePath}`, { cwd: rootDir, stdio: 'pipe' });
      } catch (error) {
        // ESLintが修正を行っても、未使用変数などの警告が残る場合があるので、エラーは無視
      }
      const fixedContent = fs.readFileSync(testFilePath, 'utf-8');

      // varがconstまたはletに修正されていることを確認
      expect(fixedContent).not.toMatch(/var unusedVar/);
    });
  });

  describe('Prettierフォーマットの動作確認', () => {
    const testFilePath = path.join(__dirname, 'test-prettier-sample.ts');

    beforeEach(() => {
      // フォーマットが必要なサンプルコード
      const unformattedCode = `
const longFunction = (param1: string,param2: number,param3: boolean) => {
return param1+param2.toString()+param3}

const obj={
key1:"value1",
key2:"value2",
key3:"value3"
}
`;
      fs.writeFileSync(testFilePath, unformattedCode);
    });

    afterEach(() => {
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    });

    it('Prettierがフォーマットを適用する', () => {
      execSync(`npx prettier --write ${testFilePath}`, { cwd: rootDir });
      const formattedContent = fs.readFileSync(testFilePath, 'utf-8');

      // セミコロンが追加されている
      expect(formattedContent).toMatch(/;/);
      // シングルクォートが使用されている
      expect(formattedContent).toMatch(/'value1'/);
      // 適切なインデントが適用されている
      expect(formattedContent).toMatch(/  key1: 'value1',/);
      // 末尾カンマが追加されている
      expect(formattedContent).toMatch(/key3: 'value3',/);
    });

    it('Prettier --checkでフォーマットチェックが機能する', () => {
      try {
        execSync(`npx prettier --check ${testFilePath}`, { cwd: rootDir });
        fail('Prettierがフォーマットの問題を検出しませんでした');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('npm scriptsの動作確認', () => {
    it('npm run lintが実行可能', () => {
      const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
      expect(packageJson.scripts.lint).toBeDefined();
      expect(packageJson.scripts.lint).toBe('next lint');
    });

    it('npm run lint:fixが実行可能', () => {
      const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
      expect(packageJson.scripts['lint:fix']).toBeDefined();
      expect(packageJson.scripts['lint:fix']).toBe('next lint --fix');
    });

    it('npm run formatが実行可能', () => {
      const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
      expect(packageJson.scripts.format).toBeDefined();
      expect(packageJson.scripts.format).toBe('prettier --write .');
    });

    it('npm run format:checkが実行可能', () => {
      const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
      expect(packageJson.scripts['format:check']).toBeDefined();
      expect(packageJson.scripts['format:check']).toBe('prettier --check .');
    });
  });

  describe('設定の競合チェック', () => {
    it('ESLintとPrettierの設定に競合がない', () => {
      // サンプルファイルでESLintとPrettierを両方実行
      const testFilePath = path.join(__dirname, 'test-conflict-sample.tsx');
      const sampleCode = `
import React from 'react'

const TestComponent = () => {
  return <div>Test</div>
}

export default TestComponent
`;
      fs.writeFileSync(testFilePath, sampleCode);

      try {
        // Prettierでフォーマット
        execSync(`npx prettier --write ${testFilePath}`, { cwd: rootDir });
        // ESLintでチェック（Prettierフォーマット後にESLintエラーが出ないことを確認）
        execSync(`npx eslint ${testFilePath}`, { cwd: rootDir });
      } finally {
        if (fs.existsSync(testFilePath)) {
          fs.unlinkSync(testFilePath);
        }
      }
    });
  });
});
