// 主页组件
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PersonalInfo from '@/components/PersonalInfo';
import ChatSection from '@/components/ChatSection';

export default function HomePage() {
  // 平滑滚动到指定区域
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-bold gradient-text">告白火山</h1>
          <nav className="flex gap-2 md:gap-4">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('about')}
              className="text-sm md:text-base"
            >
              关于我
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('chat')}
              className="text-sm md:text-base"
            >
              数字分身
            </Button>
          </nav>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1">
        <PersonalInfo />
        <ChatSection />
      </main>

      {/* 页脚 */}
      <footer className="w-full border-t border-border py-6 md:py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-xs md:text-sm text-muted-foreground">
          <p>© 2026 告白火山. 一个简约、清爽、带有科技感的个人主页</p>
        </div>
      </footer>
    </div>
  );
}
