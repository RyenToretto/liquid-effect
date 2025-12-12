<template>
  <div class="svg-glass-card">
    <svg class="liquid-svg" viewBox="0 0 300 200" preserveAspectRatio="none">
      <defs>
        <filter id="liquid-card-filter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.015" 
            numOctaves="4" 
            seed="2"
          >
            <animate
              attributeName="baseFrequency"
              values="0.015;0.025;0.015"
              dur="10s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="seed"
              values="2;10;2"
              dur="15s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="8">
            <animate
              attributeName="scale"
              values="8;12;8"
              dur="6s"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
          <feGaussianBlur stdDeviation="1" />
        </filter>
        
        <radialGradient id="card-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0.35);stop-opacity:1">
            <animate
              attributeName="stop-color"
              values="rgba(255,255,255,0.35);rgba(200,220,255,0.4);rgba(255,255,255,0.35)"
              dur="8s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
        </radialGradient>
        
        <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0.4);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(255,255,255,0.2);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(255,255,255,0.35);stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- 液态玻璃背景层 -->
      <rect
        class="liquid-bg-layer1"
        x="2"
        y="2"
        width="296"
        height="196"
        rx="20"
        filter="url(#liquid-card-filter)"
        fill="url(#card-gradient)"
        opacity="0.5"
      />
      
      <!-- 第二层液态效果 -->
      <ellipse
        class="liquid-bubble"
        cx="150"
        cy="100"
        rx="80"
        ry="60"
        filter="url(#liquid-card-filter)"
        fill="rgba(255, 255, 255, 0.2)"
        opacity="0.3"
      >
        <animate
          attributeName="cx"
          values="150;180;150;120;150"
          dur="20s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="100;80;100;120;100"
          dur="15s"
          repeatCount="indefinite"
        />
      </ellipse>
      
      <!-- 平整的边框 -->
      <rect
        class="border-rect"
        x="1.5"
        y="1.5"
        width="297"
        height="197"
        rx="20"
        fill="none"
        stroke="url(#border-gradient)"
        stroke-width="1.5"
      />
    </svg>
    
    <div class="card-content-wrapper">
      <div class="card-header" v-if="title">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.svg-glass-card {
  position: relative;
  min-height: 150px;
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.2),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.07);
    box-shadow: 
      0 16px 48px 0 rgba(31, 38, 135, 0.3),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.12);
    
    .liquid-bg-layer1 {
      opacity: 0.7;
    }
    
    .liquid-bubble {
      opacity: 0.5;
    }
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
  
  .liquid-bg-layer1,
  .liquid-bubble {
    transition: opacity 0.6s ease;
  }
}

.card-content-wrapper {
  position: relative;
  z-index: 2;
  padding: 24px;
}

.card-header {
  margin-bottom: 16px;
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #fff, rgba(255, 255, 255, 0.7));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.card-content {
  font-size: 15px;
  line-height: 1.6;
  color: white;
  
  :deep(p) {
    margin: 0 0 12px 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
