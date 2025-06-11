
import React, { useState } from 'react';
import { CheckSquare, Clock, Plus, Lightbulb, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function TasksView() {
  const [viewMode, setViewMode] = useState('kanban');

  const taskData = {
    '英語能力向上': {
      todo: [
        { id: 1, title: '文法練習', duration: 30, priority: 2 },
        { id: 2, title: '英作文', duration: 20, priority: 3 }
      ],
      doing: [
        { id: 3, title: 'リスニング', duration: 45, priority: 1, progress: 60 }
      ],
      done: [
        { id: 4, title: '単語帳100語', duration: 25 },
        { id: 5, title: '発音練習', duration: 15 },
        { id: 6, title: '英作文5題', duration: 30 }
      ]
    },
    'Web開発学習': {
      todo: [
        { id: 7, title: 'React復習', duration: 90, priority: 1 },
        { id: 8, title: 'API実装', duration: 120, priority: 2 }
      ],
      doing: [],
      done: [
        { id: 9, title: 'JavaScript基礎', duration: 60 },
        { id: 10, title: 'HTML/CSS復習', duration: 45 }
      ]
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-100 text-red-800';
      case 2: return 'bg-kaishu-100 text-kaishu-800';
      case 3: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1: return '高';
      case 2: return '中';
      case 3: return '低';
      default: return '普通';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          タスク管理
        </h1>
        <p className="text-gray-600">
          プロジェクトのタスクを効率的に管理します
        </p>
      </div>

      {/* フィルターと表示切替 */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Select defaultValue="all-projects">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="プロジェクト選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-projects">すべてのプロジェクト</SelectItem>
            <SelectItem value="english">英語能力向上</SelectItem>
            <SelectItem value="web-dev">Web開発学習</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-status">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="ステータス選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">すべてのステータス</SelectItem>
            <SelectItem value="todo">TODO</SelectItem>
            <SelectItem value="doing">DOING</SelectItem>
            <SelectItem value="done">DONE</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="this-week">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="期間" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">今週</SelectItem>
            <SelectItem value="this-month">今月</SelectItem>
            <SelectItem value="all">すべて</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2 ml-auto">
          <Button 
            variant={viewMode === 'kanban' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('kanban')}
          >
            📌 カンバン
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('list')}
          >
            📋 リスト
          </Button>
        </div>
      </div>

      {/* カンバンビュー */}
      {viewMode === 'kanban' && (
        <div className="space-y-8">
          {Object.entries(taskData).map(([projectName, tasks]) => (
            <Card key={projectName}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-kaishu-600" />
                  {projectName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* TODO列 */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">TODO</h3>
                    {tasks.todo.map((task) => (
                      <Card key={task.id} className="p-3 border-l-4 border-l-red-400 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <Badge className={getPriorityColor(task.priority)} variant="outline">
                              {getPriorityText(task.priority)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {task.duration}分
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* DOING列 */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">DOING</h3>
                    {tasks.doing.map((task) => (
                      <Card key={task.id} className="p-3 border-l-4 border-l-blue-400 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-blue-600">実行中</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {task.duration}分
                          </div>
                          {task.progress && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-400 h-2 rounded-full transition-all" 
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* DONE列 */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">DONE</h3>
                    {tasks.done.map((task) => (
                      <Card key={task.id} className="p-3 border-l-4 border-l-green-400 hover:shadow-md transition-shadow cursor-pointer opacity-75">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm line-through text-gray-600">{task.title}</h4>
                            <span className="text-xs text-green-600">✅</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {task.duration}分
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* アクションボタン */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Button size="sm" variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          一括編集
        </Button>
        <Button size="sm" variant="outline">
          <Lightbulb className="h-4 w-4 mr-2" />
          LLMタスク生成
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          クイック追加
        </Button>
      </div>
    </div>
  );
}
