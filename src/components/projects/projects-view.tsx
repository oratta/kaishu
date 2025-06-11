
import React from 'react';
import { FolderOpen, Clock, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export function ProjectsView() {
  const projects = [
    {
      id: 1,
      name: '英語能力向上',
      type: 'learning',
      weeklyTarget: 10,
      actualHours: 8,
      completion: 80,
      status: '順調',
      color: 'bg-green-500'
    },
    {
      id: 2,
      name: '運動習慣確立',
      type: 'health',
      weeklyTarget: 5,
      actualHours: 6,
      completion: 120,
      status: '超過達成',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Web開発学習',
      type: 'learning',
      weeklyTarget: 15,
      actualHours: 9,
      completion: 60,
      status: '要調整',
      color: 'bg-kaishu-500'
    },
    {
      id: 4,
      name: '家族時間確保',
      type: 'relationship',
      weeklyTarget: 8,
      actualHours: 8,
      completion: 100,
      status: '達成',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          プロジェクト管理
        </h1>
        <p className="text-gray-600">
          目標達成に向けたプロジェクトの進捗を管理します
        </p>
      </div>

      {/* プロジェクト一覧テーブル */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-kaishu-600" />
            プロジェクト一覧
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">プロジェクト名</th>
                  <th className="text-left py-3 px-4">週目標</th>
                  <th className="text-left py-3 px-4">実績</th>
                  <th className="text-left py-3 px-4">達成率</th>
                  <th className="text-left py-3 px-4">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="py-3 px-4 font-medium">{project.name}</td>
                    <td className="py-3 px-4">{project.weeklyTarget}h</td>
                    <td className="py-3 px-4">{project.actualHours}h</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress value={project.completion} className="w-20" />
                        <span className="text-sm">{project.completion}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={project.completion >= 100 ? "default" : project.completion >= 80 ? "secondary" : "outline"}
                        className={project.completion >= 100 ? "bg-green-100 text-green-800" : 
                                 project.completion >= 80 ? "bg-blue-100 text-blue-800" : 
                                 "bg-amber-100 text-amber-800"}
                      >
                        {project.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 時間配分グラフ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-kaishu-600" />
              目標配分
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                    <span className="text-sm">{project.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round((project.weeklyTarget / 38) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-kaishu-600" />
              実績配分
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                    <span className="text-sm">{project.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round((project.actualHours / 31) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* LLMインサイト */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-kaishu-600" />
            LLMインサイト
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-kaishu-50 border border-kaishu-200 rounded-lg p-4">
            <p className="text-sm text-kaishu-800">
              運動習慣が予想以上に順調です。Web開発の時間を確保するため、
              明日の英語学習時間を30分短縮することを提案します。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
