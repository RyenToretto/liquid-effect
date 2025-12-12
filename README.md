# iOS 液态透明玻璃特效

一个使用 Vue3 + Three.js + TypeScript 实现的苹果 iOS 风格液态透明玻璃特效项目。

## ✨ 特性

- 🎨 **Three.js 立体水珠**: 
  - 静止的液态透明玻璃水珠布满中间区域
  - 15个水珠，大小40-100px，不会太密集
  - 真实3D渲染，立体感强
  - 轻微呼吸动画，自然生动
  - 菲涅尔边缘光 + 双光源高光效果
- 🌊 **双重玻璃效果实现**:
  - 右侧：纯 CSS + Backdrop-filter 实现的液态玻璃组件
  - 左侧：SVG 滤镜 + Backdrop-filter 实现的液态玻璃组件
- 💎 **iOS 风格毛玻璃**: 模仿苹果 iOS 的半透明毛玻璃效果
- 🎯 **可复用组件**: 液态玻璃按钮和卡片组件，支持自定义内容
- 📱 **响应式设计**: 适配不同屏幕尺寸
- 🚀 **GitHub Pages 部署**: 自动化部署到 GitHub Pages

## 🛠️ 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集
- **Three.js** - 3D 图形库
- **SCSS** - CSS 预处理器
- **Vite** - 下一代前端构建工具

## 📦 安装

```bash
# 安装依赖
npm install
```

## 🚀 开发

```bash
# 启动开发服务器 (端口: 9886)
npm run dev

# 或者
npm start
```

访问 http://localhost:9886 查看效果

## 🏗️ 构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📂 项目结构

```
liquid-effect/
├── public/
│   ├── bg.jpeg           # 背景图片
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── WaterDropCanvas.vue    # Three.js 水珠组件
│   │   ├── GlassButton.vue        # CSS 玻璃按钮
│   │   ├── GlassCard.vue          # CSS 玻璃卡片
│   │   ├── SvgGlassButton.vue     # SVG 玻璃按钮
│   │   └── SvgGlassCard.vue       # SVG 玻璃卡片
│   ├── App.vue
│   ├── main.ts
│   └── style.scss
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions 部署配置
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎨 组件说明

### 1. WaterDropCanvas (Three.js 水珠)
- 使用 Three.js 渲染真实3D液态水珠
- 静止布满中间区域（5列×3行 = 15个）
- 支持自定义大小（40px - 100px）
- 轻微呼吸动画（±3px浮动）
- 高级 Shader 材质：
  - 菲涅尔边缘光效果
  - 双光源高光反射
  - 内部折射扭曲
  - 流动光泽效果
- 详细说明见 [WATER_DROPS_FEATURES.md](./WATER_DROPS_FEATURES.md)

### 2. GlassButton / GlassCard (CSS 实现)
- 纯 CSS Backdrop-filter 实现
- 液态流动动画效果
- 平整边框设计

### 3. SvgGlassButton / SvgGlassCard (SVG 实现)
- SVG 滤镜（feTurbulence + feDisplacementMap）
- 动态液态背景动画
- Backdrop-filter 模糊效果

## 🌐 部署

项目配置了 GitHub Actions 自动部署。推送到 main 分支后会自动构建并部署到 GitHub Pages。

访问地址: `https://[username].github.io/liquid-effect/`

## 📝 配置说明

### 端口配置
默认端口为 9886，可在 `vite.config.ts` 中修改：

```typescript
export default defineConfig({
  server: {
    port: 9886
  }
})
```

### GitHub Pages 配置
确保在 `vite.config.ts` 中设置正确的 base 路径：

```typescript
export default defineConfig({
  base: '/liquid-effect/'  // 你的仓库名
})
```

## 📄 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
