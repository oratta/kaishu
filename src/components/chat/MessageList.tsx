'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { Message } from './types'
import { Bot, User } from 'lucide-react'

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function MessageContent({ content }: { content: string }) {
  // Simple markdown support for bold and line breaks
  const formattedContent = content.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*)/)
    return (
      <span key={i}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>
          }
          return part
        })}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    )
  })

  return <>{formattedContent}</>
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={scrollAreaRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
      data-slot="message-list"
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn('flex gap-3', message.role === 'user' && 'justify-end')}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
          )}

          <div
            className={cn(
              'max-w-[75%] rounded-lg px-4 py-2',
              message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
            )}
          >
            <div className="text-sm">
              <MessageContent content={message.content} />
            </div>
            <div
              className={cn(
                'text-xs mt-1 opacity-70',
                message.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
              )}
            >
              {formatTimestamp(message.timestamp)}
            </div>
          </div>

          {message.role === 'user' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div className="bg-muted rounded-lg px-4 py-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
