'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
import { TaskList } from '@/components/tasks'
import { Task, TaskStatus, TaskTimer } from '@/types/task'

export default function UITestPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '文法書Ch.3を読む',
      description: '基礎文法の復習と練習問題',
      status: 'TODO',
      projectId: 'english-project',
      projectName: '英語学習',
      estimatedMinutes: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'リスニング練習',
      description: 'TEDトークを聞いてシャドーイング',
      status: 'DOING',
      projectId: 'english-project',
      projectName: '英語学習',
      estimatedMinutes: 45,
      actualMinutes: 12,
      startedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: '単語帳100語',
      description: 'TOEIC頻出単語の暗記',
      status: 'DONE',
      projectId: 'english-project',
      projectName: '英語学習',
      estimatedMinutes: 15,
      actualMinutes: 18,
      completedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      title: 'React Hooksの復習',
      description: 'useEffect, useStateの使い方を確認',
      status: 'TODO',
      projectId: 'web-dev',
      projectName: 'Web開発学習',
      estimatedMinutes: 60,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
  const [activeTaskId, setActiveTaskId] = useState<string>('')
  const [activeTimer, setActiveTimer] = useState<TaskTimer | undefined>()

  const handleTaskStart = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: 'DOING' as TaskStatus, startedAt: new Date() }
          : task
      )
    )
    setActiveTaskId(taskId)
    setActiveTimer({
      taskId,
      startTime: new Date(),
      elapsedSeconds: 0,
      isRunning: true,
    })
  }

  const handleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: 'DONE' as TaskStatus, completedAt: new Date() }
          : task
      )
    )
    if (activeTaskId === taskId) {
      setActiveTaskId('')
      setActiveTimer(undefined)
    }
  }

  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    )
  }
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">UI Components Test</h1>
        <ThemeToggle />
      </div>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Card Component</h2>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>プロジェクト作成</CardTitle>
            <CardDescription>新しいプロジェクトを作成して目標を管理しましょう</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">プロジェクト名</Label>
                  <Input id="name" placeholder="英語学習プロジェクト" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">説明</Label>
                  <Input id="description" placeholder="TOEICスコア800点を目指す" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">キャンセル</Button>
            <Button>作成</Button>
          </CardFooter>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Task List Component</h2>
        <p className="text-muted-foreground">
          タスクリストコンポーネントのテスト。TODO/DOING/DONEのステータス管理、
          タイマー機能、ドラッグ&ドロップなどの機能を確認できます。
        </p>
        <div className="max-w-4xl">
          <TaskList
            tasks={tasks}
            onTaskStart={handleTaskStart}
            onTaskComplete={handleTaskComplete}
            onTaskStatusChange={handleTaskStatusChange}
            onTaskEdit={(taskId) => console.log('Edit task:', taskId)}
            activeTaskId={activeTaskId}
            activeTimer={activeTimer}
          />
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dark Mode Test</h2>
        <p className="text-muted-foreground">
          このページではshadcn/uiコンポーネントが正しく動作することを確認できます。
          右上のテーマ切り替えボタンで、ライト・ダーク・システム自動の3つのモードを切り替えて、
          スタイルが適切に変更されることを確認してください。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>ライトモード</CardTitle>
              <CardDescription>明るい背景色のテーマ</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">サンプルボタン</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>ダークモード</CardTitle>
              <CardDescription>暗い背景色のテーマ</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">サンプルボタン</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>システム自動</CardTitle>
              <CardDescription>OSの設定に従って自動切り替え</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">サンプルボタン</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
