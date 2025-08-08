import useStore from '../store/useStore'

interface InfoPanelProps {
  planet: {
    name: string
    nameZh: string
    radius: number
    distance: number
    orbitSpeed: number
    color: string
  }
}

const InfoPanel: React.FC<InfoPanelProps> = ({ planet }) => {
  const setSelectedPlanet = useStore(state => state.setSelectedPlanet)

  const planetData: Record<string, any> = {
    Mercury: {
      diameter: '4,879 km',
      mass: '3.30 × 10²³ kg',
      dayLength: '58.6 地球日',
      yearLength: '88 地球日',
      temperature: '430°C (白天) / -180°C (夜晚)',
      moons: 0
    },
    Venus: {
      diameter: '12,104 km',
      mass: '4.87 × 10²⁴ kg',
      dayLength: '243 地球日',
      yearLength: '225 地球日',
      temperature: '462°C',
      moons: 0
    },
    Earth: {
      diameter: '12,742 km',
      mass: '5.97 × 10²⁴ kg',
      dayLength: '24 小时',
      yearLength: '365.25 天',
      temperature: '15°C (平均)',
      moons: 1
    },
    Mars: {
      diameter: '6,779 km',
      mass: '6.39 × 10²³ kg',
      dayLength: '24.6 小时',
      yearLength: '687 地球日',
      temperature: '-63°C (平均)',
      moons: 2
    }
  }

  const data = planet.physicalData || planetData[planet.name] || {}
  const legacyData = planetData[planet.name] || {}

  return (
    <div className="info-panel">
      <button
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '5px'
        }}
        onClick={() => setSelectedPlanet(null)}
      >
        ×
      </button>
      
      <h2>{planet.nameZh}</h2>
      <div className="info-item">
        <span className="info-label">英文名</span>
        <span>{planet.name}</span>
      </div>
      <div className="info-item">
        <span className="info-label">直径</span>
        <span>{data.diameter || legacyData.diameter} km</span>
      </div>
      <div className="info-item">
        <span className="info-label">质量</span>
        <span>{data.mass || legacyData.mass} kg</span>
      </div>
      <div className="info-item">
        <span className="info-label">密度</span>
        <span>{data.density} g/cm³</span>
      </div>
      <div className="info-item">
        <span className="info-label">重力</span>
        <span>{data.gravity} m/s²</span>
      </div>
      <div className="info-item">
        <span className="info-label">逃逸速度</span>
        <span>{data.escapeVelocity} km/s</span>
      </div>
      <div className="info-item">
        <span className="info-label">表面温度</span>
        <span>{data.temperature || legacyData.temperature} °C</span>
      </div>
      {data.atmosphere && (
        <div className="info-item">
          <span className="info-label">大气成分</span>
          <span style={{ fontSize: '12px' }}>{data.atmosphere}</span>
        </div>
      )}
      <div className="info-item">
        <span className="info-label">轨道距离</span>
        <span>{planet.distance.toFixed(2)} AU</span>
      </div>
    </div>
  )
}

export default InfoPanel