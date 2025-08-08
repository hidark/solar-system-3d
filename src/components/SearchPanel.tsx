import { useState, useMemo } from 'react'
import { planetsData } from '../data/planetsData'
import useStore from '../store/useStore'
import './SearchPanel.css'

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { setSelectedPlanet, selectedPlanet } = useStore()

  // 搜索过滤
  const filteredPlanets = useMemo(() => {
    if (!searchTerm) return planetsData
    
    const term = searchTerm.toLowerCase()
    return planetsData.filter(planet => 
      planet.name.toLowerCase().includes(term) ||
      planet.nameZh.includes(term) ||
      planet.moons?.some(moon => 
        moon.name.toLowerCase().includes(term) ||
        moon.nameZh.includes(term)
      )
    )
  }, [searchTerm])

  // 快速导航
  const quickLinks = [
    { id: 'sun', name: '太阳', icon: '☀️' },
    { id: 'earth', name: '地球', icon: '🌍' },
    { id: 'mars', name: '火星', icon: '🔴' },
    { id: 'jupiter', name: '木星', icon: '🟤' },
    { id: 'saturn', name: '土星', icon: '🟡' }
  ]

  const handlePlanetSelect = (planet: typeof planetsData[0]) => {
    setSelectedPlanet({
      name: planet.name,
      nameZh: planet.nameZh,
      radius: planet.radius,
      distance: planet.distance,
      orbitSpeed: 1 / planet.orbitalPeriod,
      color: planet.color,
      physicalData: planet.physicalData
    })
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleQuickNav = (id: string) => {
    const planet = planetsData.find(p => p.id === id)
    if (planet) {
      handlePlanetSelect(planet)
    }
  }

  return (
    <div className="search-panel">
      {/* 搜索按钮 */}
      <button 
        className="search-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="搜索"
      >
        🔍
      </button>

      {/* 搜索面板 */}
      {isOpen && (
        <div className="search-container">
          <div className="search-header">
            <input
              type="text"
              placeholder="搜索天体..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              autoFocus
            />
            <button 
              className="search-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* 快速导航 */}
          <div className="quick-nav">
            <div className="quick-nav-title">快速导航</div>
            <div className="quick-nav-items">
              {quickLinks.map(link => (
                <button
                  key={link.id}
                  className="quick-nav-item"
                  onClick={() => handleQuickNav(link.id)}
                >
                  <span className="quick-nav-icon">{link.icon}</span>
                  <span className="quick-nav-name">{link.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 搜索结果 */}
          <div className="search-results">
            <div className="search-results-title">
              {searchTerm ? '搜索结果' : '所有天体'}
            </div>
            <div className="search-results-list">
              {filteredPlanets.map(planet => (
                <div key={planet.id} className="search-result-group">
                  <button
                    className={`search-result-item ${
                      selectedPlanet?.name === planet.name ? 'selected' : ''
                    }`}
                    onClick={() => handlePlanetSelect(planet)}
                  >
                    <div className="search-result-main">
                      <span className="search-result-name">{planet.nameZh}</span>
                      <span className="search-result-name-en">{planet.name}</span>
                    </div>
                    <div className="search-result-info">
                      <span>距离: {planet.distance.toFixed(2)} AU</span>
                      <span>周期: {planet.orbitalPeriod.toFixed(2)} 年</span>
                    </div>
                  </button>
                  
                  {/* 卫星列表 */}
                  {planet.moons && planet.moons.length > 0 && (
                    <div className="moon-list">
                      {planet.moons.map(moon => (
                        <div key={moon.name} className="moon-item">
                          <span className="moon-icon">🌙</span>
                          <span>{moon.nameZh}</span>
                          <span className="moon-name-en">({moon.name})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPanel