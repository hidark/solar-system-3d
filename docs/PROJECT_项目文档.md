# 项目文档
## 太阳系3D模拟系统 - 技术实施方案

---

## 1. 项目概览

### 1.1 项目基本信息

| 项目属性 | 内容 |
|---------|------|
| **项目名称** | Solar System 3D Simulator |
| **项目代号** | SOLAR-3D |
| **版本号** | v1.0.0 |
| **项目类型** | Web应用 |
| **技术栈** | Three.js + React + TypeScript |
| **项目周期** | 6个月 |
| **团队规模** | 6人 |

### 1.2 项目目标
构建一个高性能、教育导向的太阳系3D可视化系统，为K12教育提供直观的天文学习工具。

### 1.3 项目范围
- ✅ **包含**: 太阳系行星展示、轨道运动、交互控制、教育内容
- ❌ **不包含**: 深空天体、实时天文数据、VR支持（v1.0）

## 2. 技术架构

### 2.1 系统架构图

```
┌─────────────────────────────────────────────────┐
│                   前端展示层                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │   React  │ │   Three.js│ │   UI组件  │        │
│  └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────┤
│                   业务逻辑层                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │状态管理   │ │轨道计算   │ │场景管理   │        │
│  │(Zustand) │ │  引擎     │ │   器      │        │
│  └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────┤
│                   数据服务层                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │静态数据   │ │本地缓存   │ │ API服务  │        │
│  │  (JSON)  │ │(IndexedDB)│ │  (REST)  │        │
│  └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────┘
```

### 2.2 技术选型

#### 核心技术栈

| 技术领域 | 选择方案 | 版本 | 选择理由 |
|---------|---------|------|---------|
| **3D引擎** | Three.js | r160+ | 成熟稳定、社区活跃、文档完善 |
| **前端框架** | React | 19.0+ | 组件化开发、生态完善 |
| **语言** | TypeScript | 5.0+ | 类型安全、更好的IDE支持 |
| **状态管理** | Zustand | 4.0+ | 轻量、简单、性能好 |
| **构建工具** | Vite | 5.0+ | 快速、原生ESM支持 |
| **样式方案** | CSS Modules | - | 样式隔离、维护性好 |
| **测试框架** | Vitest | 1.0+ | 与Vite集成好 |

#### 依赖库清单

```json
{
  "dependencies": {
    "three": "^0.160.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zustand": "^4.4.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "leva": "^0.9.35",
    "dayjs": "^1.11.10"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@types/three": "^0.160.0",
    "vitest": "^1.0.0",
    "eslint": "^8.56.0"
  }
}
```

### 2.3 项目结构

```
solar-system/
├── public/                    # 静态资源
│   ├── textures/             # 行星纹理
│   │   ├── sun.jpg
│   │   ├── earth.jpg
│   │   └── ...
│   └── models/               # 3D模型（可选）
├── src/
│   ├── components/           # React组件
│   │   ├── Scene/           # 3D场景组件
│   │   │   ├── Scene.tsx
│   │   │   ├── Lights.tsx
│   │   │   └── Camera.tsx
│   │   ├── CelestialBodies/ # 天体组件
│   │   │   ├── Sun.tsx
│   │   │   ├── Planet.tsx
│   │   │   └── Moon.tsx
│   │   ├── Controls/        # 控制组件
│   │   │   ├── TimeControl.tsx
│   │   │   ├── ViewControl.tsx
│   │   │   └── Settings.tsx
│   │   └── UI/              # UI组件
│   │       ├── InfoPanel.tsx
│   │       ├── Sidebar.tsx
│   │       └── LoadingScreen.tsx
│   ├── core/                # 核心逻辑
│   │   ├── physics/         # 物理引擎
│   │   │   ├── OrbitCalculator.ts
│   │   │   ├── Kepler.ts
│   │   │   └── Constants.ts
│   │   ├── rendering/       # 渲染优化
│   │   │   ├── LODManager.ts
│   │   │   ├── TextureLoader.ts
│   │   │   └── ShaderManager.ts
│   │   └── data/           # 数据管理
│   │       ├── PlanetData.ts
│   │       └── DataLoader.ts
│   ├── hooks/              # 自定义Hooks
│   │   ├── useOrbit.ts
│   │   ├── useCamera.ts
│   │   └── usePerformance.ts
│   ├── store/              # 状态管理
│   │   ├── appStore.ts
│   │   ├── sceneStore.ts
│   │   └── timeStore.ts
│   ├── utils/              # 工具函数
│   │   ├── math.ts
│   │   ├── format.ts
│   │   └── device.ts
│   ├── styles/             # 样式文件
│   │   ├── global.css
│   │   └── variables.css
│   ├── types/              # TypeScript类型
│   │   ├── celestial.ts
│   │   └── scene.ts
│   ├── App.tsx             # 主应用组件
│   └── main.tsx            # 入口文件
├── tests/                   # 测试文件
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                    # 项目文档
├── .env                     # 环境变量
├── .eslintrc.json          # ESLint配置
├── tsconfig.json           # TypeScript配置
├── vite.config.ts          # Vite配置
└── package.json            # 项目配置
```

