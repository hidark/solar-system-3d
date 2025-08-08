# 测试文档
## 太阳系3D模拟系统 - 测试计划与用例

---

## 1. 测试概览

### 1.1 测试目标
确保太阳系3D模拟系统在功能、性能、兼容性、安全性等方面达到预定质量标准，为用户提供稳定可靠的使用体验。

### 1.2 测试范围

#### 包含范围
- ✅ 3D渲染功能测试
- ✅ 交互功能测试
- ✅ 性能测试
- ✅ 兼容性测试
- ✅ 响应式测试
- ✅ 安全性测试
- ✅ 可用性测试

#### 不包含范围
- ❌ 第三方库内部测试
- ❌ 浏览器本身的bug
- ❌ 网络层协议测试

### 1.3 测试策略

```
测试金字塔分布：
        验收测试 (5%)
       /            \
      E2E测试 (15%)
     /              \
    集成测试 (30%)
   /                \
  单元测试 (50%)
```

### 1.4 测试环境

| 环境类型 | 配置 | 用途 |
|---------|------|------|
| **开发环境** | 本地开发机 | 开发自测 |
| **测试环境** | 云服务器 | 集成测试 |
| **预发布环境** | 生产镜像 | 验收测试 |
| **生产环境** | CDN+负载均衡 | 线上监控 |

## 2. 测试计划

### 2.1 测试阶段

| 阶段 | 时间 | 测试类型 | 负责人 |
|------|------|---------|--------|
| **阶段1** | 第1-2周 | 单元测试 | 开发团队 |
| **阶段2** | 第3-4周 | 集成测试 | 测试团队 |
| **阶段3** | 第5周 | 系统测试 | 测试团队 |
| **阶段4** | 第6周 | 验收测试 | 产品团队 |
| **阶段5** | 持续 | 回归测试 | 自动化 |

### 2.2 测试资源

#### 人力资源
- 测试负责人: 1人
- 测试工程师: 2人
- 开发支持: 2人

#### 测试设备
```
桌面设备：
- Windows 10/11 + Chrome/Edge/Firefox
- macOS 12+ + Safari/Chrome
- Linux Ubuntu 20.04 + Chrome/Firefox

移动设备：
- iPhone 12/13/14 (iOS 14+)
- Samsung Galaxy S21/S22 (Android 11+)
- iPad Pro/Air (iPadOS 14+)
- 小米平板 (Android 10+)
```

### 2.3 通过标准

- 功能测试通过率 ≥ 95%
- 性能测试达标率 ≥ 90%
- 严重缺陷数 = 0
- 一般缺陷数 ≤ 10
- 测试覆盖率 ≥ 80%

## 3. 功能测试用例

### 3.1 3D场景渲染测试

#### TC-001: 太阳系初始化加载

```yaml
用例ID: TC-001
用例名称: 太阳系初始化加载测试
前置条件: 浏览器支持WebGL
测试步骤:
  1. 打开应用首页
  2. 等待场景加载完成
  3. 检查天体显示
预期结果:
  - 加载时间 < 10秒
  - 太阳和9大行星正确显示
  - 无渲染错误
优先级: P0
```

#### TC-002: 天体纹理加载

```yaml
用例ID: TC-002
用例名称: 天体纹理加载测试
前置条件: 场景已加载
测试步骤:
  1. 放大查看各个行星
  2. 检查纹理显示质量
  3. 切换不同质量设置
预期结果:
  - 纹理清晰无撕裂
  - 质量切换平滑
  - LOD正确工作
优先级: P1
```

### 3.2 交互功能测试

#### TC-101: 相机控制测试

```yaml
用例ID: TC-101
用例名称: 相机旋转缩放测试
前置条件: 场景加载完成
测试步骤:
  1. 鼠标左键拖拽旋转视角
  2. 滚轮缩放视距
  3. 右键拖拽平移
  4. 双击聚焦天体
预期结果:
  - 旋转流畅无卡顿
  - 缩放有合理限制
  - 平移响应及时
  - 聚焦动画平滑
优先级: P0
```

#### TC-102: 天体选择测试

```yaml
用例ID: TC-102  
用例名称: 天体选择和信息显示
前置条件: 场景加载完成
测试步骤:
  1. 点击选择地球
  2. 查看信息面板
  3. 切换选择其他行星
  4. 取消选择
预期结果:
  - 选中高亮显示
  - 信息准确完整
  - 切换无延迟
  - 取消选择正常
优先级: P0
```

#### TC-103: 时间控制测试

```yaml
用例ID: TC-103
用例名称: 时间控制功能测试
前置条件: 场景加载完成
测试步骤:
  1. 点击播放/暂停按钮
  2. 调整时间速度(1x/10x/100x/1000x)
  3. 使用时间滑块跳转
  4. 输入具体日期
预期结果:
  - 播放暂停即时响应
  - 速度切换正确
  - 时间跳转准确
  - 轨道运动连续
优先级: P0
```

### 3.3 教育功能测试

#### TC-201: 知识卡片显示

```yaml
用例ID: TC-201
用例名称: 知识卡片展示测试
前置条件: 选中某个天体
测试步骤:
  1. 点击"查看详情"
  2. 浏览知识内容
  3. 切换不同标签
  4. 关闭卡片
预期结果:
  - 内容加载完整
  - 格式显示正确
  - 标签切换流畅
  - 关闭功能正常
优先级: P1
```

#### TC-202: 比较功能测试

```yaml
用例ID: TC-202
用例名称: 天体比较功能测试
前置条件: 场景加载完成
测试步骤:
  1. 选择比较模式
  2. 选择2-4个天体
  3. 查看比较结果
  4. 导出比较数据
预期结果:
  - 可多选天体
  - 数据对比准确
  - 图表显示正确
  - 导出功能正常
优先级: P2
```

## 4. 性能测试用例

### 4.1 渲染性能测试

#### PT-001: 帧率稳定性测试

```javascript
// 自动化测试脚本
describe('FPS Performance Test', () => {
  let fpsData = [];
  
  beforeEach(() => {
    // 启动性能监控
    performance.mark('fps-test-start');
  });
  
  it('should maintain stable FPS', async () => {
    // 运行5分钟测试
    const duration = 5 * 60 * 1000;
    const startTime = Date.now();
    
    while (Date.now() - startTime < duration) {
      const fps = await getFPS();
      fpsData.push(fps);
      await wait(1000);
    }
    
    // 分析结果
    const avgFPS = average(fpsData);
    const minFPS = Math.min(...fpsData);
    const stability = standardDeviation(fpsData);
    
    expect(avgFPS).toBeGreaterThan(45);      // 平均FPS > 45
    expect(minFPS).toBeGreaterThan(30);      // 最低FPS > 30
    expect(stability).toBeLessThan(10);      // 波动 < 10
  });
});
```

#### PT-002: 内存泄漏测试

```yaml
用例ID: PT-002
用例名称: 长时间运行内存测试
测试方法: 自动化脚本
测试步骤:
  1. 记录初始内存占用
  2. 执行1小时操作循环
     - 视角切换 x100
     - 天体选择 x100
     - 时间快进 x100
  3. 每5分钟记录内存
  4. 分析内存增长曲线
通过标准:
  - 内存增长 < 20%
  - 无明显泄漏趋势
  - GC后能回收到基准值
优先级: P0
```

### 4.2 加载性能测试

#### PT-003: 首屏加载时间

```yaml
用例ID: PT-003
用例名称: 首屏加载性能测试
测试工具: Lighthouse
测试条件:
  - 网络: Fast 3G
  - CPU: 4x slowdown
测试指标:
  - FCP < 2s
  - LCP < 3s
  - TTI < 5s
  - FID < 100ms
  - CLS < 0.1
优先级: P0
```

