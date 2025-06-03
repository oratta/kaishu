'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { ProjectList } from '@/components/projects'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockProjects = [
  {
    id: '1',
    name: '英語能力向上',
    type: 'learning' as const,
    status: 'active' as const,
    weeklyTargetHours: 10,
    weeklyActualHours: 8,
    progressRate: 80,
    lastUpdated: new Date('2024-06-01'),
  },
  {
    id: '2',
    name: '運動習慣確立',
    type: 'health' as const,
    status: 'active' as const,
    weeklyTargetHours: 5,
    weeklyActualHours: 6,
    progressRate: 120,
    lastUpdated: new Date('2024-06-02'),
  },
  {
    id: '3',
    name: 'Web開発学習',
    type: 'learning' as const,
    status: 'active' as const,
    weeklyTargetHours: 15,
    weeklyActualHours: 9,
    progressRate: 60,
    lastUpdated: new Date('2024-05-30'),
  },
  {
    id: '4',
    name: '家族時間確保',
    type: 'relationship' as const,
    status: 'active' as const,
    weeklyTargetHours: 8,
    weeklyActualHours: 8,
    progressRate: 100,
    lastUpdated: new Date('2024-06-02'),
  },
  {
    id: '5',
    name: '読書習慣',
    type: 'hobby' as const,
    status: 'paused' as const,
    weeklyTargetHours: 5,
    weeklyActualHours: 2,
    progressRate: 40,
    lastUpdated: new Date('2024-05-25'),
  },
  {
    id: '6',
    name: '副業プロジェクト',
    type: 'work' as const,
    status: 'planned' as const,
    weeklyTargetHours: 10,
    weeklyActualHours: 0,
    progressRate: 0,
    lastUpdated: new Date('2024-05-20'),
  },
]

export default function Projects() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">📊 プロジェクト管理</h1>
          <p className="text-muted-foreground">
            人生目標達成のためのプロジェクトを管理します
          </p>
        </div>

        <ProjectList projects={mockProjects} />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🤖</span>
              LLMインサイト
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              「Web開発の時間確保のため、明日の英語学習時間を30分短縮することを提案します。
              運動習慣は良好に維持されているので、このペースを継続してください。」
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
