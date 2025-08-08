import { useEffect, useState } from 'react'
import { textureManager } from '../utils/TextureManager'

const TextureLoadingIndicator = () => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    // Monitor texture loading
    const checkTextureStatus = () => {
      const totalTextures = 14 // Total number of textures we're loading
      const loadedTextures = textureManager.getLoadedCount()
      const progressPercent = (loadedTextures / totalTextures) * 100
      
      setProgress(progressPercent)
      
      if (progressPercent >= 100) {
        setTimeout(() => setLoading(false), 500)
      }
    }
    
    const interval = setInterval(checkTextureStatus, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  if (!loading) return null
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '10px 20px',
      borderRadius: '5px',
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '14px',
      zIndex: 1000,
      minWidth: '200px'
    }}>
      <div>加载纹理中... {Math.round(progress)}%</div>
      <div style={{
        width: '100%',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '2px',
        marginTop: '5px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: '#4A90E2',
          borderRadius: '2px',
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  )
}

export default TextureLoadingIndicator