import { AppLayout } from '@/components/layout/AppLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { CalendarIcon, ClockIcon, PlayIcon, PauseIcon } from 'lucide-react'

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* ヘッダーセクション */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
              <p className="text-muted-foreground mt-2">今日のタイムブロックとタスクの進捗を確認</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ClockIcon className="w-4 h-4 mr-2" />
                タイマー開始
              </Button>
              <Button size="sm">
                <PlayIcon className="w-4 h-4 mr-2" />
                LLMセッション
              </Button>
            </div>
          </div>

          {/* メトリクスカード */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">今日の進捗</p>
                    <p className="text-2xl font-bold">3/5</p>
                  </div>
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">作業時間</p>
                    <p className="text-2xl font-bold">4.5h</p>
                  </div>
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">完了タスク</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <span className="text-success text-sm font-bold">✓</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">週間達成率</p>
                    <p className="text-2xl font-bold">82%</p>
                  </div>
                  <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                    <span className="text-warning text-sm font-bold">📊</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 今日のカレンダー */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  今日のタイムブロック
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <div>
                        <p className="font-medium">09:00 ▶ 英語学習</p>
                        <p className="text-sm text-muted-foreground">基礎固めフェーズ</p>
                      </div>
                    </div>
                    <Badge variant="secondary">1時間</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                      <div>
                        <p className="font-medium">10:00 開発作業</p>
                        <p className="text-sm text-muted-foreground">実行中</p>
                      </div>
                    </div>
                    <Badge variant="default">2時間</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                      <div>
                        <p className="font-medium">12:00 昼食・休憩</p>
                        <p className="text-sm text-muted-foreground">リフレッシュ</p>
                      </div>
                    </div>
                    <Badge variant="outline">1時間</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 現在のタスク */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📝 現在のプロジェクトタスク
                  <Badge variant="secondary" className="ml-auto">
                    英語学習
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                    <div className="w-4 h-4 bg-success rounded-sm flex items-center justify-center">
                      <span className="text-success-foreground text-xs">✓</span>
                    </div>
                    <span className="line-through text-muted-foreground">
                      単語帳アプリ起動 (15分)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="w-4 h-4 bg-primary rounded-sm animate-pulse" />
                    <span className="font-medium">文法練習 (30分) ← 実行中</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded-sm" />
                    <span>リスニング (15分)</span>
                  </div>
                </div>

                {/* 進捗セクション */}
                <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">⏱️ 進行中: 文法練習</h4>
                    <Button variant="ghost" size="sm">
                      <PauseIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">経過時間: 12分 / 目標30分</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>

                {/* プロジェクトメモ */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">📋 プロジェクトメモ</h4>
                  <div className="text-sm text-muted-foreground space-y-1 p-3 bg-muted/30 rounded">
                    <div>• 今日は発音に重点を置く</div>
                    <div>• 次回は過去形の復習</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
