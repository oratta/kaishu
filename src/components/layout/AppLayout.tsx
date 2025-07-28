import React from 'react'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout min-h-screen bg-gray-50">
      <header role="banner" className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-primary">KAISHU</h1>
            </div>
            <nav role="navigation" className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">
                ダッシュボード
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">
                目標設定
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">
                カレンダー
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">
                進捗
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="flex-1">
        {children}
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 KAISHU. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}