## 3. 核心模块设计

### 3.1 天体系统模块

```typescript
// types/celestial.ts
interface CelestialBody {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'moon' | 'asteroid';
  radius: number;           // km
  mass: number;            // kg
  position: Vector3;       // 当前位置
  velocity: Vector3;       // 当前速度
  rotation: {
    period: number;        // 自转周期(天)
    axialTilt: number;     // 轴倾角(度)
    currentAngle: number;  // 当前角度
  };
  orbit?: {
    semiMajorAxis: number; // 半长轴(AU)
    eccentricity: number;  // 离心率
    inclination: number;   // 倾角(度)
    perihelion: number;    // 近日点(AU)
    aphelion: number;      // 远日点(AU)
    period: number;        // 公转周期(天)
  };
  material: {
    texture: string;       // 纹理路径
    normalMap?: string;    // 法线贴图
    specularMap?: string;  // 高光贴图
    emissive?: boolean;    // 是否发光
  };
  children?: CelestialBody[]; // 卫星
}
```

### 3.2 轨道计算模块

```typescript
// core/physics/OrbitCalculator.ts
export class OrbitCalculator {
  private readonly G = 6.67430e-11; // 引力常数
  
  /**
   * 计算天体在指定时间的位置
   * 使用开普勒定律
   */
  calculatePosition(
    body: CelestialBody,
    time: number
  ): Vector3 {
    if (!body.orbit) return body.position;
    
    const { semiMajorAxis, eccentricity, period } = body.orbit;
    
    // 平均角速度
    const n = (2 * Math.PI) / period;
    
    // 平近点角
    const M = n * time;
    
    // 偏近点角（使用牛顿迭代法求解开普勒方程）
    const E = this.solveKeplerEquation(M, eccentricity);
    
    // 真近点角
    const v = this.trueAnomaly(E, eccentricity);
    
    // 轨道半径
    const r = semiMajorAxis * (1 - eccentricity * Math.cos(E));
    
    // 转换为笛卡尔坐标
    return this.orbitalToCartesian(r, v, body.orbit);
  }
  
  private solveKeplerEquation(M: number, e: number): number {
    let E = M;
    for (let i = 0; i < 10; i++) {
      E = M + e * Math.sin(E);
    }
    return E;
  }
  
  private trueAnomaly(E: number, e: number): number {
    return 2 * Math.atan2(
      Math.sqrt(1 + e) * Math.sin(E / 2),
      Math.sqrt(1 - e) * Math.cos(E / 2)
    );
  }
}
```

### 3.3 性能优化模块

```typescript
// core/rendering/LODManager.ts
export class LODManager {
  private lodLevels = [
    { distance: 50, detail: 'high' },
    { distance: 200, detail: 'medium' },
    { distance: 500, detail: 'low' },
    { distance: Infinity, detail: 'billboard' }
  ];
  
  updateLOD(
    object: THREE.Object3D,
    camera: THREE.Camera
  ): void {
    const distance = object.position.distanceTo(camera.position);
    const lod = this.getLODLevel(distance);
    
    // 切换模型细节
    this.switchModelDetail(object, lod);
    
    // 调整纹理质量
    this.adjustTextureQuality(object, lod);
  }
  
  private getLODLevel(distance: number): string {
    for (const level of this.lodLevels) {
      if (distance < level.distance) {
        return level.detail;
      }
    }
    return 'billboard';
  }
}
```

### 3.4 状态管理设计

```typescript
// store/appStore.ts
import { create } from 'zustand';

interface AppState {
  // 场景状态
  scene: {
    loaded: boolean;
    quality: 'low' | 'medium' | 'high' | 'auto';
    showOrbits: boolean;
    showLabels: boolean;
  };
  
  // 时间状态
  time: {
    current: Date;
    speed: number; // 1 = 实时, 1000 = 1000倍速
    paused: boolean;
  };
  
  // 相机状态
  camera: {
    mode: 'free' | 'follow' | 'preset';
    target: string | null; // 跟踪的天体ID
    position: [number, number, number];
  };
  
  // 选中状态
  selection: {
    selected: string | null;
    highlighted: string[];
  };
  
  // Actions
  setTimeSpeed: (speed: number) => void;
  togglePause: () => void;
  selectBody: (id: string | null) => void;
  setCameraMode: (mode: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scene: {
    loaded: false,
    quality: 'auto',
    showOrbits: true,
    showLabels: true
  },
  
  time: {
    current: new Date(),
    speed: 1,
    paused: false
  },
  
  camera: {
    mode: 'free',
    target: null,
    position: [100, 50, 100]
  },
  
  selection: {
    selected: null,
    highlighted: []
  },
  
  setTimeSpeed: (speed) => set((state) => ({
    time: { ...state.time, speed }
  })),
  
  togglePause: () => set((state) => ({
    time: { ...state.time, paused: !state.time.paused }
  })),
  
  selectBody: (id) => set((state) => ({
    selection: { ...state.selection, selected: id }
  })),
  
  setCameraMode: (mode) => set((state) => ({
    camera: { ...state.camera, mode: mode as any }
  }))
}));
```

## 4. 数据设计

### 4.1 行星数据结构

```json
{
  "planets": [
    {
      "id": "earth",
      "name": {
        "en": "Earth",
        "zh": "地球"
      },
      "type": "planet",
      "radius": 6371,
      "mass": 5.972e24,
      "orbit": {
        "semiMajorAxis": 1.0,
        "eccentricity": 0.0167,
        "inclination": 0.00005,
        "period": 365.256,
        "perihelion": 0.98329,
        "aphelion": 1.01671
      },
      "rotation": {
        "period": 1.0,
        "axialTilt": 23.44
      },
      "atmosphere": {
        "composition": {
          "N2": 78.08,
          "O2": 20.95,
          "Ar": 0.93,
          "CO2": 0.04
        },
        "pressure": 101.325
      },
      "moons": [
        {
          "id": "moon",
          "name": "Moon",
          "radius": 1737.4,
          "distance": 384400,
          "period": 27.321
        }
      ]
    }
  ]
}
```

### 4.2 数据加载策略

```typescript
// core/data/DataLoader.ts
export class DataLoader {
  private cache = new Map<string, any>();
  
  async loadPlanetData(): Promise<CelestialBody[]> {
    // 检查缓存
    if (this.cache.has('planets')) {
      return this.cache.get('planets');
    }
    
    // 加载基础数据
    const response = await fetch('/data/planets.json');
    const data = await response.json();
    
    // 处理和验证数据
    const planets = this.processPlanetData(data);
    
    // 缓存数据
    this.cache.set('planets', planets);
    
    return planets;
  }
  
  async loadTexture(path: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      loader.load(
        path,
        (texture) => {
          // 优化纹理设置
          texture.anisotropy = 4;
          texture.generateMipmaps = true;
          resolve(texture);
        },
        undefined,
        reject
      );
    });
  }
}
```

