<template>
  <button class="glass-button" @click="handleClick">
    <span class="button-content">
      <slot></slot>
    </span>
    <div class="liquid-effect"></div>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.glass-button {
  position: relative;
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px 0 rgba(31, 38, 135, 0.25),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
    
    .liquid-effect::before {
      animation: liquidFlowBefore 2s ease-in-out infinite;
    }
    
    .liquid-effect::after {
      animation: liquidFlowAfter 2s ease-in-out infinite;
    }
  }
  
  &:active {
    transform: translateY(0);
    background: rgba(255, 255, 255, 0.15);
  }
}

.button-content {
  position: relative;
  z-index: 2;
  display: block;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.liquid-effect {
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
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 40%,
      transparent 70%
    );
  }
  
  &::before {
    width: 60px;
    height: 60px;
    top: -30px;
    left: -30px;
    opacity: 0;
  }
  
  &::after {
    width: 80px;
    height: 80px;
    bottom: -40px;
    right: -40px;
    opacity: 0;
  }
}

@keyframes liquidFlowBefore {
  0%, 100% {
    opacity: 0;
    transform: translate(0, 0) scale(1);
  }
  25% {
    opacity: 1;
    transform: translate(20px, 20px) scale(1.2);
  }
  50% {
    opacity: 0;
    transform: translate(40px, 40px) scale(0.8);
  }
}

@keyframes liquidFlowAfter {
  0%, 50% {
    opacity: 0;
    transform: translate(0, 0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-15px, -15px) scale(1.1);
  }
  75%, 100% {
    opacity: 0;
    transform: translate(-30px, -30px) scale(0.9);
  }
}
</style>
