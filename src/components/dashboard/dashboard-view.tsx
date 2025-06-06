
import React from 'react';
import { TimeBlockCalendar } from './time-block-calendar';
import { CurrentTasks } from './current-tasks';
import { ProjectNotes } from './project-notes';
import { TodayHabits } from './today-habits';

export function DashboardView() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ダッシュボード
        </h1>
        <p className="text-gray-600">
          今日の進捗と予定を確認しましょう
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Left Column - Calendar */}
        <div className="lg:col-span-2">
          <TimeBlockCalendar />
        </div>

        {/* Right Column - Tasks and Habits */}
        <div className="space-y-6">
          <div className="h-1/3">
            <CurrentTasks />
          </div>
          <div className="h-1/3">
            <TodayHabits />
          </div>
          <div className="h-1/3">
            <ProjectNotes />
          </div>
        </div>
      </div>
    </div>
  );
}
