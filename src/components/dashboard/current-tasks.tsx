
import React from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockTasks = [
  {
    id: '1',
    title: 'React Hooksの復習',
    estimatedDuration: 30,
    status: 'completed' as const,
    project: 'Web開発学習'
  },
  {
    id: '2',
    title: 'TypeScript型定義の練習',
    estimatedDuration: 45,
    status: 'in_progress' as const,
    project: 'Web開発学習',
    progress: 65
  },
  {
    id: '3',
    title: 'API連携の実装',
    estimatedDuration: 60,
    status: 'todo' as const,
    project: 'Web開発学習'
  },
  {
    id: '4',
    title: 'プロジェクトドキュメント作成',
    estimatedDuration: 30,
    status: 'todo' as const,
    project: 'Web開発学習'
  }
];

export function CurrentTasks() {
  const handleTaskStart = (taskId: string) => {
    console.log('Starting task:', taskId);
  };

  const handleTaskComplete = (taskId: string) => {
    console.log('Completing task:', taskId);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-kaishu-600" />
          現在のプロジェクトタスク
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "p-3 rounded-lg border transition-all duration-200",
              task.status === 'completed' && "bg-green-50 border-green-200",
              task.status === 'in_progress' && "bg-kaishu-50 border-kaishu-200 ring-1 ring-kaishu-200",
              task.status === 'todo' && "bg-white border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => task.status === 'todo' ? handleTaskStart(task.id) : handleTaskComplete(task.id)}
                className="mt-0.5"
              >
                {task.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : task.status === 'in_progress' ? (
                  <div className="h-5 w-5 rounded-full border-2 border-kaishu-600 bg-kaishu-100 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-kaishu-600 animate-pulse" />
                  </div>
                ) : (
                  <Circle className="h-5 w-5 text-gray-400 hover:text-kaishu-600 transition-colors" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={cn(
                    "font-medium text-sm",
                    task.status === 'completed' && "line-through text-gray-500",
                    task.status === 'in_progress' && "text-kaishu-900"
                  )}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {task.estimatedDuration}分
                  </div>
                </div>

                <div className="text-xs text-gray-600 mb-2">
                  {task.project}
                </div>

                {task.status === 'in_progress' && task.progress && (
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>進捗</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-kaishu-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {task.status === 'in_progress' && (
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      一時停止
                    </Button>
                    <Button size="sm" className="text-xs h-7 bg-kaishu-600 hover:bg-kaishu-700">
                      完了
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-gray-100">
          <Button variant="ghost" className="w-full text-sm text-kaishu-600 hover:text-kaishu-700">
            すべてのタスクを表示
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
