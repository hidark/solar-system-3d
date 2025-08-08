# 太阳系3D模拟器 MVP

## 项目简介
基于React + Three.js的太阳系3D可视化系统MVP版本，实现了基础的太阳系天体展示和交互功能。

## 功能特性
- ☀️ 太阳和内行星（水星、金星、地球、火星）3D展示
- 🌍 地月系统模拟
- 🎮 鼠标控制视角（旋转、缩放、平移）
- ⏱️ 时间控制（播放/暂停、速度调节）
- 📊 天体信息展示
- 🎨 可配置的显示选项

## 技术栈
- React 18
- Three.js + React Three Fiber
- TypeScript
- Zustand (状态管理)
- Vite (构建工具)

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 项目结构
```
solar/
├── src/
│   ├── components/          # React组件
│   │   ├── celestial/      # 天体组件
│   │   ├── ControlPanel.tsx # 控制面板
│   │   ├── InfoPanel.tsx    # 信息面板
│   │   └── Scene.tsx        # 3D场景
│   ├── store/              # 状态管理
│   ├── styles/             # 样式文件
│   └── App.tsx             # 主应用
├── docs/                   # 项目文档
└── package.json
```

## 操作说明
- **鼠标左键拖拽**: 旋转视角
- **鼠标滚轮**: 缩放视图
- **鼠标右键拖拽**: 平移视图
- **点击行星**: 查看详细信息
- **时间控制**: 底部控制栏调节播放速度

## 下一步计划
- [ ] 添加外行星（木星、土星、天王星、海王星）
- [ ] 实现真实轨道参数
- [ ] 添加行星纹理
- [ ] 优化性能（LOD系统）
- [ ] 添加更多教育内容

## License
MIT