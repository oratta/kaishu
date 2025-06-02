'use client'

import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FloatingChatButtonProps {
  isOpen: boolean
  onClick: () => void
}

export function FloatingChatButton({ isOpen, onClick }: FloatingChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50',
        'bg-primary hover:bg-primary/90',
        isOpen && 'bg-secondary hover:bg-secondary/90'
      )}
      size="icon"
      data-slot="floating-chat-button"
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <MessageCircle className="h-6 w-6" />
      )}
      <span className="sr-only">
        {isOpen ? 'チャットを閉じる' : 'チャットを開く'}
      </span>
    </Button>
  )
}