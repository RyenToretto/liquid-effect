# 液态透明玻璃水珠效果说明

## 🎨 水珠特性

### 布局与分布
- ✅ **静止状态**: 水珠固定在中间区域，不会下落
- ✅ **网格布局**: 5列 × 3行 = 15个水珠
- ✅ **智能分布**: 网格布局 + 随机偏移，既整齐又自然
- ✅ **避开边缘**: 不会遮挡左右两侧的控制面板

### 尺寸规格
- 📏 **大小范围**: 40px - 100px（直径）
- 📏 **尺寸多样**: 每个水珠随机大小
- 📏 **足够明显**: 最小40px确保视觉效果
- 📏 **最大100px**: 满足直径要求

### 立体效果
- 💎 **3D 渲染**: Three.js WebGL 真实3D对象
- 💎 **水滴形状**: 顶部收窄，底部圆润
- 💎 **多层材质**: 
  - 菲涅尔边缘光（Fresnel）
  - 双光源高光（Specular）
  - 内部折射扭曲（Refraction）
  - 流动光泽（Shimmer）
- 💎 **深度感**: 3D 深度计算，透明度渐变

### 动画效果
- 🌊 **轻微呼吸**: 上下浮动 ±3px
- 🌊 **缓慢旋转**: 非常轻微的旋转动画
- 🌊 **内部流动**: Shader 实现的内部光泽流动
- 🌊 **独立节奏**: 每个水珠独立的动画相位

### iOS 风格
- 🍎 **半透明**: 70% 基础透明度
- 🍎 **玻璃质感**: 轻微蓝白色调（#E0EEF9）
- 🍎 **边缘高光**: 强烈的边缘光晕效果
- 🍎 **背景融合**: 与背景图片完美融合

## 🔧 技术实现

### Three.js 配置
```typescript
// 正交相机 - 避免透视变形
OrthographicCamera(-aspect * 500, aspect * 500, 500, -500)

// 高质量球体
SphereGeometry(size, 48, 48) // 48段确保圆滑

// 双面渲染
ShaderMaterial({ side: THREE.DoubleSide })
```

### Shader 材质
```glsl
// 顶点着色器
- 轻微呼吸动画
- 视图空间位置计算

// 片段着色器
- 菲涅尔边缘光: pow(1.0 - dot(normal, viewDir), 3.0)
- 双光源高光: specular1 + specular2
- 内部折射: sin(uv * 15.0 + time)
- 流动光泽: 双向正弦波
- 深度透明度: alpha(0.3 + fresnel * 0.7 - depth * 0.2)
```

### 性能优化
- ✅ **一次性创建**: 所有水珠在初始化时创建
- ✅ **不销毁重建**: 水珠固定存在，不会频繁销毁
- ✅ **轻量动画**: 只更新位置和时间，不重建几何体
- ✅ **合理数量**: 15个水珠，不会造成性能问题

## 📐 布局参数

### 中间区域定义
```typescript
centerWidth = aspect * 600   // 根据屏幕宽高比调整
centerHeight = 800           // 固定高度

// 网格
cols = 5  // 5列
rows = 3  // 3行

// 单元格
cellWidth = centerWidth / 5
cellHeight = 800 / 3
```

### 位置计算
```typescript
// 基础网格位置
baseX = (col - 2.5) * cellWidth
baseY = (row - 1.5) * cellHeight

// 随机偏移 ±50% 单元格大小
offsetX = random(-cellWidth * 0.25, cellWidth * 0.25)
offsetY = random(-cellHeight * 0.25, cellHeight * 0.25)

// 最终位置
finalX = baseX + offsetX
finalY = baseY + offsetY
```

## 🎯 视觉效果

### 颜色方案
- **基础色**: `rgb(224, 237, 248)` - 轻微蓝白色
- **高光色**: `rgb(255, 255, 255)` - 纯白高光
- **边缘色**: `rgb(179, 217, 255)` - 淡蓝边缘

### 透明度层次
- **中心区域**: 30% - 较透明
- **边缘区域**: 90% - 较不透明（菲涅尔效果）
- **深度衰减**: 根据3D深度调整透明度

### 光照模型
1. **主光源**: (0.5, 0.8, 1.0) - 右上方
2. **辅助光源**: (-0.3, 0.6, 0.8) - 左上方
3. **高光强度**: 
   - 主光源: 指数64，强度0.8
   - 辅助光源: 指数32，强度0.4

## 🔄 动画参数

### 呼吸效果
```typescript
breathPhase += breathSpeed * 0.01  // 每帧增加
breathOffset = sin(breathPhase) * 3  // ±3px 浮动
position.y = baseY + breathOffset
```

### 旋转效果
```typescript
rotation.z += 0.0005  // 非常慢的旋转
```

### Shader 时间
```typescript
time = Date.now() * 0.001 + dropIndex * 0.5
// 每个水珠有0.5秒的相位差
```

## 🎨 自定义调整

### 修改水珠数量
```typescript
const TOTAL_DROPS = 15  // 修改这个数字
const cols = 5          // 列数
const rows = 3          // 行数
```

### 修改大小范围
```typescript
const size = 40 + Math.random() * 60
// 改为: const size = 最小值 + Math.random() * (最大值 - 最小值)
```

### 调整分布区域
```typescript
const centerWidth = aspect * 600  // 增大区域
const centerHeight = 800          // 调整高度
```

### 调整动画强度
```typescript
// 呼吸幅度
const breathOffset = Math.sin(drop.breathPhase) * 3  // 改为更大的数字

// 旋转速度
drop.mesh.rotation.z += 0.0005  // 改为更大的数字
```

## 💡 特色亮点

1. **真实3D**: 不是2D图片，是真实的3D对象
2. **物理真实**: 基于物理的光照和材质
3. **性能优化**: 固定数量，轻量动画
4. **视觉震撼**: 大尺寸水珠，立体感强
5. **自然分布**: 网格+随机，既整齐又自然
6. **iOS 风格**: 完美还原苹果玻璃质感

## 🌟 效果预览

打开浏览器访问 http://localhost:9886 查看效果：

- 中间区域会看到15个静止的液态玻璃水珠
- 水珠大小不一，最大可达100px
- 有轻微的呼吸动画，非常自然
- 立体效果明显，边缘有漂亮的光晕
- 内部有流动的光泽效果
- 与背景完美融合，透明玻璃质感

