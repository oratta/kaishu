import { MainLayout } from '@/components/layout/MainLayout'

export default function Settings() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">⚙️ 設定</h1>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">プロフィール設定</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">ユーザー名</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  placeholder="あなたの名前"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">タイムゾーン</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                  <option>Asia/Tokyo</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">システム設定</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>ダークモード</span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <span>通知</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>週の開始日</span>
                <select className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700">
                  <option>月曜日</option>
                  <option>日曜日</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">LLM設定</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">使用モデル</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                  <option>GPT-4o</option>
                  <option>Claude 3.5 Sonnet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">応答スタイル</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                  <option>親しみやすい</option>
                  <option>フォーマル</option>
                  <option>簡潔</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
