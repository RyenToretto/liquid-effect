<template>
  <button class="svg-glass-button" @click="handleClick">
    <svg class="liquid-svg" viewBox="0 0 200 60" preserveAspectRatio="none">
      <defs>
        <filter id="liquid-filter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.02" 
            numOctaves="3" 
            seed="1"
          >
            <animate
              attributeName="baseFrequency"
              values="0.02;0.03;0.02"
              dur="8s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="5" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        
        <filter id="glass-blur">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        
        <linearGradient id="shine-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0.3);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(255,255,255,0.2);stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- 液态玻璃背景 -->
      <rect
        class="liquid-bg"
        x="1"
        y="1"
        width="198"
        height="58"
        rx="16"
        filter="url(#liquid-filter)"
        fill="url(#shine-gradient)"
        opacity="0.4"
      />
      
      <!-- 边框 -->
      <rect
        class="border-rect"
        x="1"
        y="1"
        width="198"
        height="58"
        rx="16"
        fill="none"
        stroke="rgba(255, 255, 255, 0.3)"
        stroke-width="1"
      />
    </svg>
    
    <span class="button-text">
      <slot></slot>
    </span>
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
.svg-glass-button {
  position: relative;
  padding: 14px 32px;
  min-width: 140px;
  background: transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 12px 40px 0 rgba(31, 38, 135, 0.25),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
    
    .liquid-bg {
      opacity: 0.6;
    }
    
    .border-rect {
      stroke: rgba(255, 255, 255, 0.5);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
}

.liquid-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  .liquid-bg {
    transition: opacity 0.4s ease;
  }
  
  .border-rect {
    transition: stroke 0.4s ease;
  }
}

.button-text {
  position: relative;
  z-index: 2;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  display: block;
}
</style>
