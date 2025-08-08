# 🌌 Solar System 3D Simulator / 太阳系3D模拟器

A stunning web-based 3D solar system simulator with real NASA textures and accurate planetary physics.

基于Web的3D太阳系模拟系统，使用真实NASA纹理和精确的行星物理参数。

![Solar System 3D](https://img.shields.io/badge/Three.js-black?style=flat&logo=three.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)

## ✨ Features / 功能特点

### 🌍 Realistic Rendering / 真实渲染
- **NASA Textures** - High-resolution planet textures from NASA missions
- **真实NASA纹理** - 来自NASA任务的高分辨率行星纹理
- **Normal & Specular Maps** - Earth features realistic terrain and ocean reflections
- **法线和高光贴图** - 地球具有真实的地形起伏和海洋反射

### 🚀 Complete Solar System / 完整太阳系
- ☀️ **Sun** - With dynamic glow effects / 带动态光晕效果
- 🪐 **9 Planets** - From Mercury to Pluto / 从水星到冥王星
- 🌙 **Moons** - Major satellites included / 包含主要卫星
- 💫 **Rings** - Saturn and Uranus ring systems / 土星和天王星环系统

### 🎮 Interactive Controls / 交互控制
- **Camera Controls** - Zoom, rotate, pan with mouse / 鼠标缩放、旋转、平移
- **Planet Selection** - Click to view details / 点击查看详情
- **Search Function** - Quick planet location / 快速定位行星
- **Time Control** - Adjust speed from seconds to years / 时间速度调节

### 📊 Scientific Accuracy / 科学准确性
- **Kepler's Laws** - Elliptical orbits with accurate eccentricity / 椭圆轨道
- **Real Data** - NASA planetary parameters / NASA行星参数
- **Axial Tilts** - Accurate planetary tilts / 准确的轴倾角
- **Orbital Periods** - Real-time scaled motion / 真实比例运动

## 🛠️ Tech Stack / 技术栈

- **React 18** - UI Framework / 用户界面框架
- **Three.js** - 3D Graphics / 3D图形引擎
- **React Three Fiber** - React renderer for Three.js / Three.js的React渲染器
- **TypeScript** - Type safety / 类型安全
- **Zustand** - State management / 状态管理
- **Vite** - Build tool / 构建工具
- **Leva** - GUI controls / 图形控制面板

## 🚀 Getting Started / 快速开始

### Prerequisites / 前置要求
- Node.js 18+ 
- npm or yarn

### Installation / 安装

```bash
# Clone the repository / 克隆仓库
git clone https://github.com/hidark/solar-system-3d.git
cd solar-system-3d

# Install dependencies / 安装依赖
npm install

# Download planet textures / 下载行星纹理
node download-textures-fixed.js

# Start development server / 启动开发服务器
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

### Build for Production / 生产构建

```bash
npm run build
npm run preview
```

## 🎨 Features Overview / 功能概览

### Time Control Panel / 时间控制面板
- ⏸️ Pause/Play animation / 暂停/播放动画
- 🏃 Speed adjustment (1s to 1y) / 速度调节（秒到年）
- 📅 Date jumping / 日期跳转
- 🚀 Historical events presets / 历史事件预设

### Display Options / 显示选项
- 🌐 Orbit lines / 轨道线
- 🏷️ Planet labels / 行星标签
- ✨ Motion trails / 运动轨迹
- 🎚️ Planet scale adjustment / 行星大小调节

### Camera Presets / 相机预设
- 🎯 Default view / 默认视角
- ⬆️ Top view / 俯视图
- ➡️ Side view / 侧视图
- 🌍 Inner planets / 内行星
- 🪐 Outer planets / 外行星
- 🌌 Overview / 全景

## 📁 Project Structure / 项目结构

```
solar-system-3d/
├── src/
│   ├── components/
│   │   ├── celestial/        # Planet & Sun components / 行星和太阳组件
│   │   ├── SceneEnhanced.tsx # Main 3D scene / 主3D场景
│   │   ├── TimeControl.tsx   # Time controls / 时间控制
│   │   ├── InfoPanel.tsx     # Planet info display / 行星信息显示
│   │   └── SearchPanel.tsx   # Search functionality / 搜索功能
│   ├── data/
│   │   └── planetsData.ts    # Planetary parameters / 行星参数
│   ├── utils/
│   │   └── TextureManager.ts # Texture loading / 纹理加载
│   └── store/
│       └── useStore.ts       # Global state / 全局状态
├── public/
│   └── textures/            # NASA planet textures / NASA行星纹理
└── docs/                    # Documentation / 文档
```

## 🎯 Roadmap / 开发路线

### Phase 1 - Core Features ✅
- [x] Basic solar system with 9 planets
- [x] Elliptical orbits
- [x] Real NASA textures
- [x] Time control system

### Phase 2 - Enhanced Features ✅
- [x] Moon systems
- [x] Ring systems
- [x] Planet information panel
- [x] Search functionality
- [x] Historical events

### Phase 3 - Advanced Features (Planned)
- [ ] Asteroid belt simulation
- [ ] Comet trajectories
- [ ] Space probe paths
- [ ] Eclipse predictions
- [ ] VR support
- [ ] Mobile optimization

## 🌟 Highlights / 特色功能

### Realistic Planet Textures / 真实行星纹理
All planet textures are sourced from NASA missions:
- Earth - Blue Marble imagery with cloud layers
- Mars - Viking and MRO imagery
- Jupiter - Juno and Voyager imagery
- Saturn - Cassini imagery

所有行星纹理均来自NASA任务：
- 地球 - 蓝色弹珠影像和云层
- 火星 - 维京号和MRO影像
- 木星 - 朱诺号和旅行者号影像
- 土星 - 卡西尼号影像

### Accurate Physics / 精确物理
- Kepler's equation solver for elliptical orbits
- Real planetary parameters from NASA JPL
- Proper axial tilts and rotation periods

- 开普勒方程求解椭圆轨道
- 来自NASA JPL的真实行星参数
- 准确的轴倾角和自转周期

## 🎮 Controls / 操作说明

### Mouse Controls / 鼠标控制
- **Left Click + Drag** - Rotate camera / 旋转视角
- **Right Click + Drag** - Pan camera / 平移视角
- **Scroll Wheel** - Zoom in/out / 缩放视图
- **Click Planet** - Select and view info / 选择并查看信息

### Keyboard Shortcuts / 键盘快捷键
- **Space** - Play/Pause / 播放/暂停
- **1-9** - Quick jump to planets / 快速跳转到行星
- **R** - Reset camera / 重置相机
- **F** - Toggle fullscreen / 切换全屏

## 🤝 Contributing / 贡献

Contributions are welcome! Please feel free to submit a Pull Request.

欢迎贡献！请随时提交Pull Request。

## 📄 License / 许可证

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

本项目采用MIT许可证 - 详见[LICENSE](LICENSE)文件。

## 🙏 Acknowledgments / 致谢

- NASA for providing public domain planet textures
- Three.js community for the excellent 3D library
- React Three Fiber team for the React integration

- 感谢NASA提供公开的行星纹理
- 感谢Three.js社区提供优秀的3D库
- 感谢React Three Fiber团队的React集成

## 📸 Screenshots / 截图

### Full Solar System View / 完整太阳系视图
Experience all 9 planets in their orbits with accurate scales and distances.

体验9大行星的轨道运动，具有准确的比例和距离。

### Earth Close-up / 地球特写
High-resolution Earth texture with normal mapping for realistic terrain.

高分辨率地球纹理，带法线贴图呈现真实地形。

### Time Control / 时间控制
Adjust simulation speed and jump to specific dates or historical events.

调节模拟速度，跳转到特定日期或历史事件。

---

🌍 **Live Demo**: [Coming Soon]

🐛 **Report Issues**: [GitHub Issues](https://github.com/hidark/solar-system-3d/issues)

⭐ **Star this project** if you find it interesting!

---

*Built with ❤️ using React, Three.js, and NASA data*