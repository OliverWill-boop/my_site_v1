// 数字分身聊天区组件
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Loader2 } from 'lucide-react';
import { sendStreamRequest } from '@/services/chat';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, streamingContent]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    // 添加用户消息
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingContent('');

    // 创建中断控制器
    abortControllerRef.current = new AbortController();

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // 使用ref来存储累积的内容，避免闭包问题
    let accumulatedContent = '';

    try {
      await sendStreamRequest({
        functionUrl: `${supabaseUrl}/functions/v1/chat`,
        requestBody: {
          messages: [...messages, userMessage],
        },
        supabaseAnonKey,
        onData: (data) => {
          try {
            const parsed = JSON.parse(data);
            // 根据文心API返回格式提取内容
            const chunk = parsed.choices?.[0]?.delta?.content || '';
            if (chunk) {
              accumulatedContent += chunk;
              setStreamingContent(accumulatedContent);
            }
          } catch (e) {
            console.warn('解析数据失败:', e);
          }
        },
        onComplete: () => {
          // 将流式内容添加到消息列表
          if (accumulatedContent) {
            setMessages((prev) => [
              ...prev,
              {
                role: 'assistant',
                content: accumulatedContent,
              },
            ]);
          }
          setStreamingContent('');
          setIsLoading(false);
        },
        onError: (error) => {
          console.error('聊天请求失败:', error);
          toast.error('暂时无法回复，请稍后再试');
          setStreamingContent('');
          setIsLoading(false);
        },
        signal: abortControllerRef.current.signal,
      });
    } catch (error) {
      console.error('发送消息失败:', error);
      toast.error('网络异常，请检查连接后重试');
      setStreamingContent('');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <section id="chat" className="w-full py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center gradient-text">
              💬 和我聊聊
            </CardTitle>
            <p className="text-center text-sm md:text-base text-muted-foreground mt-2">
              我的数字分身会回答你的问题
            </p>
          </CardHeader>
          <CardContent>
            {/* 消息展示区 */}
            <ScrollArea ref={scrollAreaRef} className="h-[400px] md:h-[500px] pr-4 mb-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-12 md:py-20">
                    <p className="text-sm md:text-base">还没有消息，开始聊天吧！</p>
                  </div>
                )}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="w-8 h-8 md:w-10 md:h-10 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm md:text-base">
                          告
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-3 py-2 md:px-4 md:py-3 max-w-[85%] md:max-w-[80%] text-sm md:text-base ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="w-8 h-8 md:w-10 md:h-10 shrink-0">
                        <AvatarFallback className="bg-muted text-muted-foreground text-sm md:text-base">
                          你
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {/* 流式输出中的消息 */}
                {isLoading && streamingContent && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm md:text-base">
                        告
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-3 py-2 md:px-4 md:py-3 max-w-[85%] md:max-w-[80%] bg-secondary text-secondary-foreground text-sm md:text-base">
                      <p className="whitespace-pre-wrap break-words">{streamingContent}</p>
                    </div>
                  </div>
                )}
                {/* 加载状态 */}
                {isLoading && !streamingContent && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm md:text-base">
                        告
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-3 py-2 md:px-4 md:py-3 bg-secondary text-secondary-foreground text-sm md:text-base">
                      <p className="text-muted-foreground">思考中...</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* 输入区 */}
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setInput(e.target.value);
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="输入你的问题... (最多500字，按Enter发送)"
                className="resize-none text-sm md:text-base"
                rows={3}
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="shrink-0 w-10 h-10 md:w-12 md:h-12"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </Button>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 text-right">
              {input.length}/500
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