### 4.3 压力测试

#### PT-004: 多天体渲染压力测试

```javascript
// 压力测试配置
const stressTestConfig = {
  scenarios: [
    { bodies: 50, duration: 60 },   // 50个天体，运行1分钟
    { bodies: 100, duration: 60 },  // 100个天体
    { bodies: 200, duration: 60 },  // 200个天体
    { bodies: 500, duration: 30 }   // 500个天体
  ],
  metrics: ['fps', 'memory', 'cpu'],
  threshold: {
    minFPS: 15,
    maxMemory: 1024 * 1024 * 1024, // 1GB
    maxCPU: 80 // 80%
  }
};
```

## 5. 兼容性测试

### 5.1 浏览器兼容性测试矩阵

| 测试项 | Chrome 100+ | Firefox 90+ | Safari 15+ | Edge 100+ |
|--------|------------|-------------|------------|-----------|
| WebGL渲染 | ✅ | ✅ | ✅ | ✅ |
| 触控手势 | ✅ | ✅ | ⚠️ | ✅ |
| 全屏模式 | ✅ | ✅ | ⚠️ | ✅ |
| 音效播放 | ✅ | ✅ | ⚠️ | ✅ |
| 本地存储 | ✅ | ✅ | ✅ | ✅ |
| Web Worker | ✅ | ✅ | ✅ | ✅ |

### 5.2 设备兼容性测试

#### CT-001: 移动端触控测试

```yaml
用例ID: CT-001
用例名称: 移动端触控操作测试
测试设备: iPhone 13, Samsung S22
测试项目:
  - 单指拖拽旋转
  - 双指缩放
  - 三指平移
  - 长按选择
  - 双击聚焦
预期结果:
  - 手势识别准确率 > 95%
  - 响应延迟 < 100ms
  - 无误触发
优先级: P0
```

### 5.3 响应式布局测试

#### CT-002: 断点适配测试

```yaml
用例ID: CT-002
用例名称: 响应式断点测试
测试断点:
  - 320px (Mobile S)
  - 768px (Tablet)
  - 1024px (Desktop S)
  - 1920px (Desktop L)
测试内容:
  - 布局自适应
  - 字体大小调整
  - 控件大小适配
  - 信息密度调节
通过标准:
  - 无布局错位
  - 无内容遮挡
  - 操作区域合理
优先级: P1
```

## 6. 安全性测试

### 6.1 输入验证测试

#### ST-001: XSS防护测试

```javascript
// XSS测试用例
const xssTestCases = [
  "<script>alert('XSS')</script>",
  "javascript:alert('XSS')",
  "<img src=x onerror=alert('XSS')>",
  "';alert('XSS');//",
  "<svg onload=alert('XSS')>"
];

describe('XSS Protection Test', () => {
  xssTestCases.forEach(payload => {
    it(`should sanitize: ${payload}`, () => {
      const result = sanitizeInput(payload);
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('javascript:');
      expect(result).not.toContain('onerror');
    });
  });
});
```

### 6.2 数据安全测试

#### ST-002: 本地存储安全

```yaml
用例ID: ST-002
用例名称: 本地存储安全测试
测试内容:
  - 敏感数据加密
  - 存储大小限制
  - 数据完整性校验
测试方法:
  1. 检查localStorage内容
  2. 尝试存储超大数据
  3. 修改存储数据后验证
预期结果:
  - 无明文敏感信息
  - 超限有错误处理
  - 数据篡改可检测
优先级: P2
```

## 7. 可用性测试

### 7.1 用户体验测试

#### UT-001: 新手引导测试

```yaml
用例ID: UT-001
用例名称: 新手引导流程测试
测试对象: 5名新用户
测试任务:
  1. 找到地球
  2. 查看地球信息
  3. 对比地球和火星
  4. 观察月球轨道
成功标准:
  - 5分钟内完成所有任务
  - 无需外部帮助
  - 满意度评分 > 4/5
优先级: P1
```

