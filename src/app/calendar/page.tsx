export default function Calendar() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📅 週間タイムブロック</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">2025年1月6日〜1月12日の週</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr>
                <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-700">時間</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-700">月</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-700">火</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-700">水</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-700">木</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-700">金</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-700">土</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-700">日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-2 font-medium">07:00</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-blue-100 dark:bg-blue-900/30">英語学習</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-blue-100 dark:bg-blue-900/30">英語学習</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-blue-100 dark:bg-blue-900/30">英語学習</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-blue-100 dark:bg-blue-900/30">英語学習</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-blue-100 dark:bg-blue-900/30">英語学習</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
                <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-2 font-medium">10:00</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-green-100 dark:bg-green-900/30">開発作業</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-green-100 dark:bg-green-900/30">開発作業</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-green-100 dark:bg-green-900/30">開発作業</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-green-100 dark:bg-green-900/30">開発作業</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-green-100 dark:bg-green-900/30">開発作業</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-green-100 dark:bg-green-900/30">開発作業</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-2 font-medium">13:00</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700">休憩</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700">休憩</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700">休憩</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700">休憩</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700">休憩</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700">休憩</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700">休憩</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium mb-2">💬 LLM提案</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            「朝の時間を英語学習に、午前中のピーク時間を開発作業に割り当てました。土曜日は開発の追加時間、日曜日は完全な休息日としています。」
          </p>
          <div className="mt-4 space-x-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              ✓ 承認
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              🔄 修正依頼
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              💬 詳細相談
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}