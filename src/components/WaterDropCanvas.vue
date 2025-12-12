<template>
  <div ref="containerRef" class="water-drop-canvas"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let renderer: THREE.WebGLRenderer
let animationId: number | null = null

// 水珠参数
interface WaterDrop {
  mesh: THREE.Mesh
  size: number
  baseY: number
  breathPhase: number
  breathSpeed: number
}

const waterDrops: WaterDrop[] = []
const TOTAL_DROPS = 15 // 总共15个水珠，不会太密集

// 创建液态玻璃水珠材质 - 更立体的效果
function createGlassMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      time: { value: 0 },
      opacity: { value: 0.7 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;
      uniform float time;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        
        // 轻微的呼吸动画
        vec3 pos = position;
        float breathe = sin(time * 0.8) * 0.015;
        pos *= (1.0 + breathe);
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewPosition = -mvPosition.xyz;
        
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vViewPosition;
      uniform float time;
      uniform float opacity;
      
      void main() {
        vec3 viewDir = normalize(vViewPosition);
        vec3 normal = normalize(vNormal);
        
        // 更强的菲涅尔效果（边缘光）
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 3.0);
        
        // 多个光源的高光效果
        vec3 lightDir1 = normalize(vec3(0.5, 0.8, 1.0));
        vec3 lightDir2 = normalize(vec3(-0.3, 0.6, 0.8));
        
        vec3 reflectDir1 = reflect(-lightDir1, normal);
        vec3 reflectDir2 = reflect(-lightDir2, normal);
        
        float specular1 = pow(max(dot(reflectDir1, viewDir), 0.0), 64.0);
        float specular2 = pow(max(dot(reflectDir2, viewDir), 0.0), 32.0);
        float specular = specular1 * 0.8 + specular2 * 0.4;
        
        // 折射效果 - 内部扭曲
        float refraction = sin(vUv.y * 15.0 + time * 0.5) * 0.5 + 0.5;
        refraction *= sin(vUv.x * 15.0 + time * 0.3) * 0.5 + 0.5;
        
        // 3D 深度感
        float depth = smoothstep(0.0, 1.0, length(vPosition.xy) / 1.5);
        
        // 液态玻璃颜色 - iOS 风格
        vec3 baseColor = vec3(0.88, 0.93, 0.98); // 轻微蓝白色
        vec3 highlightColor = vec3(1.0, 1.0, 1.0);
        vec3 edgeColor = vec3(0.7, 0.85, 1.0);
        
        // 混合颜色
        vec3 finalColor = baseColor;
        finalColor = mix(finalColor, highlightColor, specular);
        finalColor = mix(finalColor, edgeColor, fresnel * 0.5);
        
        // 添加内部的流动光泽
        float shimmer = sin(vUv.y * 20.0 + time * 0.8) * 0.5 + 0.5;
        shimmer *= sin(vUv.x * 20.0 - time * 0.6) * 0.5 + 0.5;
        finalColor += vec3(0.1, 0.15, 0.2) * shimmer * 0.15;
        
        // 增强立体感的透明度
        float alpha = opacity * (0.3 + fresnel * 0.7 - depth * 0.2);
        alpha = clamp(alpha, 0.2, 0.9);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  })
}

// 初始化Three.js场景
function initThree() {
  if (!containerRef.value) return
  
  const width = window.innerWidth
  const height = window.innerHeight
  
  // 创建场景
  scene = new THREE.Scene()
  
  // 创建正交相机
  const aspect = width / height
  camera = new THREE.OrthographicCamera(
    -aspect * 500,
    aspect * 500,
    500,
    -500,
    0.1,
    1000
  )
  camera.position.z = 100
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value.appendChild(renderer.domElement)
  
  // 一次性创建所有静止的水珠
  createAllWaterDrops()
}

