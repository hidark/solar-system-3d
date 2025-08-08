const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-animation">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="4"
            fill="#FFD700"
          >
            <animate
              attributeName="r"
              values="4;8;4"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#4A90E2"
            strokeWidth="1"
            opacity="0.5"
            strokeDasharray="2 4"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      <div className="loading-text">正在加载太阳系...</div>
    </div>
  )
}

export default LoadingScreen