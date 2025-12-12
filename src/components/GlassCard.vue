<template>
  <div class="glass-card">
    <div class="card-header" v-if="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div class="liquid-mask"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.glass-card {
  position: relative;
  padding: 24px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  color: white;
  overflow: hidden;
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.2),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.22);
    transform: translateY(-4px);
    box-shadow: 
      0 16px 48px 0 rgba(31, 38, 135, 0.3),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.12);
    
    .liquid-mask {
      animation: liquidMaskFlow 4s ease-in-out infinite;
    }
  }
}

.card-header {
  margin-bottom: 16px;
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #fff, rgba(255, 255, 255, 0.7));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.card-content {
  position: relative;
  z-index: 2;
  font-size: 15px;
  line-height: 1.6;
  
  :deep(p) {
    margin: 0 0 12px 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.liquid-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 30%,
      transparent 60%
    );
    filter: blur(20px);
  }
  
  &::before {
    width: 120px;
    height: 120px;
    top: -60px;
    right: -60px;
  }
  
  &::after {
    width: 150px;
    height: 150px;
    bottom: -75px;
    left: -75px;
  }
}

@keyframes liquidMaskFlow {
  0%, 100% {
    mask-image: radial-gradient(
      circle at 50% 50%,
      black 0%,
      black 100%
    );
  }
  25% {
    mask-image: radial-gradient(
      circle at 30% 40%,
      black 0%,
      black 100%
    );
  }
  50% {
    mask-image: radial-gradient(
      circle at 70% 60%,
      black 0%,
      black 100%
    );
  }
  75% {
    mask-image: radial-gradient(
      circle at 40% 70%,
      black 0%,
      black 100%
    );
  }
}
</style>
