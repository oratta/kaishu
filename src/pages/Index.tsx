
import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardView } from '@/components/dashboard/dashboard-view';
import { FloatingLLMChat } from '@/components/ui/floating-llm-chat';
import { useAppStore } from '@/lib/store';

const Index = () => {
  const { currentView } = useAppStore();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'projects':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">プロジェクト管理</h1>
            <p className="text-gray-600">プロジェクト管理機能は次のバージョンで実装予定です。</p>
          </div>
        );
      case 'tasks':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">タスク管理</h1>
            <p className="text-gray-600">タスク管理機能は次のバージョンで実装予定です。</p>
          </div>
        );
      case 'habits':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">習慣管理</h1>
            <p className="text-gray-600">習慣管理機能は次のバージョンで実装予定です。</p>
          </div>
        );
      case 'calendar':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">カレンダー</h1>
            <p className="text-gray-600">カレンダー機能は次のバージョンで実装予定です。</p>
          </div>
        );
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