## 5. 开发规范

### 5.1 代码规范

#### 命名规范
```typescript
// 文件命名：PascalCase for components, camelCase for others
MyComponent.tsx
useMyHook.ts
myUtility.ts

// 变量命名
const planetRadius = 6371;           // camelCase
const MAX_PLANETS = 9;               // UPPER_SNAKE_CASE for constants
const isPlanetVisible = true;        // boolean with is/has prefix

// 函数命名
function calculateOrbitPosition() {} // 动词开头
function getPlanetById() {}         // get/set for accessors
function handleClick() {}           // handle for events

// 组件命名
const PlanetView = () => {};        // PascalCase
const usePlanetData = () => {};     // use prefix for hooks
```

#### 代码风格
```typescript
// 使用函数组件和Hooks
const Planet: FC<PlanetProps> = ({ id, position }) => {
  const [selected, setSelected] = useState(false);
  
  useEffect(() => {
    // Effect logic
  }, [dependency]);
  
  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial />
    </mesh>
  );
};

// 使用TypeScript严格模式
interface Props {
  id: string;
  position: [number, number, number];
  onSelect?: (id: string) => void;
}
```

### 5.2 Git工作流

#### 分支策略
```
main                # 生产分支
├── develop        # 开发分支
    ├── feature/*  # 功能分支
    ├── bugfix/*   # 缺陷修复
    └── hotfix/*   # 紧急修复
```

#### 提交规范
```
feat: 添加行星选择功能
fix: 修复轨道计算错误
docs: 更新README文档
style: 格式化代码
refactor: 重构轨道计算模块
test: 添加单元测试
chore: 更新依赖版本
```

### 5.3 代码审查清单

- [ ] 代码符合项目规范
- [ ] 有适当的注释和文档
- [ ] 通过所有测试
- [ ] 性能影响已评估
- [ ] 无安全隐患
- [ ] 响应式设计已验证
- [ ] 错误处理完善

## 6. 性能优化方案

### 6.1 渲染优化

```typescript
// 批量渲染优化
class BatchRenderer {
  private instancedMeshes = new Map<string, THREE.InstancedMesh>();
  
  createInstances(type: string, count: number): void {
    const geometry = this.getGeometry(type);
    const material = this.getMaterial(type);
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    
    this.instancedMeshes.set(type, mesh);
  }
  
  updateInstance(type: string, index: number, matrix: THREE.Matrix4): void {
    const mesh = this.instancedMeshes.get(type);
    if (mesh) {
      mesh.setMatrixAt(index, matrix);
      mesh.instanceMatrix.needsUpdate = true;
    }
  }
}
```

### 6.2 内存优化

```typescript
// 纹理管理器
class TextureManager {
  private textureCache = new Map<string, THREE.Texture>();
  private memoryLimit = 512 * 1024 * 1024; // 512MB
  private currentMemory = 0;
  
  async loadTexture(path: string, size: number): Promise<THREE.Texture> {
    // 检查内存限制
    if (this.currentMemory + size > this.memoryLimit) {
      this.evictLRU();
    }
    
    // 加载或返回缓存
    if (!this.textureCache.has(path)) {
      const texture = await this.loadFromDisk(path);
      this.textureCache.set(path, texture);
      this.currentMemory += size;
    }
    
    return this.textureCache.get(path)!;
  }
  
  private evictLRU(): void {
    // 实现LRU驱逐策略
  }
}
```

### 6.3 计算优化

```typescript
// Web Worker for heavy calculations
// workers/orbitWorker.ts
self.addEventListener('message', (event) => {
  const { bodies, time } = event.data;
  
  const positions = bodies.map(body => {
    return calculateOrbitPosition(body, time);
  });
  
  self.postMessage({ positions });
});

// 主线程使用
const worker = new Worker('/workers/orbitWorker.js');
worker.postMessage({ bodies, time });
worker.onmessage = (event) => {
  updatePositions(event.data.positions);
};
```

