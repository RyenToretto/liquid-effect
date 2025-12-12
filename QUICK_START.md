# 快速开始指南

## 🚀 立即开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
# 或
npm start
```

访问: http://localhost:9886

### 3. 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录

### 4. 预览生产构建

```bash
npm run preview
```

## 📋 可用命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动开发服务器（带host） |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run type-check` | TypeScript 类型检查 |

## 🌐 部署到 GitHub Pages

1. **确保仓库设置正确**
   - 在 `vite.config.ts` 中的 `base` 设置为你的仓库名
   - 例如: `base: '/liquid-effect/'`

2. **推送到 GitHub**
   ```bash
   git add .
   git commit -m "feat: 完成液态玻璃特效"
   git push origin main
   ```

3. **GitHub Actions 自动部署**
   - 推送后，GitHub Actions 会自动构建并部署
   - 在仓库的 Actions 标签页查看部署状态

4. **启用 GitHub Pages**
   - 进入仓库 Settings > Pages
   - Source 选择 "GitHub Actions"
   - 部署完成后访问: `https://[你的用户名].github.io/liquid-effect/`

## 🎨 效果预览

### 中间区域
- Three.js 渲染的液态透明玻璃水珠
- 水珠大小：30px - 100px
- 自动下落动画，带左右摆动效果

### 左侧面板（SVG 实现）
- 使用 SVG 滤镜 + Backdrop-filter
- 液态玻璃按钮和卡片
- 动态液态背景动画

### 右侧面板（纯 CSS 实现）
- 纯 CSS + Backdrop-filter
- 液态玻璃按钮和卡片
- iOS 风格毛玻璃效果

## 🔧 自定义配置

### 修改端口
编辑 `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 你的端口号
  }
})
```

### 修改背景图
替换 `public/bg.jpeg` 为你的图片

### 调整水珠参数
编辑 `src/components/WaterDropCanvas.vue`:

```typescript
const MAX_DROPS = 12  // 最大水珠数量
const DROP_SPAWN_INTERVAL = 2500  // 生成间隔(毫秒)
const size = 30 + Math.random() * 70  // 水珠大小范围
```

## 📝 技术栈

- Vue 3.4
- TypeScript 5.4
- Three.js 0.160
- Vite 5.1
- SCSS 1.71

## 🐛 故障排除

### 依赖安装失败
```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm install
```

### 构建失败
```bash
# 检查 Node.js 版本 (建议 18+)
node --version

# 重新安装依赖
npm install
```

### 端口被占用
```bash
# 修改 vite.config.ts 中的端口
# 或杀掉占用端口的进程
lsof -ti:9886 | xargs kill -9
```

## 💡 提示

1. 开发时建议使用 Chrome 或 Edge 浏览器（更好的 WebGL 支持）
2. 背景图片建议使用高清图片以获得最佳效果
3. 移动端访问时可能需要调整组件布局
4. Three.js 水珠效果对性能有一定要求，低端设备可能出现卡顿
