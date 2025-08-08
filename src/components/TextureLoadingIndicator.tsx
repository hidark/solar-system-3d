import { useEffect, useState } from 'react'
import { textureManager } from '../utils/TextureManager'

const TextureLoadingIndicator = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    // Monitor texture loading
    const checkTextureStatus = () => {
      const progressPercent = textureManager.getLoadingProgress()
      const totalCount = textureManager.getTotalCount()
      const loadedCount = textureManager.getLoadedCount()
      
      // Only show if we're actually loading textures
      if (totalCount > 0 && loadedCount < totalCount) {
        setLoading(true)
        setProgress(progressPercent)
      } else if (loadedCount >= totalCount && totalCount > 0) {
        setProgress(100)
        // Hide after a short delay
        setTimeout(() => {
          setLoading(false)
          if (interval) clearInterval(interval)
        }, 1000)
      }
    }
    
    // Start checking after a short delay to allow initial texture requests
    setTimeout(() => {
      checkTextureStatus()
      interval = setInterval(checkTextureStatus, 200)
    }, 100)
    
    return () => {
      if (interval) clearInterval(interval)
    }
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