### 7.2 无障碍测试

#### UT-002: 键盘导航测试

```yaml
用例ID: UT-002
用例名称: 纯键盘操作测试
测试内容:
  - Tab键焦点导航
  - Enter键确认操作
  - 方向键视角控制
  - Esc键退出操作
通过标准:
  - 所有功能可键盘访问
  - 焦点指示清晰
  - 操作逻辑合理
优先级: P2
```

## 8. 自动化测试

### 8.1 单元测试示例

```typescript
// OrbitCalculator.test.ts
import { OrbitCalculator } from '../core/physics/OrbitCalculator';

describe('OrbitCalculator', () => {
  let calculator: OrbitCalculator;
  
  beforeEach(() => {
    calculator = new OrbitCalculator();
  });
  
  describe('calculatePosition', () => {
    it('should calculate Earth position correctly', () => {
      const earth = {
        orbit: {
          semiMajorAxis: 1.0,
          eccentricity: 0.0167,
          period: 365.256
        }
      };
      
      const position = calculator.calculatePosition(earth, 0);
      
      expect(position.x).toBeCloseTo(1.0, 2);
      expect(position.y).toBeCloseTo(0, 2);
      expect(position.z).toBeCloseTo(0, 2);
    });
    
    it('should handle elliptical orbits', () => {
      // 测试椭圆轨道
    });
    
    it('should handle edge cases', () => {
      // 测试边界情况
    });
  });
});
```

### 8.2 集成测试示例

```typescript
// Scene.integration.test.ts
import { render } from '@testing-library/react';
import { Scene } from '../components/Scene';

describe('Scene Integration', () => {
  it('should render all planets', async () => {
    const { container } = render(<Scene />);
    
    // 等待场景加载
    await waitFor(() => {
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
    
    // 验证行星数量
    const planets = container.querySelectorAll('[data-testid^="planet-"]');
    expect(planets).toHaveLength(9);
  });
  
  it('should handle user interactions', async () => {
    // 测试用户交互
  });
});
```

### 8.3 E2E测试示例

```typescript
// e2e/solar-system.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Solar System E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('canvas');
  });
  
  test('complete user journey', async ({ page }) => {
    // 1. 等待加载完成
    await expect(page.locator('.loading')).not.toBeVisible();
    
    // 2. 选择地球
    await page.click('[data-testid="planet-earth"]');
    await expect(page.locator('.info-panel')).toContainText('地球');
    
    // 3. 切换到比较模式
    await page.click('[data-testid="compare-mode"]');
    await page.click('[data-testid="planet-mars"]');
    
    // 4. 查看比较结果
    await expect(page.locator('.comparison-chart')).toBeVisible();
    
    // 5. 时间控制
    await page.click('[data-testid="time-speed-10x"]');
    await page.waitForTimeout(3000);
    
    // 6. 验证轨道运动
    const earthPosition1 = await page.locator('[data-testid="planet-earth"]').boundingBox();
    await page.waitForTimeout(2000);
    const earthPosition2 = await page.locator('[data-testid="planet-earth"]').boundingBox();
    
    expect(earthPosition1?.x).not.toBe(earthPosition2?.x);
  });
});
```

## 9. 缺陷管理

### 9.1 缺陷等级定义

| 等级 | 名称 | 描述 | 响应时间 |
|------|------|------|---------|
| **P0** | 阻塞 | 系统崩溃、无法使用 | 立即 |
| **P1** | 严重 | 主要功能失效 | 4小时 |
| **P2** | 一般 | 次要功能异常 | 24小时 |
| **P3** | 轻微 | 体验问题 | 48小时 |
| **P4** | 建议 | 优化建议 | 下版本 |

### 9.2 缺陷模板

