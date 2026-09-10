import React, { useState } from 'react'
import { Sun, CloudRain, Wind, Snowflake, Shirt, Umbrella, ShieldAlert, Sparkles, Compass } from 'lucide-react'
import { sound } from '../../utils/sound'

export default function WeatherSandbox() {
  const [temp, setTemp] = useState(18)
  const [condition, setCondition] = useState('rain') // 'clear', 'rain', 'wind', 'snow'
  const [unit, setUnit] = useState('C') // 'C' or 'F'

  const displayTemp = unit === 'C' ? temp : Math.round((temp * 9) / 5 + 32)

  // Recommendation engine
  const getAdvice = () => {
    let layers = []
    let accessories = []
    let status = { text: 'Optimal Mild', color: 'text-emerald-400', badge: 'Comfort Zone' }

    if (temp < 0) {
      layers = ['Heavy Down Parka', 'Thermal Fleece Base Layer', 'Insulated Winter Pants']
      accessories = ['Wool Beanie', 'Thermal Gloves', 'Waterproof Snow Boots']
      status = { text: 'Extreme Cold Warning', color: 'text-cyan-400', badge: 'Severe Arctic' }
    } else if (temp < 12) {
      layers = ['Puffer Jacket / Wool Coat', 'Long-Sleeve Knit Sweater', 'Heavy Denim Jeans']
      accessories = ['Light Scarf', 'Insulated Socks', 'Leather Boots']
      status = { text: 'Chilly Conditions', color: 'text-blue-400', badge: 'Layering Required' }
    } else if (temp < 22) {
      layers = ['Light Zip-Up Jacket or Bomber', 'Cotton Crewneck / Shirt', 'Casual Chinos']
      accessories = ['Sneakers', 'Canvas Watch']
      status = { text: 'Mild & Pleasant', color: 'text-emerald-400', badge: 'Ideal Weather' }
    } else if (temp < 32) {
      layers = ['Breathable Cotton / Linen T-Shirt', 'Light Trousers or Shorts']
      accessories = ['UV-Blocking Sunglasses', 'Breathable Mesh Runners']
      status = { text: 'Warm Summer Climate', color: 'text-amber-400', badge: 'Hydration Recommended' }
    } else {
      layers = ['Ultra-Light Moisture-Wicking Tee', 'Linen Shorts']
      accessories = ['Polarized Sunglasses', 'Sun Protection Hat', 'SPF 50+ Lotion']
      status = { text: 'Intense Heat Alert', color: 'text-rose-400', badge: 'Extreme UV' }
    }

    // Condition overrides
    if (condition === 'rain') {
      accessories.unshift('Windproof Inverted Umbrella')
      layers[0] = `Water-Resistant Shell or Trench (${layers[0]})`
    } else if (condition === 'wind') {
      accessories.push('Windbreak Eyewear')
      layers[0] = `Windstopper Shell (${layers[0]})`
    } else if (condition === 'snow') {
      accessories.unshift('Thermal Balaclava')
    }

    return { layers, accessories, status }
  }

  const advice = getAdvice()

  return (
    <div className="bg-gray-950/90 border border-purple-500/30 rounded-2xl p-5 text-gray-100 font-sans shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono tracking-wide text-purple-300">
              LIVE SIMULATION: WEATHER-TO-APPAREL MATRIX
            </h4>
            <p className="text-xs text-gray-400">
              Drag temperature and condition triggers to test the situational clothing recommendation engine
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 bg-gray-900 p-1 rounded-lg border border-gray-800 text-xs font-mono">
          <button
            onClick={() => {
              setUnit('C')
              sound.playClick()
            }}
            className={`px-2 py-0.5 rounded ${unit === 'C' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
          >
            °C
          </button>
          <button
            onClick={() => {
              setUnit('F')
              sound.playClick()
            }}
            className={`px-2 py-0.5 rounded ${unit === 'F' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {/* Temperature Slider */}
        <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Simulated Temperature
            </span>
            <span className="text-xl font-mono font-bold text-purple-300">
              {displayTemp}°{unit}
            </span>
          </div>
          <input
            type="range"
            min="-5"
            max="45"
            value={temp}
            onChange={(e) => {
              setTemp(Number(e.target.value))
              sound.playHover()
            }}
            className="w-full accent-purple-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
            <span>-5°C (Freezing)</span>
            <span>20°C (Mild)</span>
            <span>45°C (Scorching)</span>
          </div>
        </div>

        {/* Condition Selector */}
        <div className="bg-gray-900/70 p-3.5 rounded-xl border border-gray-800">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
            Atmospheric Condition
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'clear', label: 'Clear', icon: Sun },
              { id: 'rain', label: 'Rain', icon: CloudRain },
              { id: 'wind', label: 'Windy', icon: Wind },
              { id: 'snow', label: 'Snow', icon: Snowflake }
            ].map((c) => {
              const Icon = c.icon
              const isActive = condition === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setCondition(c.id)
                    sound.playClick()
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-mono flex flex-col items-center justify-center space-y-1 transition ${
                    isActive
                      ? 'bg-purple-600/30 border border-purple-400 text-purple-200'
                      : 'bg-gray-950 text-gray-400 border border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{c.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Recommendation Output */}
      <div className="bg-gray-900/90 border border-purple-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
              Computed Apparel Strategy
            </span>
          </div>
          <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full bg-gray-800 border border-gray-700 ${advice.status.color}`}>
            {advice.status.badge} // {advice.status.text}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="space-y-1.5">
            <span className="text-purple-400 font-bold block mb-1">Recommended Layers:</span>
            {advice.layers.map((layer, i) => (
              <div key={i} className="flex items-center space-x-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>{layer}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <span className="text-cyan-400 font-bold block mb-1">Essential Gear & Footwear:</span>
            {advice.accessories.map((acc, i) => (
              <div key={i} className="flex items-center space-x-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{acc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
