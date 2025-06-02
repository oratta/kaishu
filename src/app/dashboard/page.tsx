export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">📅 今日のカレンダー</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <span>09:00 ▶ 英語学習</span>
              <span className="text-sm text-gray-500">1時間</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <span>10:00 開発作業</span>
              <span className="text-sm text-gray-500">2時間</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <span>12:00 昼食</span>
              <span className="text-sm text-gray-500">1時間</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">📝 現在のプロジェクトタスク</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input type="checkbox" checked className="rounded" readOnly />
              <span className="line-through text-gray-500">単語帳アプリ起動 (15分)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded animate-pulse"></div>
              <span className="font-medium">🔵 文法練習 (30分) ← 実行中</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
              <span>⚪ リスニング (15分)</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h3 className="font-medium mb-2">⏱️ 進行中: 文法練習</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              経過時間: 12分 / 目標30分
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '40%'}}></div>
            </div>
            <div className="text-sm text-gray-500 mt-1">進捗: 40%</div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">📋 プロジェクトメモ</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <div>- 今日は発音に重点を置く</div>
              <div>- 次回は過去形の復習</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}