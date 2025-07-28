import AppLayout from '@/components/layout/AppLayout'

export default function HomePage() {
  return (
    <AppLayout>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-primary-600 mb-8">
          ライフオーケストレーション
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl">
          AIがあなたの理想の人生を実現するために、
          日々のタスクを最適化し、目標達成をサポートします。
        </p>
      </main>
    </AppLayout>
  )
}