
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');

  // サンプルイベントデータ
  const events = [
    {
      id: 1,
      title: '英語学習',
      startTime: '09:00',
      endTime: '10:00',
      date: '2025-01-20',
      type: 'project',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Web開発作業',
      startTime: '10:30',
      endTime: '12:00',
      date: '2025-01-20',
      type: 'project',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: '昼食',
      startTime: '12:00',
      endTime: '13:00',
      date: '2025-01-20',
      type: 'break',
      color: 'bg-gray-400'
    },
    {
      id: 4,
      title: 'ミーティング',
      startTime: '14:00',
      endTime: '15:00',
      date: '2025-01-20',
      type: 'meeting',
      color: 'bg-red-500'
    },
    {
      id: 5,
      title: '運動',
      startTime: '18:00',
      endTime: '19:00',
      date: '2025-01-20',
      type: 'habit',
      color: 'bg-purple-500'
    }
  ];

  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8); // 8:00 - 21:00

  const formatTime = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const getEventsForTimeSlot = (hour: number, date: string) => {
    return events.filter(event => {
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return eventHour === hour && event.date === date;
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          カレンダー
        </h1>
        <p className="text-gray-600">
          時間ブロックとスケジュールを管理します
        </p>
      </div>

      {/* カレンダーヘッダー */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-kaishu-600" />
              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
            </CardTitle>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* 表示切替 */}
              <div className="flex gap-1">
                <Button 
                  size="sm" 
                  variant={view === 'day' ? 'default' : 'outline'}
                  onClick={() => setView('day')}
                >
                  日
                </Button>
                <Button 
                  size="sm" 
                  variant={view === 'week' ? 'default' : 'outline'}
                  onClick={() => setView('week')}
                >
                  週
                </Button>
                <Button 
                  size="sm" 
                  variant={view === 'month' ? 'default' : 'outline'}
                  onClick={() => setView('month')}
                >
                  月
                </Button>
              </div>
              
              {/* ナビゲーション */}
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => navigateDate('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setCurrentDate(new Date())}>
                  今日
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigateDate('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {/* アクション */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="hidden sm:inline-flex">
                  <Settings className="h-4 w-4 mr-2" />
                  設定
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-0 sm:mr-2" />
                  <span className="hidden sm:inline">イベント追加</span>
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 週間ビュー */}
      {view === 'week' && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto md:overflow-x-visible">
              <div className="min-w-[600px] md:min-w-0">
                {/* 曜日ヘッダー */}
                <div className="grid grid-cols-8 border-b">
                  <div className="p-4 border-r bg-gray-50"></div>
                  {getWeekDates().map((date, index) => (
                    <div key={index} className="p-4 text-center border-r bg-gray-50">
                      <div className="text-sm text-gray-600">{weekDays[date.getDay()]}</div>
                      <div className={`text-lg font-semibold ${
                        date.toDateString() === new Date().toDateString() 
                          ? 'text-kaishu-600' 
                          : 'text-gray-900'
                      }`}>
                        {date.getDate()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 時間スロット */}
                <div className="max-h-[600px] overflow-y-auto">
                  {timeSlots.map((hour) => (
                    <div key={hour} className="grid grid-cols-8 border-b hover:bg-gray-50">
                      {/* 時間ラベル */}
                      <div className="p-2 border-r bg-gray-50 text-sm text-gray-600 text-center">
                        {formatTime(hour)}
                      </div>
                      
                      {/* 各日のスロット */}
                      {getWeekDates().map((date, dayIndex) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const eventsInSlot = getEventsForTimeSlot(hour, dateStr);
                        
                        return (
                          <div key={dayIndex} className="p-1 border-r min-h-[60px] relative">
                            {eventsInSlot.map((event) => (
                              <div
                                key={event.id}
                                className={`${event.color} text-white text-xs p-2 rounded mb-1 cursor-pointer hover:opacity-80 transition-opacity`}
                              >
                                <div className="font-medium">{event.title}</div>
                                <div className="opacity-75">
                                  {event.startTime} - {event.endTime}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* サイドバー - 今日の予定 */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">今日の予定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events
                .filter(event => event.date === new Date().toISOString().split('T')[0])
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-gray-600">
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type === 'project' ? 'プロジェクト' :
                       event.type === 'habit' ? '習慣' :
                       event.type === 'meeting' ? '会議' : '休憩'}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* 統計情報 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">週間統計</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-kaishu-600">32h</div>
                <div className="text-xs text-gray-600">今週の計画時間</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">28h</div>
                <div className="text-xs text-gray-600">実行時間</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">87%</div>
                <div className="text-xs text-gray-600">達成率</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">15</div>
                <div className="text-xs text-gray-600">完了タスク</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
