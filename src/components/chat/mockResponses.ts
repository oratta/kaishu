interface MockResponse {
  patterns: RegExp[]
  responses: string[]
}

const mockResponses: MockResponse[] = [
  {
    patterns: [/目標|ゴール|goal/i],
    responses: [
      '素晴らしい目標ですね！その目標を達成するために、具体的にどのような条件が必要だと思いますか？例えば、期限や測定可能な成果などを設定してみましょう。',
      '目標設定について考えているんですね。**SMART原則**（具体的・測定可能・達成可能・関連性・期限）を使って、より明確な目標にしてみませんか？',
      'その目標を達成したときの自分を想像してみてください。どんな変化がありますか？それを具体的にイメージすることで、モチベーションも上がりますよ。',
    ],
  },
  {
    patterns: [/プロジェクト|project|計画/i],
    responses: [
      '新しいプロジェクトを始めるんですね！まず、**プロジェクトの最終目標**と**主要なマイルストーン**を3つほど設定してみましょう。',
      'プロジェクトを成功させるためには、適切な計画が重要です。このプロジェクトで最も重要な成果物は何でしょうか？それを明確にしてから詳細を詰めていきましょう。',
      'プロジェクトの規模はどのくらいを想定していますか？期間と必要なリソースを考慮して、実現可能な計画を立てていきましょう。',
    ],
  },
  {
    patterns: [/タイムブロック|時間|スケジュール|schedule|time/i],
    responses: [
      'タイムブロッキングは生産性を高める素晴らしい方法です！まず、**最も重要なタスクに最高のエネルギーレベルの時間帯**を割り当てることから始めましょう。',
      '効果的な時間管理のために、1日の中で最も集中できる時間帯はいつですか？その時間を**ディープワーク**に充てると良いでしょう。',
      'スケジュールを組む際は、タスク間に**バッファータイム**を設けることも大切です。予期せぬ中断や休憩時間も考慮に入れましょう。',
    ],
  },
  {
    patterns: [/習慣|habit|ルーティン/i],
    responses: [
      '良い習慣を身につけることは、長期的な成功の鍵です。まずは**小さく始めて、徐々に大きく**していきましょう。どんな習慣を身につけたいですか？',
      '習慣化のコツは、**既存の習慣に新しい習慣を結びつける**ことです。例えば、朝のコーヒーの後に5分間の瞑想を加えるなど。',
      '習慣を継続するためには、進捗を記録することが効果的です。カレンダーにチェックマークをつけるだけでも、モチベーション維持に役立ちます。',
    ],
  },
  {
    patterns: [/タスク|task|やること/i],
    responses: [
      'タスク管理は生産性の基本ですね。**2分ルール**を活用してみませんか？2分以内で終わるタスクは、すぐに片付けてしまいましょう。',
      'タスクの優先順位付けには**アイゼンハワーマトリクス**が便利です。緊急度と重要度で分類して、本当に重要なことに集中しましょう。',
      'タスクを細分化することで、大きな仕事も取り組みやすくなります。まず最初の小さな一歩は何でしょうか？',
    ],
  },
]

const defaultResponses = [
  'なるほど、それについてもう少し詳しく教えていただけますか？',
  'いいアイデアですね！それを実現するために、まず何から始めるのが良いと思いますか？',
  'その考えは素晴らしいです。具体的にどのような成果を期待していますか？',
  'ご質問ありがとうございます。もう少し具体的な状況を教えていただければ、より良いアドバイスができるかもしれません。',
  'それは興味深い視点ですね。他にどのような選択肢を検討されていますか？',
]

export function getMockResponse(userMessage: string): string {
  // Check each mock response pattern
  for (const mockResponse of mockResponses) {
    for (const pattern of mockResponse.patterns) {
      if (pattern.test(userMessage)) {
        // Return a random response from the matching category
        const responses = mockResponse.responses
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }
  }

  // Return a random default response if no pattern matches
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

export function simulateTypingDelay(): Promise<void> {
  // Simulate typing delay between 1-2 seconds
  const delay = 1000 + Math.random() * 1000
  return new Promise((resolve) => setTimeout(resolve, delay))
}