```markdown
**缺陷ID**: BUG-001
**标题**: 地球纹理加载失败
**等级**: P1
**模块**: 3D渲染
**环境**: Chrome 100, Windows 10

**复现步骤**:
1. 打开应用
2. 放大查看地球
3. 观察纹理显示

**预期结果**: 
地球纹理正常显示

**实际结果**: 
纹理显示为黑色

**截图/录屏**: 
[附件]

**复现概率**: 100%
```

### 9.3 缺陷跟踪流程

```
新建 → 分配 → 修复中 → 待验证 → 已关闭
         ↓
      重新打开
```

## 10. 测试报告模板

### 10.1 测试总结报告

```markdown
# 测试总结报告

## 测试概况
- **测试版本**: v1.0.0-beta
- **测试周期**: 2025-01-01 至 2025-01-31
- **测试人员**: 3人
- **测试环境**: 开发环境、测试环境

## 测试执行情况
| 测试类型 | 计划用例 | 执行用例 | 通过 | 失败 | 阻塞 | 通过率 |
|---------|---------|---------|------|------|------|--------|
| 功能测试 | 100 | 98 | 93 | 5 | 0 | 94.9% |
| 性能测试 | 20 | 20 | 18 | 2 | 0 | 90.0% |
| 兼容性测试 | 30 | 30 | 28 | 2 | 0 | 93.3% |
| 总计 | 150 | 148 | 139 | 9 | 0 | 93.9% |

## 缺陷统计
| 等级 | 新发现 | 已修复 | 待修复 | 重开 |
|------|--------|--------|--------|------|
| P0 | 0 | 0 | 0 | 0 |
| P1 | 2 | 2 | 0 | 0 |
| P2 | 5 | 4 | 1 | 0 |
| P3 | 8 | 5 | 3 | 1 |
| 总计 | 15 | 11 | 4 | 1 |

## 风险和问题
1. 移动端性能需进一步优化
2. Safari浏览器兼容性存在问题
3. 大数据量场景性能下降明显

## 测试结论
基本满足发布条件，建议修复P2级以上缺陷后发布。

## 建议
1. 加强性能优化，特别是移动端
2. 增加自动化测试覆盖率
3. 完善错误处理和用户提示
```

## 11. 测试工具

### 11.1 测试工具清单

| 工具类型 | 工具名称 | 用途 |
|---------|---------|------|
| **单元测试** | Vitest | 单元测试框架 |
| **集成测试** | Testing Library | React组件测试 |
| **E2E测试** | Playwright | 端到端测试 |
| **性能测试** | Lighthouse | 性能分析 |
| **监控工具** | Sentry | 错误监控 |
| **代码覆盖** | c8 | 覆盖率统计 |

### 11.2 CI/CD集成

```yaml
# .github/workflows/test.yml
name: Test Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Generate coverage report
      run: npm run test:coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

## 12. 附录

### 12.1 测试数据

```json
{
  "testPlanets": [
    {
      "id": "mercury",
      "name": "水星",
      "radius": 2439.7,
      "distance": 0.39,
      "period": 87.969
    },
    {
      "id": "venus",
      "name": "金星",
      "radius": 6051.8,
      "distance": 0.72,
      "period": 224.701
    }
  ],
  "testCases": {
    "validInputs": ["Earth", "地球", "1.0 AU"],
    "invalidInputs": ["", null, undefined, "%%%"],
    "boundaryValues": [0, 1, -1, Number.MAX_VALUE]
  }
}
```

### 12.2 常见问题处理

| 问题 | 原因 | 解决方法 |
|------|------|---------|
| WebGL不支持 | 浏览器版本过低 | 提示升级浏览器 |
| 纹理加载失败 | 网络问题 | 实现重试机制 |
| 性能卡顿 | 设备性能不足 | 自动降低画质 |
| 触控不响应 | 事件监听问题 | 检查事件绑定 |

---

**文档维护**

| 版本 | 日期 | 编写人 | 审核人 | 备注 |
|------|------|--------|--------|------|
| v1.0 | 2025-01-08 | QA Lead | PM | 初始版本 |