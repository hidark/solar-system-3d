import * as THREE from 'three'

class TextureManager {
  private textureLoader: THREE.TextureLoader
  private textureCache: Map<string, THREE.Texture>
  private loadingManager: THREE.LoadingManager
  private loadedCount: number = 0
  
  constructor(onProgress?: (progress: number) => void) {
    this.textureCache = new Map()
    
    this.loadingManager = new THREE.LoadingManager(
      // onLoad
      () => {
        console.log('All textures loaded')
      },
      // onProgress
      (url, loaded, total) => {
        const progress = (loaded / total) * 100
        onProgress?.(progress)
        console.log(`Loading: ${url} (${loaded}/${total})`)
      },
      // onError
      (url) => {
        console.error(`Error loading texture: ${url}`)
      }
    )
    
    this.textureLoader = new THREE.TextureLoader(this.loadingManager)
  }

  /**
   * 加载单个纹理
   */
  loadTexture(path: string): Promise<THREE.Texture> {
    // 检查缓存
    if (this.textureCache.has(path)) {
      return Promise.resolve(this.textureCache.get(path)!)
    }

    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        path,
        (texture) => {
          // 优化纹理设置
          texture.generateMipmaps = true
          texture.minFilter = THREE.LinearMipmapLinearFilter
          texture.magFilter = THREE.LinearFilter
          texture.anisotropy = 16
          
          // 缓存纹理
          this.textureCache.set(path, texture)
          this.loadedCount++
          resolve(texture)
        },
        undefined,
        (error) => {
          console.error(`Failed to load texture: ${path}`, error)
          // 返回默认颜色纹理
          const defaultTexture = this.createDefaultTexture()
          this.loadedCount++
          resolve(defaultTexture)
        }
      )
    })
  }

  /**
   * 批量加载纹理
   */
  async loadTextures(paths: string[]): Promise<Map<string, THREE.Texture>> {
    const textures = new Map<string, THREE.Texture>()
    
    const promises = paths.map(async (path) => {
      const texture = await this.loadTexture(path)
      const name = path.split('/').pop()?.split('.')[0] || path
      textures.set(name, texture)
    })
    
    await Promise.all(promises)
    return textures
  }

  /**
   * 创建默认纹理
   */
  private createDefaultTexture(): THREE.Texture {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    
    const context = canvas.getContext('2d')!
    context.fillStyle = '#888888'
    context.fillRect(0, 0, 256, 256)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    
    return texture
  }

  /**
   * 创建程序化行星纹理
   */
  createProceduralPlanetTexture(
    color1: string,
    color2: string,
    detail: number = 5
  ): THREE.Texture {
    const size = 1024
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    
    const context = canvas.getContext('2d')!
    
    // 创建渐变背景
    const bgGradient = context.createLinearGradient(0, 0, 0, size)
    bgGradient.addColorStop(0, this.lightenColor(color1, 20))
    bgGradient.addColorStop(0.5, color1)
    bgGradient.addColorStop(1, this.darkenColor(color1, 20))
    context.fillStyle = bgGradient
    context.fillRect(0, 0, size, size)
    
    // 创建横向条纹（类似木星、土星的云带）
    const stripeCount = Math.floor(6 + detail * 2)
    for (let i = 0; i < stripeCount; i++) {
      const y = (i / stripeCount) * size + (Math.random() - 0.5) * 20
      const height = 20 + Math.random() * 60
      const opacity = 0.3 + Math.random() * 0.4
      
      const gradient = context.createLinearGradient(0, y - height/2, 0, y + height/2)
      gradient.addColorStop(0, this.hexToRgba(color2, 0))
      gradient.addColorStop(0.5, this.hexToRgba(color2, opacity))
      gradient.addColorStop(1, this.hexToRgba(color2, 0))
      
      context.fillStyle = gradient
      context.fillRect(0, y - height/2, size, height)
    }
    
    // 添加细节噪声
    for (let i = 0; i < detail * 200; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const radius = Math.random() * 2 + 0.5
      const opacity = Math.random() * 0.15
      
      const noiseGradient = context.createRadialGradient(x, y, 0, x, y, radius)
      noiseGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
      noiseGradient.addColorStop(1, `rgba(255, 255, 255, 0)`)
      
      context.fillStyle = noiseGradient
      context.beginPath()
      context.arc(x, y, radius * 2, 0, Math.PI * 2)
      context.fill()
    }
    
    // 添加特征斑点（类似木星大红斑）
    if (detail > 5) {
      const spotCount = Math.floor(1 + Math.random() * 2)
      for (let i = 0; i < spotCount; i++) {
        const spotX = size * (0.3 + Math.random() * 0.4)
        const spotY = size * (0.3 + Math.random() * 0.4)
        const spotRadius = 30 + Math.random() * 40
        
        const spotGradient = context.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotRadius)
        spotGradient.addColorStop(0, this.hexToRgba(this.darkenColor(color2, 30), 0.6))
        spotGradient.addColorStop(0.7, this.hexToRgba(color2, 0.3))
        spotGradient.addColorStop(1, this.hexToRgba(color2, 0))
        
        context.fillStyle = spotGradient
        context.beginPath()
        context.ellipse(spotX, spotY, spotRadius * 1.5, spotRadius, Math.random() * Math.PI, 0, Math.PI * 2)
        context.fill()
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    
    return texture
  }

  /**
   * 颜色辅助函数
   */
  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  private lightenColor(hex: string, percent: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    
    const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)))
    const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)))
    const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)))
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
  }

  private darkenColor(hex: string, percent: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    
    const newR = Math.max(0, Math.floor(r * (1 - percent / 100)))
    const newG = Math.max(0, Math.floor(g * (1 - percent / 100)))
    const newB = Math.max(0, Math.floor(b * (1 - percent / 100)))
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
  }

  /**
   * 获取已加载纹理数量
   */
  getLoadedCount(): number {
    return this.loadedCount
  }

  /**
   * 清理缓存
   */
  dispose() {
    this.textureCache.forEach(texture => {
      texture.dispose()
    })
    this.textureCache.clear()
    this.loadedCount = 0
  }
}

export default TextureManager

// 创建全局纹理管理器实例
export const textureManager = new TextureManager()