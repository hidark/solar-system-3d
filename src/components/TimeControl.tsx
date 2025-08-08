import { useState, useEffect } from 'react'
import useStore from '../store/useStore'
import './TimeControl.css'

const TimeControl = () => {
  const { isPaused, timeSpeed, setPaused, setTimeSpeed, currentDate, setCurrentDate } = useStore()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [inputDate, setInputDate] = useState('')
  const [inputTime, setInputTime] = useState('')

  useEffect(() => {
    // 初始化当前日期
    const now = new Date()
    setInputDate(now.toISOString().split('T')[0])
    setInputTime(now.toTimeString().slice(0, 5))
  }, [])

  // 格式化显示时间
  const formatDateTime = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const speedOptions = [
    { label: '暂停', value: 0 },
    { label: '1秒', value: 1 },
    { label: '1分', value: 60 },
    { label: '1时', value: 3600 },
    { label: '1天', value: 86400 },
    { label: '1周', value: 604800 },
    { label: '1月', value: 2592000 },
    { label: '1年', value: 31536000 }
  ]

  const handleDateJump = () => {
    if (inputDate && inputTime) {
      const newDate = new Date(`${inputDate}T${inputTime}:00`)
      setCurrentDate(newDate)
      setShowDatePicker(false)
    }
  }

  const handlePresetJump = (preset: string) => {
    let targetDate: Date
    
    switch (preset) {
      case 'now':
        targetDate = new Date()
        break
      case 'eclipse2024':
        targetDate = new Date('2024-04-08T18:00:00')
        break
      case 'halley':
        targetDate = new Date('2061-07-28T00:00:00')
        break
      case 'voyager':
        targetDate = new Date('1977-09-05T12:00:00')
        break
      case 'apollo11':
        targetDate = new Date('1969-07-20T20:17:00')
        break
      default:
        targetDate = new Date()
    }
    
    setCurrentDate(targetDate)
    setInputDate(targetDate.toISOString().split('T')[0])
    setInputTime(targetDate.toTimeString().slice(0, 5))
  }

  return (
    <div className="time-control">
      <div className="time-control-main">
        {/* 播放控制 */}
        <div className="time-play-controls">
          <button
            className={`time-btn ${isPaused ? '' : 'active'}`}
            onClick={() => setPaused(!isPaused)}
          >
            {isPaused ? '▶' : '⏸'}
          </button>
          
          <button
            className="time-btn"
            onClick={() => handlePresetJump('now')}
            title="跳转到现在"
          >
            ⏺
          </button>
        </div>

        {/* 时间显示 */}
        <div className="time-display" onClick={() => setShowDatePicker(!showDatePicker)}>
          <div className="time-label">时间</div>
          <div className="time-value">{formatDateTime(currentDate)}</div>
        </div>

        {/* 速度控制 */}
        <div className="time-speed-controls">
          <div className="speed-label">速度: 1秒 = </div>
          <div className="speed-buttons">
            {speedOptions.map(option => (
              <button
                key={option.value}
                className={`speed-btn ${timeSpeed === option.value ? 'active' : ''}`}
                onClick={() => {
                  setTimeSpeed(option.value)
                  if (option.value === 0) {
                    setPaused(true)
                  } else {
                    setPaused(false)
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 日期选择器 */}
      {showDatePicker && (
        <div className="date-picker-popup">
          <div className="date-picker-header">
            <h3>跳转到特定时间</h3>
            <button 
              className="close-btn"
              onClick={() => setShowDatePicker(false)}
            >
              ×
            </button>
          </div>
          
          <div className="date-picker-content">
            <div className="date-input-group">
              <label>日期</label>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                min="1900-01-01"
                max="2100-12-31"
              />
            </div>
            
            <div className="date-input-group">
              <label>时间</label>
              <input
                type="time"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
              />
            </div>
            
            <button 
              className="jump-btn"
              onClick={handleDateJump}
            >
              跳转
            </button>
          </div>
          
          <div className="preset-dates">
            <div className="preset-title">历史事件</div>
            <div className="preset-list">
              <button onClick={() => handlePresetJump('apollo11')}>
                阿波罗11号登月 (1969-07-20)
              </button>
              <button onClick={() => handlePresetJump('voyager')}>
                旅行者1号发射 (1977-09-05)
              </button>
              <button onClick={() => handlePresetJump('eclipse2024')}>
                2024年日全食 (2024-04-08)
              </button>
              <button onClick={() => handlePresetJump('halley')}>
                哈雷彗星回归 (2061-07-28)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeControl