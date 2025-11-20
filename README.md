# YOUYOU - 宿舍生存工具包

> 基于多维性格分析与博弈论的宿舍协作辅助系统

[![Deploy to GitHub Pages](https://github.com/YOUR_USERNAME/YOUYOU-2/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUYOU-2/actions/workflows/deploy.yml)

🌐 **在线体验**: [https://YOUR_USERNAME.github.io/YOUYOU-2/](https://YOUR_USERNAME.github.io/YOUYOU-2/)

## 🎯 项目简介

YOUYOU 是一个创新的宿舍关系管理工具，将宿舍生活游戏化，通过技术手段降低沟通成本，提升宿舍和谐度。

## ✨ 核心功能

### 📡 舍友雷达系统
- 六维性格分析（睡眠敏感度、噪音制造度、洁癖度、熬夜指数、温度偏好、社交度）
- 动态雷达图可视化
- 智能计算兼容度和冲突点
- 基于欧氏距离的匹配算法

### 💬 非暴力沟通翻译器
- 将情绪化抱怨转换为委婉建议
- 情绪强度分析
- 多种话术模板自动生成
- 一键复制功能

### 🎰 家务扭蛋机
- 游戏化家务分配
- 加权随机算法确保公平
- 实时概率显示
- 历史记录追踪

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **状态管理**: Zustand (with persist)
- **路由**: React Router v6
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **可视化**: ECharts
- **部署**: GitHub Pages

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📦 项目结构

```
src/
├── core/               # 核心算法层
│   ├── algorithms/     # 兼容度计算、加权随机
│   ├── audio/          # Web Audio API 封装
│   └── nlp/            # 自然语言处理
├── features/           # 功能模块
│   ├── Dashboard/      # 首页
│   ├── Radar/          # 舍友雷达
│   ├── Translator/     # 沟通翻译器
│   └── Gacha/          # 家务扭蛋机
├── components/         # UI 组件
├── hooks/              # 自定义 Hooks
├── store/              # 状态管理
├── types/              # TypeScript 类型
└── utils/              # 工具函数
```

## 🔒 隐私保护

所有数据仅存储在用户浏览器的 LocalStorage 中，不会上传到任何服务器。这是一个完全的 Local-First 应用。

## 🎨 设计理念

- **赛博朋克风格**: 霓虹紫 + 荧光绿配色
- **游戏化体验**: 将枯燥的宿舍管理变成有趣的互动
- **技术驱动**: 用算法解决人际关系问题

## 📄 License

MIT

## 👥 贡献

欢迎提交 Issue 和 Pull Request！
