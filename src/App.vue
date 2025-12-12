<template>
  <div class="app">
    <!-- 背景图片 -->
    <div class="background"></div>
    
    <!-- Three.js 水滴效果画布 -->
    <WaterDropCanvas />
    
    <!-- 左侧面板 - SVG + Backdrop-filter -->
    <div class="left-panel">
      <SvgGlassButton @click="handleSvgAction1">SVG 按钮 1</SvgGlassButton>
      <SvgGlassButton @click="handleSvgAction2">SVG 按钮 2</SvgGlassButton>
      <SvgGlassCard title="SVG 液态卡片">
        <p>使用 SVG + Backdrop-filter</p>
        <p>实现液态玻璃特效</p>
        <p>边框平整，背景液态透明</p>
      </SvgGlassCard>
      <SvgGlassCard title="技术栈">
        <p>Vue 3 + TypeScript</p>
        <p>Three.js + WebGL</p>
        <p>SVG 滤镜动画</p>
      </SvgGlassCard>
    </div>
    
    <!-- 右侧面板 - 纯CSS实现 -->
    <div class="right-panel">
      <GlassButton @click="handleAction1">CSS 按钮 1</GlassButton>
      <GlassButton @click="handleAction2">CSS 按钮 2</GlassButton>
      <GlassCard title="CSS 玻璃卡片">
        <p>纯 CSS 液态玻璃效果</p>
        <p>边框平整，背景透明</p>
        <p>iOS 风格毛玻璃</p>
      </GlassCard>
      <GlassCard title="特性说明">
        <p>Backdrop-filter 模糊</p>
        <p>动态高光效果</p>
        <p>流畅的交互动画</p>
      </GlassCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import WaterDropCanvas from './components/WaterDropCanvas.vue'
import GlassButton from './components/GlassButton.vue'
import GlassCard from './components/GlassCard.vue'
import SvgGlassButton from './components/SvgGlassButton.vue'
import SvgGlassCard from './components/SvgGlassCard.vue'

const handleAction1 = () => {
  console.log('CSS 按钮 1 点击')
}

const handleAction2 = () => {
  console.log('CSS 按钮 2 点击')
}

const handleSvgAction1 = () => {
  console.log('SVG 按钮 1 点击')
}

const handleSvgAction2 = () => {
  console.log('SVG 按钮 2 点击')
}
</script>

<style lang="scss" scoped>
.app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/bg.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.left-panel {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
  max-width: 300px;
}

.right-panel {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
  max-width: 300px;
}
</style>
