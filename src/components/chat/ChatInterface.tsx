'use client'

import { useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { getMockResponse, simulateTypingDelay } from './mockResponses'
import type { Message } from './types'
import { Bot } from 'lucide-react'

interface ChatInterfaceProps {
  isOpen: boolean
}

export function ChatInterface({ isOpen }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'こんにちは！KAISHU AIアシスタントです。目標設定、プロジェクト管理、時間管理などについてお手伝いします。何かお聞きになりたいことはありますか？',
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simulate typing delay
    await simulateTypingDelay()

    // Add AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getMockResponse(content),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, aiResponse])
    setIsLoading(false)
  }, [])

  if (!isOpen) return null

  return (
    <Card
      className="fixed bottom-24 right-4 left-4 md:left-auto md:right-6 md:w-96 h-[600px] max-h-[calc(100vh-10rem)] flex flex-col shadow-xl animate-in slide-in-from-bottom-5 duration-200 z-40"
      data-slot="chat-interface"
    >
      <div className="border-b p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">KAISHU AI アシスタント</h3>
          <p className="text-sm text-muted-foreground">ライフマネジメントをサポート</p>
        </div>
      </div>

      <MessageList messages={messages} isLoading={isLoading} />
      
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </Card>
  )
}