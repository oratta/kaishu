export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📊 プロジェクト管理</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">📋 プロジェクト一覧</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4">プロジェクト名</th>
                <th className="text-left py-3 px-4">週目標</th>
                <th className="text-left py-3 px-4">実績</th>
                <th className="text-left py-3 px-4">達成率</th>
                <th className="text-left py-3 px-4">ステータス</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-4">英語能力向上</td>
                <td className="py-3 px-4">10h</td>
                <td className="py-3 px-4">8h</td>
                <td className="py-3 px-4">80%</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    🟢 順調
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-4">運動習慣確立</td>
                <td className="py-3 px-4">5h</td>
                <td className="py-3 px-4">6h</td>
                <td className="py-3 px-4">120%</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    🔵 超過達成
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-4">Web開発学習</td>
                <td className="py-3 px-4">15h</td>
                <td className="py-3 px-4">9h</td>
                <td className="py-3 px-4">60%</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    🟡 要調整
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">家族時間確保</td>
                <td className="py-3 px-4">8h</td>
                <td className="py-3 px-4">8h</td>
                <td className="py-3 px-4">100%</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    🟢 達成
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium mb-2">🤖 LLMインサイト</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            「Web開発の時間確保のため、明日の英語学習時間を30分短縮することを提案します」
          </p>
        </div>
      </div>
    </div>
  )
}