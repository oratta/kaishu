import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const rootDir = path.resolve(__dirname, '..');

describe('CI/CD設定', () => {
  describe('GitHubワークフローファイルの存在確認', () => {
    it('.github/workflows/ci.ymlが存在する', () => {
      const ciWorkflowPath = path.join(rootDir, '.github', 'workflows', 'ci.yml');
      expect(fs.existsSync(ciWorkflowPath)).toBe(true);
    });

    it('.github/workflows/deploy-preview.ymlが存在する', () => {
      const deployPreviewPath = path.join(rootDir, '.github', 'workflows', 'deploy-preview.yml');
      expect(fs.existsSync(deployPreviewPath)).toBe(true);
    });

    it('.github/workflows/deploy-production.ymlが存在する', () => {
      const deployProductionPath = path.join(
        rootDir,
        '.github',
        'workflows',
        'deploy-production.yml',
      );
      expect(fs.existsSync(deployProductionPath)).toBe(true);
    });

    it('.github/dependabot.ymlが存在する', () => {
      const dependabotPath = path.join(rootDir, '.github', 'dependabot.yml');
      expect(fs.existsSync(dependabotPath)).toBe(true);
    });

    it('.github/CODEOWNERSが存在する', () => {
      const codeownersPath = path.join(rootDir, '.github', 'CODEOWNERS');
      expect(fs.existsSync(codeownersPath)).toBe(true);
    });
  });

  describe('CIワークフローの設定確認', () => {
    let ciWorkflow: any;

    beforeAll(() => {
      const ciWorkflowPath = path.join(rootDir, '.github', 'workflows', 'ci.yml');
      if (fs.existsSync(ciWorkflowPath)) {
        const workflowContent = fs.readFileSync(ciWorkflowPath, 'utf8');
        ciWorkflow = yaml.load(workflowContent);
      }
    });

    it('プッシュとPRでトリガーされる', () => {
      expect(ciWorkflow).toBeDefined();
      expect(ciWorkflow.on).toBeDefined();
      expect(ciWorkflow.on.push).toBeDefined();
      expect(ciWorkflow.on.pull_request).toBeDefined();
    });

    it('Node.js 20.xを使用する', () => {
      const jobs = ciWorkflow.jobs;
      expect(jobs).toBeDefined();

      // 各ジョブがNode.js 20を使用することを確認
      Object.values(jobs).forEach((job: any) => {
        if (job.steps) {
          const setupNodeStep = job.steps.find(
            (step: any) => step.uses && step.uses.includes('actions/setup-node'),
          );
          if (setupNodeStep) {
            expect(setupNodeStep.with?.['node-version']).toBe('20');
          }
        }
      });
    });

    it('必要なジョブが定義されている', () => {
      expect(ciWorkflow.jobs).toBeDefined();
      expect(ciWorkflow.jobs.lint).toBeDefined();
      expect(ciWorkflow.jobs.typecheck).toBeDefined();
      expect(ciWorkflow.jobs.test).toBeDefined();
      expect(ciWorkflow.jobs.e2e).toBeDefined();
    });

    it('キャッシュが設定されている', () => {
      const jobs = ciWorkflow.jobs;
      Object.values(jobs).forEach((job: any) => {
        if (job.steps) {
          // actions/setup-nodeでキャッシュが設定されているか確認
          const setupNodeStep = job.steps.find(
            (step: any) => step.uses && step.uses.includes('actions/setup-node'),
          );
          if (setupNodeStep) {
            expect(setupNodeStep.with?.cache).toBe('npm');
          }
        }
      });
    });
  });

  describe('Vercelデプロイワークフローの設定確認', () => {
    let deployPreviewWorkflow: any;
    let deployProductionWorkflow: any;

    beforeAll(() => {
      const previewPath = path.join(rootDir, '.github', 'workflows', 'deploy-preview.yml');
      const productionPath = path.join(rootDir, '.github', 'workflows', 'deploy-production.yml');

      if (fs.existsSync(previewPath)) {
        const previewContent = fs.readFileSync(previewPath, 'utf8');
        deployPreviewWorkflow = yaml.load(previewContent);
      }

      if (fs.existsSync(productionPath)) {
        const productionContent = fs.readFileSync(productionPath, 'utf8');
        deployProductionWorkflow = yaml.load(productionContent);
      }
    });

    it('プレビューデプロイはPRでトリガーされる', () => {
      expect(deployPreviewWorkflow).toBeDefined();
      expect(deployPreviewWorkflow.on).toBeDefined();
      expect(deployPreviewWorkflow.on.pull_request).toBeDefined();
    });

    it('本番デプロイはmainブランチへのプッシュでトリガーされる', () => {
      expect(deployProductionWorkflow).toBeDefined();
      expect(deployProductionWorkflow.on).toBeDefined();
      expect(deployProductionWorkflow.on.push).toBeDefined();
      expect(deployProductionWorkflow.on.push.branches).toContain('main');
    });

    it('Vercel環境変数を使用する', () => {
      // プレビューデプロイ - 環境変数はワークフローレベルで定義
      expect(deployPreviewWorkflow?.env?.VERCEL_ORG_ID).toBe('${{ secrets.VERCEL_ORG_ID }}');
      expect(deployPreviewWorkflow?.env?.VERCEL_PROJECT_ID).toBe(
        '${{ secrets.VERCEL_PROJECT_ID }}',
      );

      // 本番デプロイ - 環境変数はワークフローレベルで定義
      expect(deployProductionWorkflow?.env?.VERCEL_ORG_ID).toBe('${{ secrets.VERCEL_ORG_ID }}');
      expect(deployProductionWorkflow?.env?.VERCEL_PROJECT_ID).toBe(
        '${{ secrets.VERCEL_PROJECT_ID }}',
      );

      // Vercel CLIコマンドでトークンが使用されているか確認
      if (deployPreviewWorkflow?.jobs?.deploy?.steps) {
        const vercelCommand = deployPreviewWorkflow.jobs.deploy.steps.find(
          (step: any) => step.run && step.run.includes('--token=${{ secrets.VERCEL_TOKEN }}'),
        );
        expect(vercelCommand).toBeDefined();
      }

      if (deployProductionWorkflow?.jobs?.deploy?.steps) {
        const vercelCommand = deployProductionWorkflow.jobs.deploy.steps.find(
          (step: any) => step.run && step.run.includes('--token=${{ secrets.VERCEL_TOKEN }}'),
        );
        expect(vercelCommand).toBeDefined();
      }
    });
  });

  describe('Dependabot設定の確認', () => {
    let dependabotConfig: any;

    beforeAll(() => {
      const dependabotPath = path.join(rootDir, '.github', 'dependabot.yml');
      if (fs.existsSync(dependabotPath)) {
        const dependabotContent = fs.readFileSync(dependabotPath, 'utf8');
        dependabotConfig = yaml.load(dependabotContent);
      }
    });

    it('npm更新が週1回に設定されている', () => {
      expect(dependabotConfig).toBeDefined();
      expect(dependabotConfig.version).toBe(2);

      const npmUpdate = dependabotConfig.updates?.find(
        (update: any) => update['package-ecosystem'] === 'npm',
      );
      expect(npmUpdate).toBeDefined();
      expect(npmUpdate.schedule.interval).toBe('weekly');
    });

    it('同時PR数が制限されている', () => {
      const npmUpdate = dependabotConfig.updates?.find(
        (update: any) => update['package-ecosystem'] === 'npm',
      );
      expect(npmUpdate['open-pull-requests-limit']).toBeLessThanOrEqual(3);
    });

    it('グループ化設定がされている', () => {
      const npmUpdate = dependabotConfig.updates?.find(
        (update: any) => update['package-ecosystem'] === 'npm',
      );
      expect(npmUpdate.groups).toBeDefined();
    });
  });

  describe('READMEにバッジが追加されている', () => {
    it('CI/CDステータスバッジが含まれている', () => {
      const readmePath = path.join(rootDir, 'README.md');
      if (fs.existsSync(readmePath)) {
        const readmeContent = fs.readFileSync(readmePath, 'utf8');
        expect(readmeContent).toMatch(/!\[CI\]/i);
        expect(readmeContent).toMatch(/github\.com.*actions.*badge\.svg/);
      }
    });
  });
});
