# 更新日志

## [1.1.0] - 2025-12-12

### ✨ 重大更新
- 🎨 **重新设计水珠效果** - 静止的立体水珠布满中间区域
  - ✅ 水珠改为静止状态，不再下落
  - ✅ 15个水珠以网格布局分布在中间区域（5列×3行）
  - ✅ 水珠大小：40px - 100px（直径）
  - ✅ 更立体的 Shader 材质效果
  - ✅ 菲涅尔边缘光 + 双光源高光
  - ✅ 轻微的呼吸动画（±3px浮动）
  - ✅ 不会太密集，视觉效果更好

### 🎯 新增功能
- 📄 **水珠效果文档** - 新增 WATER_DROPS_FEATURES.md
  - 详细的技术实现说明
  - 参数调整指南
  - 自定义配置方法

---

## [1.0.1] - 2025-12-12

### 🐛 修复
- ✅ **消除 Sass 废弃警告** - 升级到最新的 Sass API
  - 更新 `sass` 到 v1.80.0
  - 添加 `sass-embedded` v1.80.0
  - 配置 Vite 使用 `modern-compiler` API
  - 构建输出现在完全干净，无任何警告

### 🔧 配置变更

#### vite.config.ts
```typescript
css: {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler', // 使用新的 Sass API
      silenceDeprecations: ['legacy-js-api']
    }
  }
}
```

#### package.json
```json
"devDependencies": {
  "sass": "^1.80.0",
  "sass-embedded": "^1.80.0"
}
```

### 📊 构建结果
- ✅ 无 Sass 废弃警告
- ✅ 构建速度：~1.5秒
- ✅ 产物大小：
  - index.html: 0.54 kB
  - CSS: 7.81 kB (gzip: 1.79 kB)
  - JS: 520.66 kB (gzip: 141.29 kB)

---

## [1.0.0] - 2025-12-12

### 🎉 首次发布

#### ✨ 核心功能
- ✅ Three.js 液态透明玻璃水珠效果
  - 水珠大小：30-100px
  - WebGL Shader 实现玻璃材质
  - 自动下落、摆动、旋转动画
  
- ✅ 右侧纯 CSS 液态玻璃组件
  - GlassButton.vue - 液态玻璃按钮
  - GlassCard.vue - 液态玻璃卡片
  - Backdrop-filter 实现毛玻璃效果
  
- ✅ 左侧 SVG + Backdrop-filter 玻璃组件
  - SvgGlassButton.vue - SVG 滤镜玻璃按钮
  - SvgGlassCard.vue - SVG 滤镜玻璃卡片
  - feTurbulence + feDisplacementMap 液态动画

#### 🛠️ 技术栈
- Vue 3.4.21
- Three.js 0.160.1
- TypeScript 5.4.2
- Vite 5.1.6
- SCSS 1.71.1

#### 🚀 部署
- GitHub Actions 自动部署
- GitHub Pages 支持
- 开发端口：9886

#### 📚 文档
- README.md - 完整文档
- QUICK_START.md - 快速开始指南
- PROJECT_SUMMARY.md - 项目总结
- START_HERE.md - 立即开始指南

