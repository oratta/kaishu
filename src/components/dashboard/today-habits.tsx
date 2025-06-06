
import React from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function TodayHabits() {
  const todayHabits = [
    {
      id: 1,
      name: '英語学習',
      completed: false,
      streak: 15,
      icon: '📚'
    },
    {
      id: 2,
      name: 'ランニング',
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
      name: '水分摂取',
      completed: false,
      streak: 3,
      icon: '💧'
    },
    {
      id: 5,
      name: '読書',
      completed: true,
      streak: 12,
      icon: '📖'
    },
    {
      id: 6,
      name: '瞑想',
      completed: false,
      streak: 7,
      icon: '🧘'
    },
    {
      id: 7,
      name: '筋トレ',
      completed: false,
      streak: 5,
      icon: '💪'
    },
    {
      id: 8,
      name: '早寝',
      completed: false,
      streak: 2,
      icon: '🌙'
    }
  ];

  const handleHabitToggle = (habitId: number) => {
    console.log(`Toggling habit ${habitId}`);
    // TODO: 習慣の状態を更新する処理
  };

  const completedCount = todayHabits.filter(h => h.completed).length;
  const totalCount = todayHabits.length;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-kaishu-600" />
            今日の習慣
          </div>
          <span className="text-sm font-normal text-kaishu-600">
            {completedCount}/{totalCount}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {todayHabits.map((habit) => (
          <div 
            key={habit.id}
            className={`flex items-center justify-between p-2 rounded-md transition-all ${
              habit.completed 
                ? 'bg-green-50 border border-green-200' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-sm">{habit.icon}</span>
              <span className={`text-sm font-medium truncate ${
                habit.completed ? 'line-through text-gray-500' : ''
              }`}>
                {habit.name}
              </span>
              <span className="text-xs text-gray-400 shrink-0">
                {habit.streak}日
              </span>
            </div>
            <Button
              size="sm"
              variant={habit.completed ? "secondary" : "outline"}
              onClick={() => handleHabitToggle(habit.id)}
              className="h-6 w-6 p-0 ml-2 shrink-0"
            >
              <Check className={`h-3 w-3 ${
                habit.completed ? 'text-green-600' : 'text-gray-400'
              }`} />
            </Button>
          </div>
        ))}

        <div className="pt-2 border-t border-gray-100">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-kaishu-600 h-1.5 rounded-full transition-all"
              style={{ 
                width: `${(completedCount / totalCount) * 100}%` 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
