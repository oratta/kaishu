
import React from 'react';
import { Calendar, Clock, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const mockTimeBlocks = [
  {
    id: '1',
    title: '英語学習',
    projectType: 'learning',
    startTime: '09:00',
    endTime: '10:00',
    status: 'completed' as const,
    progress: 100
  },
  {
    id: '2',
    title: 'Web開発学習',
    projectType: 'learning',
    startTime: '10:00',
    endTime: '12:00',
    status: 'in_progress' as const,
    progress: 65
  },
  {
    id: '3',
    title: '昼食・休憩',
    projectType: 'other',
    startTime: '12:00',
    endTime: '13:00',
    status: 'scheduled' as const,
    progress: 0
  },
  {
    id: '4',
    title: 'プロジェクト開発',
    projectType: 'work',
    startTime: '13:00',
    endTime: '15:00',
    status: 'scheduled' as const,
    progress: 0
  },
  {
    id: '5',
    title: '運動・ストレッチ',
    projectType: 'health',
    startTime: '15:00',
    endTime: '16:00',
    status: 'scheduled' as const,
    progress: 0
  }
];

const projectTypeColors = {
  learning: 'bg-blue-500',
  health: 'bg-green-500',
  work: 'bg-purple-500',
  hobby: 'bg-orange-500',
  relationship: 'bg-pink-500',
  other: 'bg-gray-500'
};

const statusColors = {
  completed: 'border-green-500 bg-green-50',
  in_progress: 'border-kaishu-500 bg-kaishu-50',
  scheduled: 'border-gray-300 bg-white'
};

export function TimeBlockCalendar() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;

  const isCurrentTimeBlock = (startTime: string, endTime: string) => {
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    return currentHour >= start && currentHour < end;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-kaishu-600" />
          今日のカレンダー
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTimeBlocks.map((block) => {
          const isCurrent = isCurrentTimeBlock(block.startTime, block.endTime);
          
          return (
            <div
              key={block.id}
              className={cn(
                "p-3 rounded-lg border-2 transition-all duration-300",
                statusColors[block.status],
                isCurrent && "ring-2 ring-kaishu-400 ring-offset-2"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", projectTypeColors[block.projectType as keyof typeof projectTypeColors])} />
                  <span className="font-medium text-sm">{block.title}</span>
                  {isCurrent && (
                    <Badge variant="secondary" className="bg-kaishu-100 text-kaishu-700 text-xs">
                      実行中
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {block.startTime} - {block.endTime}
                </div>
              </div>

              {block.status === 'in_progress' && (
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>進捗</span>
                    <span>{block.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-kaishu-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${block.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {isCurrent && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Pause className="h-3 w-3 mr-1" />
                    一時停止
                  </Button>
                  <Button size="sm" className="flex-1 bg-kaishu-600 hover:bg-kaishu-700">
                    <Play className="h-3 w-3 mr-1" />
                    続行
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
