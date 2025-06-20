
import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function FloatingLLMChat() {
  const { isLLMChatOpen, setLLMChatOpen } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'こんにちは！KAISHUです。あなたの人生目標の達成をサポートします。まず、どのような目標を達成したいですか？',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // LLMレスポンスのシミュレーション
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `「${inputValue}」という目標について理解しました。この目標を達成するために、どのくらいの期間を考えていますか？また、現在の状況について教えてください。`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isLLMChatOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setLLMChatOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full bg-kaishu-600 hover:bg-kaishu-700 shadow-lg animate-pulse-glow"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto z-50 md:w-96 max-w-full">
      <Card className="glass-card border-kaishu-200">
        <div className="flex items-center justify-between p-4 border-b border-kaishu-100">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-kaishu-600" />
            <h3 className="font-semibold text-kaishu-900">KAISHU AI</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLLMChatOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-80 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    message.role === 'user'
                      ? 'bg-kaishu-600 text-white'
                      : 'bg-slate-100 text-slate-900'
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-lg px-3 py-2 text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-kaishu-100">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="目標について話してください..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-kaishu-600 hover:bg-kaishu-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
