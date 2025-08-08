export interface PlanetData {
  id: string
  name: string
  nameZh: string
  radius: number        // 相对于地球半径
  distance: number      // AU（天文单位）
  eccentricity: number  // 离心率
  inclination: number   // 轨道倾角（度）
  orbitalPeriod: number // 公转周期（地球年）
  rotationPeriod: number // 自转周期（地球日）
  axialTilt: number     // 轴倾角（度）
  color: string
  texture?: string
  hasRings?: boolean
  ringData?: {
    innerRadius: number
    outerRadius: number
    texture?: string
  }
  moons?: Array<{
    name: string
    nameZh: string
    radius: number
    distance: number
    period: number
  }>
  physicalData: {
    mass: string          // kg
    diameter: string      // km
    density: string       // g/cm³
    gravity: string       // m/s²
    escapeVelocity: string // km/s
    temperature: string   // °C
    atmosphere?: string
  }
}

// 真实的行星数据（按比例缩放用于3D展示）
export const planetsData: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    nameZh: '水星',
    radius: 0.383,
    distance: 0.387,
    eccentricity: 0.2056,
    inclination: 7.0,
    orbitalPeriod: 0.241,
    rotationPeriod: 58.646,
    axialTilt: 0.034,
    color: '#8C8C8C',
    texture: '/textures/mercury.jpg',
    moons: [],
    physicalData: {
      mass: '3.30 × 10²³',
      diameter: '4,879',
      density: '5.43',
      gravity: '3.7',
      escapeVelocity: '4.3',
      temperature: '430 (昼) / -180 (夜)',
      atmosphere: '极稀薄'
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    nameZh: '金星',
    radius: 0.949,
    distance: 0.723,
    eccentricity: 0.0068,
    inclination: 3.39,
    orbitalPeriod: 0.615,
    rotationPeriod: -243.025, // 负值表示逆向自转
    axialTilt: 177.36,
    color: '#FFC649',
    texture: '/textures/venus.jpg',
    moons: [],
    physicalData: {
      mass: '4.87 × 10²⁴',
      diameter: '12,104',
      density: '5.24',
      gravity: '8.87',
      escapeVelocity: '10.36',
      temperature: '462',
      atmosphere: 'CO₂ (96.5%), N₂ (3.5%)'
    }
  },
  {
    id: 'earth',
    name: 'Earth',
    nameZh: '地球',
    radius: 1,
    distance: 1,
    eccentricity: 0.0167,
    inclination: 0,
    orbitalPeriod: 1,
    rotationPeriod: 1,
    axialTilt: 23.44,
    color: '#4A90E2',
    texture: '/textures/earth.jpg',
    moons: [
      {
        name: 'Moon',
        nameZh: '月球',
        radius: 0.2724,
        distance: 0.00257, // AU
        period: 0.0748 // 年
      }
    ],
    physicalData: {
      mass: '5.97 × 10²⁴',
      diameter: '12,742',
      density: '5.52',
      gravity: '9.8',
      escapeVelocity: '11.2',
      temperature: '15',
      atmosphere: 'N₂ (78%), O₂ (21%), Ar (0.93%)'
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    nameZh: '火星',
    radius: 0.532,
    distance: 1.524,
    eccentricity: 0.0934,
    inclination: 1.85,
    orbitalPeriod: 1.881,
    rotationPeriod: 1.026,
    axialTilt: 25.19,
    color: '#CD5C5C',
    texture: '/textures/mars.jpg',
    moons: [
      {
        name: 'Phobos',
        nameZh: '火卫一',
        radius: 0.0017,
        distance: 0.0000627,
        period: 0.000863
      },
      {
        name: 'Deimos',
        nameZh: '火卫二',
        radius: 0.00097,
        distance: 0.000157,
        period: 0.00346
      }
    ],
    physicalData: {
      mass: '6.39 × 10²³',
      diameter: '6,779',
      density: '3.93',
      gravity: '3.71',
      escapeVelocity: '5.03',
      temperature: '-63',
      atmosphere: 'CO₂ (95.3%), N₂ (2.7%), Ar (1.6%)'
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    nameZh: '木星',
    radius: 11.21,
    distance: 5.204,
    eccentricity: 0.0489,
    inclination: 1.31,
    orbitalPeriod: 11.862,
    rotationPeriod: 0.414,
    axialTilt: 3.13,
    color: '#DAA520',
    texture: '/textures/jupiter.jpg',
    moons: [
      {
        name: 'Io',
        nameZh: '木卫一',
        radius: 0.286,
        distance: 0.00282,
        period: 0.00485
      },
      {
        name: 'Europa',
        nameZh: '木卫二',
        radius: 0.245,
        distance: 0.00449,
        period: 0.00972
      },
      {
        name: 'Ganymede',
        nameZh: '木卫三',
        radius: 0.413,
        distance: 0.00716,
        period: 0.0196
      },
      {
        name: 'Callisto',
        nameZh: '木卫四',
        radius: 0.378,
        distance: 0.0126,
        period: 0.0457
      }
    ],
    physicalData: {
      mass: '1.90 × 10²⁷',
      diameter: '139,820',
      density: '1.33',
      gravity: '24.79',
      escapeVelocity: '59.5',
      temperature: '-108',
      atmosphere: 'H₂ (89%), He (10%), CH₄, NH₃'
    }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    nameZh: '土星',
    radius: 9.45,
    distance: 9.582,
    eccentricity: 0.0565,
    inclination: 2.49,
    orbitalPeriod: 29.457,
    rotationPeriod: 0.444,
    axialTilt: 26.73,
    color: '#F4E7D7',
    texture: '/textures/saturn.jpg',
    hasRings: true,
    ringData: {
      innerRadius: 1.2,
      outerRadius: 2.3,
      texture: '/textures/saturn-ring.png'
    },
    moons: [
      {
        name: 'Titan',
        nameZh: '土卫六',
        radius: 0.404,
        distance: 0.00817,
        period: 0.0436
      },
      {
        name: 'Enceladus',
        nameZh: '土卫二',
        radius: 0.0395,
        distance: 0.00159,
        period: 0.00375
      }
    ],
    physicalData: {
      mass: '5.68 × 10²⁶',
      diameter: '116,460',
      density: '0.69',
      gravity: '10.44',
      escapeVelocity: '35.5',
      temperature: '-139',
      atmosphere: 'H₂ (96%), He (3%), CH₄, NH₃'
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    nameZh: '天王星',
    radius: 4.01,
    distance: 19.201,
    eccentricity: 0.0457,
    inclination: 0.77,
    orbitalPeriod: 84.021,
    rotationPeriod: -0.718, // 负值表示逆向自转
    axialTilt: 97.77, // 几乎横躺
    color: '#4FD0E0',
    texture: '/textures/uranus.jpg',
    hasRings: true,
    ringData: {
      innerRadius: 1.4,
      outerRadius: 1.8,
      texture: '/textures/uranus-ring.png'
    },
    moons: [
      {
        name: 'Miranda',
        nameZh: '天卫五',
        radius: 0.037,
        distance: 0.000868,
        period: 0.00386
      },
      {
        name: 'Titania',
        nameZh: '天卫三',
        radius: 0.124,
        distance: 0.00292,
        period: 0.0238
      }
    ],
    physicalData: {
      mass: '8.68 × 10²⁵',
      diameter: '50,724',
      density: '1.27',
      gravity: '8.87',
      escapeVelocity: '21.3',
      temperature: '-197',
      atmosphere: 'H₂ (82%), He (15%), CH₄ (2%)'
    }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    nameZh: '海王星',
    radius: 3.88,
    distance: 30.047,
    eccentricity: 0.0113,
    inclination: 1.77,
    orbitalPeriod: 164.79,
    rotationPeriod: 0.671,
    axialTilt: 28.32,
    color: '#4B70DD',
    texture: '/textures/neptune.jpg',
    moons: [
      {
        name: 'Triton',
        nameZh: '海卫一',
        radius: 0.212,
        distance: 0.00237,
        period: -0.0161 // 逆行轨道
      }
    ],
    physicalData: {
      mass: '1.02 × 10²⁶',
      diameter: '49,244',
      density: '1.64',
      gravity: '11.15',
      escapeVelocity: '23.5',
      temperature: '-201',
      atmosphere: 'H₂ (80%), He (19%), CH₄ (1%)'
    }
  },
  {
    id: 'pluto',
    name: 'Pluto',
    nameZh: '冥王星',
    radius: 0.186,
    distance: 39.482,
    eccentricity: 0.2488,
    inclination: 17.16,
    orbitalPeriod: 247.94,
    rotationPeriod: -6.387,
    axialTilt: 122.53,
    color: '#9CA4AB',
    texture: '/textures/pluto.jpg',
    moons: [
      {
        name: 'Charon',
        nameZh: '冥卫一',
        radius: 0.095,
        distance: 0.000131,
        period: 0.0175
      }
    ],
    physicalData: {
      mass: '1.31 × 10²²',
      diameter: '2,377',
      density: '1.86',
      gravity: '0.62',
      escapeVelocity: '1.21',
      temperature: '-229',
      atmosphere: 'N₂, CH₄, CO (极稀薄)'
    }
  }
]

// 3D显示用的缩放参数
export const scaleConfig = {
  // 距离缩放（让行星分布更合理）
  distanceScale: {
    mercury: 10,
    venus: 15,
    earth: 20,
    mars: 26,
    jupiter: 45,
    saturn: 70,
    uranus: 100,
    neptune: 130,
    pluto: 150
  },
  // 半径缩放（让小行星更容易看见）
  radiusScale: {
    sun: 4,
    mercury: 0.8,
    venus: 1.2,
    earth: 1.3,
    mars: 1,
    jupiter: 5,
    saturn: 4.5,
    uranus: 2.5,
    neptune: 2.4,
    pluto: 0.6
  }
}