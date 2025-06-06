
import React from 'react';
import { RotateCcw, Check, X, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function TodayHabits() {
  const todayHabits = [
    {
      id: 1,
      name: '英語単語10個',
      completed: false,
      streak: 15,
      icon: '📚'
    },
    {
      id: 2,
      name: 'ランニング30分',
      completed: false,
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

  const handleHabitToggle = (habitId: number) => {
    console.log(`Toggling habit ${habitId}`);
    // TODO: 習慣の状態を更新する処理
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-kaishu-600" />
          今日の習慣
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todayHabits.map((habit) => (
            <div 
              key={habit.id}
              className={`p-3 rounded-lg border transition-all ${
                habit.completed 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-white hover:border-kaishu-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{habit.icon}</span>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${
                      habit.completed ? 'line-through text-gray-500' : ''
                    }`}>
                      {habit.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Flame className="h-3 w-3 text-orange-500" />
                      <span>連続{habit.streak}日</span>
                      {habit.streak >= 30 && <span className="text-orange-500">🔥</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {habit.completed ? (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      ✅完了
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleHabitToggle(habit.id)}
                      className="h-8 px-3"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      完了
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">今日の進捗</span>
            <span className="font-semibold text-kaishu-600">
              {todayHabits.filter(h => h.completed).length}/{todayHabits.length}完了
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-kaishu-600 h-2 rounded-full transition-all"
              style={{ 
                width: `${(todayHabits.filter(h => h.completed).length / todayHabits.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