// 创建所有静止的水珠 - 布满中间区域
function createAllWaterDrops() {
  const width = window.innerWidth
  const height = window.innerHeight
  const aspect = width / height
  
  // 定义中间区域范围（避开左右两侧的控制面板）
  const centerWidth = aspect * 600 // 中间区域宽度
  const centerHeight = 800 // 中间区域高度
  
  // 使用网格布局避免重叠，但添加随机偏移
  const cols = 5
  const rows = 3
  const cellWidth = centerWidth / cols
  const cellHeight = centerHeight / rows
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (waterDrops.length >= TOTAL_DROPS) break
      
      // 水珠大小范围：40px - 100px（更大更明显）
      const size = 40 + Math.random() * 60
      
      // 创建水滴几何体（更圆润的水珠形状）
      const geometry = new THREE.SphereGeometry(size, 48, 48)
      
      // 修改几何体使其呈水滴形状（顶部稍尖，底部圆润）
      const positions = geometry.attributes.position
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i)
        const normalizedY = y / size
        
        // 水滴形状：顶部收窄，底部圆润
        let scale = 1.0
        if (normalizedY > 0.5) {
          // 顶部收窄
          scale = 1.0 - (normalizedY - 0.5) * 0.4
        } else if (normalizedY < -0.3) {
          // 底部微微膨胀
          scale = 1.0 + Math.abs(normalizedY + 0.3) * 0.15
        }
        
        const x = positions.getX(i)
        const z = positions.getZ(i)
        positions.setX(i, x * scale)
        positions.setZ(i, z * scale)
      }
      geometry.computeVertexNormals()
      
      // 创建材质
      const material = createGlassMaterial()
      
      // 创建网格
      const mesh = new THREE.Mesh(geometry, material)
      
      // 计算位置（网格布局 + 随机偏移）
      const baseX = (col - cols / 2 + 0.5) * cellWidth
      const baseY = (row - rows / 2 + 0.5) * cellHeight
      
      // 添加随机偏移，使分布更自然
      const offsetX = (Math.random() - 0.5) * cellWidth * 0.5
      const offsetY = (Math.random() - 0.5) * cellHeight * 0.5
      
      const x = baseX + offsetX
      const y = baseY + offsetY
      
      mesh.position.set(x, y, 0)
      
      // 随机旋转，增加自然感
      mesh.rotation.z = Math.random() * Math.PI * 2
      
      scene.add(mesh)
      
      // 添加到水滴数组
      waterDrops.push({
        mesh,
        size,
        baseY: y,
        breathPhase: Math.random() * Math.PI * 2,
        breathSpeed: 0.5 + Math.random() * 0.5
      })
    }
  }
}

// 更新水滴动画 - 轻微的呼吸和闪烁效果
function updateWaterDrops() {
  const time = Date.now() * 0.001
  
  waterDrops.forEach((drop, i) => {
    // 轻微的上下浮动（呼吸效果）
    drop.breathPhase += drop.breathSpeed * 0.01
    const breathOffset = Math.sin(drop.breathPhase) * 3
    drop.mesh.position.y = drop.baseY + breathOffset
    
    // 非常轻微的旋转
    drop.mesh.rotation.z += 0.0005
    
    // 更新shader时间
    if (drop.mesh.material instanceof THREE.ShaderMaterial) {
      drop.mesh.material.uniforms.time.value = time + i * 0.5
    }
  })
}

// 渲染循环
function animate() {
  if (!renderer || !scene || !camera) return
  
  // 更新水滴动画
  updateWaterDrops()
  
  // 渲染场景
  renderer.render(scene, camera)
  
  animationId = requestAnimationFrame(animate)
}

// 处理窗口大小变化
function handleResize() {
  if (!containerRef.value || !renderer || !camera) return
  
  const width = window.innerWidth
  const height = window.innerHeight
  const aspect = width / height
  
  camera.left = -aspect * 500
  camera.right = aspect * 500
  camera.top = 500
  camera.bottom = -500
  camera.updateProjectionMatrix()
  
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
}

onMounted(() => {
  initThree()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  
  // 清理Three.js资源
  waterDrops.forEach(drop => {
    scene.remove(drop.mesh)
    drop.mesh.geometry.dispose()
    if (drop.mesh.material instanceof THREE.Material) {
      drop.mesh.material.dispose()
    }
  })
  
  if (renderer) {
    renderer.dispose()
  }
  
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.water-drop-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  
  :deep(canvas) {
    display: block;
  }
}
</style>
