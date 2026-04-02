# volcano's site

## 🌋 项目简介

个人网站项目，包含个人信息展示和数字分身聊天功能。

**网站地址：** [https://volcano-site.netlify.app/](https://volcano-site.netlify.app/)

## 📸 网站预览

![网站预览](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=personal%20website%20with%20modern%20design%2C%20clean%20interface%2C%20dark%20mode%2C%20chat%20section&image_size=landscape_16_9)

## ✨ 功能特性

- **个人信息展示**：包含个人简介、联系方式、当前在做的项目、兴趣方向等
- **数字分身聊天**：基于AI的聊天功能，可以回答访客关于个人的问题
- **响应式设计**：适配不同屏幕尺寸
- **现代UI**：使用Tailwind CSS构建的美观界面
- **流式聊天**：实时显示AI回复内容

## 🛠 技术栈

- **前端**：React + TypeScript + Vite + Tailwind CSS
- **后端**：Supabase Edge Functions
- **部署**：Netlify

## 🚀 本地开发

### 环境要求

- Node.js ≥ 20
- npm ≥ 10

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/OliverWill-boop/my_site_v1.git
   cd my_site_v1/app
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   创建 `.env` 文件并添加以下内容：
   ```env
   VITE_SUPABASE_URL=https://backend.appmiaoda.com/projects/supabase295656908486914048
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **构建项目**
   ```bash
   npm run build
   ```

## 📦 部署

项目已部署在Netlify上，部署配置如下：

- **构建命令**：`npm run build`
- **发布目录**：`dist`
- **环境变量**：在Netlify控制台配置

## 📁 目录结构

```
├── public/            # 静态资源目录
│   ├── images/        # 图片资源
├── src/               # 源码目录
│   ├── components/    # 组件目录
│   │   ├── ChatSection.tsx      # 数字分身聊天组件
│   │   ├── PersonalInfo.tsx     # 个人信息组件
│   ├── pages/         # 页面目录
│   │   ├── HomePage.tsx         # 主页
│   ├── services/      # 服务目录
│   │   ├── chat.ts              # 聊天服务
│   ├── supabase/      # Supabase配置
│   │   ├── functions/chat/       # 聊天Edge Function
│   ├── App.tsx        # 应用入口
│   ├── main.tsx       # 主入口
│   ├── routes.tsx     # 路由配置
├── .env               # 环境变量
├── package.json       # 包配置
├── vite.config.ts     # Vite配置
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 📞 联系方式

- **微信**：gaobaihuoshan
- **邮箱**：gaobaihuoshan@163.com