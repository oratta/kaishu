
import React, { useState } from 'react';
import { 
  Home, 
  FolderOpen, 
  CheckSquare, 
  RotateCcw, 
  Calendar,
  Settings,
  User,
  BarChart3,
  Loader2
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
  const [loadingView, setLoadingView] = useState<string | null>(null);

  const handleNavigation = (viewId: string) => {
    if (viewId === currentView) return;
    
    setLoadingView(viewId);
    // Simulate navigation delay
    setTimeout(() => {
      setCurrentView(viewId);
      setLoadingView(null);
    }, 200);
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col hidden md:flex">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-kaishu-500 to-kaishu-700 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">改</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">KAISHU</h1>
            <p className="text-xs text-gray-500">Life Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4" role="navigation" aria-label="メインナビゲーション">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = currentView === item.id;
            const isLoading = loadingView === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-10 relative transition-all duration-200",
                  "hover:bg-gray-100 hover:text-gray-900",
                  "focus:outline-none focus:ring-2 focus:ring-kaishu-500 focus:ring-offset-2",
                  "active:scale-[0.98]",
                  isActive && [
                    "bg-kaishu-100 text-kaishu-700 hover:bg-kaishu-100",
                    "border-l-4 border-kaishu-500 pl-3",
                    "font-medium shadow-sm"
                  ]
                )}
                onClick={() => handleNavigation(item.id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <item.icon className={cn(
                    "h-4 w-4 transition-colors",
                    isActive && "text-kaishu-600"
                  )} />
                )}
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-kaishu-500 rounded-full" />
                  )}
                </span>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Bottom items */}
      <div className="p-4 border-t border-gray-100">
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-10 text-gray-600",
                "hover:bg-gray-100 hover:text-gray-900 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-kaishu-500 focus:ring-offset-2",
                "active:scale-[0.98]"
              )}
              aria-label={item.label}
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
