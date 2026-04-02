// 个人信息展示组件
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function PersonalInfo() {
  return (
    <section id="about" className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 头像和基本信息 */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6 ring-4 ring-primary/20">
            <AvatarFallback className="text-2xl md:text-4xl font-bold bg-primary text-primary-foreground">
              告
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 gradient-text">
            告白火山
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            手作电子小物的学生，在代码与硬件的交织中积累着属于自己的项目故事
          </p>
        </div>

        {/* 详细信息卡片 */}
        <div className="grid gap-4 md:gap-6">
          {/* 如何联系我 */}
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">
                📞 如何联系我
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="text-sm md:text-base bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary">
                  wechat：gaobaihuoshan
                </Badge>
                <Badge className="text-sm md:text-base bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary">
                  email：gaobaihuoshan@163.com
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 当前在做 */}
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">
                ⚡ 当前在做
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="text-sm md:text-base bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                  AI 应用
                </Badge>
                <Badge className="text-sm md:text-base bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                  电子 DIY
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 兴趣方向 */}
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">
                ❤️ 兴趣方向
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="text-sm md:text-base bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400">
                  编程
                </Badge>
                <Badge className="text-sm md:text-base bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                  画画
                </Badge>
                <Badge className="text-sm md:text-base bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400">
                  运动
                </Badge>
                <Badge className="text-sm md:text-base bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400">
                  音乐
                </Badge>
                <Badge className="text-sm md:text-base bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-400">
                  做有意思的小玩意儿
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 个人特点 */}
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-primary">
                ✨ 个人特点
              </h3>
              <p className="text-sm md:text-base text-muted-foreground bg-gradient-to-r from-primary/10 to-accent/10 p-3 rounded-lg border border-primary/20">
                可以把复杂的知识用人话讲出来
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