## 7. 部署方案

### 7.1 构建配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      threshold: 10240
    })
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          react: ['react', 'react-dom'],
          vendor: ['zustand', 'dayjs']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'react', 'react-dom']
  }
});
```

### 7.2 部署架构

```
CDN (CloudFlare)
    ↓
Nginx Load Balancer
    ↓
Web Servers (2-3 instances)
    ↓
Static Assets (S3/OSS)
```

### 7.3 监控方案

```typescript
// 性能监控
class PerformanceMonitor {
  private metrics = {
    fps: [],
    memory: [],
    loadTime: 0
  };
  
  startMonitoring(): void {
    // FPS监控
    this.monitorFPS();
    
    // 内存监控
    this.monitorMemory();
    
    // 上报数据
    setInterval(() => {
      this.reportMetrics();
    }, 60000); // 每分钟上报
  }
  
  private reportMetrics(): void {
    // 发送到监控服务
    fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify(this.metrics)
    });
  }
}
```

## 8. 项目管理

### 8.1 里程碑计划

| 阶段 | 时间 | 交付物 | 完成标准 |
|------|------|--------|---------|
| **M1** | 第4周 | 技术原型 | 3D场景可运行 |
| **M2** | 第8周 | Alpha版本 | 核心功能完成 |
| **M3** | 第12周 | Beta版本 | 功能完整 |
| **M4** | 第16周 | RC版本 | 测试通过 |
| **M5** | 第20周 | 正式版本 | 可发布状态 |
| **M6** | 第24周 | 优化版本 | 性能达标 |

### 8.2 团队分工

| 角色 | 人数 | 职责 |
|------|------|------|
| **项目经理** | 1 | 项目管理、协调沟通 |
| **技术负责人** | 1 | 架构设计、技术决策 |
| **前端开发** | 2 | UI实现、交互开发 |
| **3D开发** | 1 | 3D场景、渲染优化 |
| **测试工程师** | 1 | 测试执行、质量保证 |

### 8.3 风险管理

| 风险 | 影响 | 概率 | 应对措施 |
|------|------|------|---------|
| WebGL兼容性 | 高 | 中 | 提供降级方案 |
| 性能瓶颈 | 高 | 高 | 早期性能测试 |
| 数据准确性 | 中 | 低 | 专家审核 |
| 进度延期 | 中 | 中 | 缓冲时间预留 |

## 9. 质量保证

### 9.1 测试策略

```
测试金字塔：
       E2E测试 (10%)
      /         \
    集成测试 (30%)
   /             \
  单元测试 (60%)
```

### 9.2 性能基准

| 指标 | 目标值 | 测量工具 |
|------|--------|---------|
| FPS | ≥45 | Stats.js |
| 首屏时间 | <3s | Lighthouse |
| 交互延迟 | <100ms | Chrome DevTools |
| 内存占用 | <500MB | Performance API |

### 9.3 代码质量指标

- 测试覆盖率 > 80%
- 代码复杂度 < 10
- 重复代码 < 5%
- TypeScript覆盖率 100%

## 10. 文档规划

### 10.1 文档体系

```
文档体系
├── 用户文档
│   ├── 快速入门
│   ├── 使用指南
│   └── FAQ
├── 开发文档
│   ├── API文档
│   ├── 架构设计
│   └── 开发指南
└── 运维文档
    ├── 部署指南
    ├── 监控配置
    └── 故障处理
```

### 10.2 文档标准

- 使用Markdown格式
- 包含代码示例
- 定期更新维护
- 版本化管理

---

**文档版本历史**

| 版本 | 日期 | 作者 | 更改说明 |
|------|------|------|---------|
| v1.0.0 | 2025-01-08 | Tech Lead | 初始版本 |