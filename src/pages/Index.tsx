
import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardView } from '@/components/dashboard/dashboard-view';
import { ProjectsView } from '@/components/projects/projects-view';
import { TasksView } from '@/components/tasks/tasks-view';
import { HabitsView } from '@/components/habits/habits-view';
import { CalendarView } from '@/components/calendar/calendar-view';
import { FloatingLLMChat } from '@/components/ui/floating-llm-chat';
import { useAppStore } from '@/lib/store';

const Index = () => {
  const { currentView } = useAppStore();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'projects':
        return <ProjectsView />;
      case 'tasks':
        return <TasksView />;
      case 'habits':
        return <HabitsView />;
      case 'calendar':
        return <CalendarView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {renderCurrentView()}
      </main>
      <FloatingLLMChat />
    </div>
  );
};

export default Index;
