
import React from 'react';
import { 
  Home, 
  FolderOpen, 
  CheckSquare, 
  RotateCcw, 
  Calendar,
  Settings,
  User,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

const navigationItems = [
  { id: 'dashboard', label: 'ダッシュボード', icon: Home },
  { id: 'projects', label: 'プロジェクト', icon: FolderOpen },
  { id: 'tasks', label: 'タスク', icon: CheckSquare },
  { id: 'habits', label: '習慣', icon: RotateCcw },
  { id: 'calendar', label: 'カレンダー', icon: Calendar },
] as const;

const bottomItems = [
  { id: 'analytics', label: '分析', icon: BarChart3 },
  { id: 'settings', label: '設定', icon: Settings },
  { id: 'profile', label: 'プロフィール', icon: User },
];

export function Sidebar() {
  const { currentView, setCurrentView } = useAppStore();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-kaishu-500 to-kaishu-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">改</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">KAISHU</h1>
            <p className="text-xs text-gray-500">Life Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-10",
                currentView === item.id && "bg-kaishu-50 text-kaishu-700 border border-kaishu-200"
              )}
              onClick={() => setCurrentView(item.id)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Bottom items */}
      <div className="p-4 border-t border-gray-100">
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start gap-3 h-10 text-gray-600 hover:text-gray-900"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
