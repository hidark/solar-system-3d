import useStore from '../store/useStore'

const ControlPanel = () => {
  const { isPaused, timeSpeed, setPaused, setTimeSpeed } = useStore()

  const speedOptions = [
    { label: '1×', value: 1 },
    { label: '10×', value: 10 },
    { label: '100×', value: 100 },
    { label: '1000×', value: 1000 }
  ]

  return (
    <div className="controls-panel">
      <button
        onClick={() => setPaused(!isPaused)}
        className={isPaused ? '' : 'active'}
      >
        {isPaused ? '▶ 播放' : '⏸ 暂停'}
      </button>

      <div className="speed-controls">
        <span>速度:</span>
        {speedOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setTimeSpeed(option.value)}
            className={timeSpeed === option.value ? 'active' : ''}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ControlPanel