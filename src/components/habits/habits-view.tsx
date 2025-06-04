
import React from 'react';
import { RotateCcw, Flame, Trophy, BarChart3, Bell, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function HabitsView() {
  const todayHabits = [
    {
      id: 1,
      name: '英語単語10個',
      completed: true,
      streak: 15,
      icon: '📚'
    },
    {
      id: 2,
      name: 'ランニング30分',
      completed: false,
      inProgress: true,
      streak: 8,
      icon: '🏃'
    },
    {
      id: 3,
      name: '禁煙継続',
      completed: true,
      streak: 45,
      icon: '🚭'
    },
    {
      id: 4,
      name: '水2L摂取',
      completed: false,
      streak: 3,
      icon: '💧'
    }
  ];

  const weeklyProgress = [
    { habit: '英語学習', days: [true, true, true, true, true, true, false], completed: 6, total: 7 },
    { habit: '運動', days: [true, false, true, true, true, true, false], completed: 5, total: 7 },
    { habit: '禁煙', days: [true, true, true, true, true, true, true], completed: 7, total: 7 },
    { habit: '水分補給', days: [true, true, false, true, true, false, false], completed: 4, total: 7 }
  ];

  const achievements = [
    { name: '学習マスター', icon: '📚', description: '30日連続学習達成' },
    { name: '健康戦士', icon: '💪', description: '運動習慣確立' },
    { name: '禁煙ヒーロー', icon: '🚭', description: '禁煙30日達成' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          習慣管理
        </h1>
        <p className="text-gray-600">
          継続的な習慣で目標達成をサポートします
        </p>
      </div>

      {/* 今日の習慣 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-kaishu-600" />
            今日の習慣
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayHabits.map((habit) => (
              <div 
                key={habit.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  habit.completed 
                    ? 'border-green-200 bg-green-50' 
                    : habit.inProgress 
                    ? 'border-blue-200 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-kaishu-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{habit.icon}</span>
                    <div>
                      <h3 className="font-medium">{habit.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span>連続{habit.streak}日</span>
                        {habit.streak >= 30 && <span className="text-orange-500">🔥</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {habit.completed && (
                      <Badge className="bg-green-100 text-green-800">✅完了</Badge>
                    )}
                    {habit.inProgress && (
                      <Badge className="bg-blue-100 text-blue-800">⏳実行中</Badge>
                    )}
                    {!habit.completed && !habit.inProgress && (
                      <Badge variant="outline">⚪未実行</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 週間進捗 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-kaishu-600" />
            週間進捗
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-8 gap-2 text-xs text-gray-500 mb-2">
              <div></div>
              <div className="text-center">月</div>
              <div className="text-center">火</div>
              <div className="text-center">水</div>
              <div className="text-center">木</div>
              <div className="text-center">金</div>
              <div className="text-center">土</div>
              <div className="text-center">日</div>
            </div>
            {weeklyProgress.map((habit, index) => (
              <div key={index} className="grid grid-cols-8 gap-2 items-center">
                <div className="text-sm font-medium">{habit.habit}</div>
                {habit.days.map((completed, dayIndex) => (
                  <div key={dayIndex} className="flex justify-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {completed ? '✅' : '❌'}
                    </div>
                  </div>
                ))}
                <div className="text-sm text-gray-600 ml-2">
                  {habit.completed}/{habit.total}日
                  {habit.completed === habit.total && (
                    <span className="text-green-600 font-semibold ml-1">Perfect!</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* ストリーク & 実績 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-kaishu-600" />
              ストリーク & 実績
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">🥇 最長ストリーク:</span>
                <span className="font-semibold">禁煙 45日</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">🔥 現在の記録:</span>
                <span className="font-semibold">英語学習 15日</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">🎯 今月の成功率:</span>
                <span className="font-semibold text-green-600">87%</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">🏅 バッジ</h4>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement, index) => (
                  <Badge key={index} variant="outline" className="p-2">
                    <span className="mr-1">{achievement.icon}</span>
                    {achievement.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 分析 & 提案 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-kaishu-600" />
              分析 & 提案
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-kaishu-50 border border-kaishu-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🤖</span>
                  <p className="text-sm text-kaishu-800">
                    水分補給の成功率が低下しています。リマインダーを
                    午前10時と午後3時に設定することを提案します。
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">成功率推移</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>英語学習</span>
                    <span>86%</span>
                  </div>
                  <Progress value={86} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>運動</span>
                    <span>71%</span>
                  </div>
                  <Progress value={71} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>水分補給</span>
                    <span>57%</span>
                  </div>
                  <Progress value={57} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* アクションボタン */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline">
          <BarChart3 className="h-4 w-4 mr-2" />
          詳細分析
        </Button>
        <Button variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          リマインダー設定
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新しい習慣
        </Button>
      </div>
    </div>
  );
}
