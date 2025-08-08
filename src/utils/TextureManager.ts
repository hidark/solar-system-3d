import * as THREE from 'three'

class TextureManager {
  private textureLoader: THREE.TextureLoader
  private textureCache: Map<string, THREE.Texture>
  private loadingManager: THREE.LoadingManager
  
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
          resolve(texture)
        },
        undefined,
        (error) => {
          console.error(`Failed to load texture: ${path}`, error)
          // 返回默认颜色纹理
          const defaultTexture = this.createDefaultTexture()
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
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    
    const context = canvas.getContext('2d')!
    
    // 创建渐变
    const gradient = context.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, color1)
    gradient.addColorStop(0.5, color2)
    gradient.addColorStop(1, color1)
    
    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)
    
    // 添加噪声细节
    for (let i = 0; i < detail * 1000; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const radius = Math.random() * 2
      const opacity = Math.random() * 0.1
      
      context.fillStyle = `rgba(255, 255, 255, ${opacity})`
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    
    return texture
  }

  /**
   * 清理缓存
   */
  dispose() {
    this.textureCache.forEach(texture => {
      texture.dispose()
    })
    this.textureCache.clear()
  }
}

export default TextureManager

// 创建全局纹理管理器实例
export const textureManager = new TextureManager()