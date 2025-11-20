📂 YOUYOU - 项目目录结构树
Plaintext

YOUYOU-Dorm-Survival-Kit/
├── .github/
│   └── workflows/          # CI/CD 自动化部署配置
│       └── deploy.yml      # 核心：推送到 main 分支自动部署到 GH Pages
├── public/                 # 静态资源 (favicon, manifest.json)
├── src/
│   ├── assets/             # 图片、字体、像素风 SVG
│   ├── components/         # 通用 UI 组件 (与业务逻辑解耦)
│   │   ├── Layout/         # 布局组件 (AppShell, Navbar, MobileWrapper)
│   │   └── UI/             # 原子组件 (Button, Card, Modal, Slider)
│   ├── core/               # 🔥 核心逻辑层 (比赛的技术加分项)
│   │   ├── algorithms/     # 纯算法文件
│   │   │   ├── compatibility.ts # MBTI/维度匹配算法
│   │   │   └── weightedRandom.ts # 扭蛋机加权随机算法
│   │   ├── audio/          # Web Audio API 封装
│   │   │   └── decibelMeter.ts  # 噪音监听与分析类
│   │   └── nlp/            # 简单的自然语言处理逻辑
│   │   │   └── politeTranslator.ts # 脏话转委婉语逻辑
│   ├── features/           # 业务功能模块 (聚合视图+逻辑)
│   │   ├── Dashboard/      # 首页仪表盘
│   │   ├── Radar/          # 舍友雷达图模块
│   │   ├── Gacha/          # 家务扭蛋机模块
│   │   └── Translator/     # 沟通翻译器模块
│   ├── hooks/              # 自定义 React Hooks
│   │   ├── useAudio.ts     # 调用 core/audio 的 Hook
│   │   └── usePersist.ts   # 封装 LocalStorage 数据持久化
│   ├── store/              # 全局状态管理 (推荐 Zustand)
│   │   ├── useUserStore.ts # 用户设置、MBTI信息
│   │   └── useDormStore.ts # 舍友列表、历史记录
│   ├── types/              # TypeScript 类型定义 (体现严谨性)
│   ├── utils/              # 工具函数 (格式化日期、CSS合并等)
│   ├── App.tsx             # 路由配置
│   └── main.tsx            # 入口文件
├── .eslintrc.cjs           # 代码规范配置
├── index.html              # 入口 HTML
├── package.json
├── tailwind.config.js      # 样式配置
├── tsconfig.json
└── vite.config.ts          # 构建配置 (需配置 base url)
🔑 关键文件详解 (比赛时的技术亮点)
为了让你在比赛中有的说，以下几个文件是你的“技术护城河”：

1. src/core/audio/decibelMeter.ts (脱离 React 的原生能力)
这里展示你对浏览器底层 API 的理解，封装一个类来处理音频流。

TypeScript

// 这是一个纯 TS 类，不依赖 React，体现解耦思维
export class DecibelMeter {
  private context: AudioContext;
  private analyzer: AnalyserNode;
  // ... 初始化 AudioContext, 连接麦克风, 计算 RMS 值转换分贝
}
2. src/core/algorithms/weightedRandom.ts (算法思维)
不要用简单的 Math.random()。展示你如何根据“上次做家务的时间”动态调整权重。

TypeScript

interface Roommate { id: string; lastChoreDate: number; weight: number }
// 算法：距离上次做家务时间越久，weight 越高，被抽中的概率越大
export const selectVictim = (roommates: Roommate[]) => { ... }
3. src/hooks/usePersist.ts (Local-First 架构)
强调数据隐私，所有数据仅存储在用户浏览器。

TypeScript

// 封装 localStorage，处理序列化、反序列化和版本迁移
export function usePersist<T>(key: string, initialValue: T) {
  // ... 自动同步 State 到 LocalStorage
}