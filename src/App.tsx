import { useState } from 'react'

function App() {
  const [hoursPerUnit, setHoursPerUnit] = useState('40')
  const [timeUnit, setTimeUnit] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [hourlyRate, setHourlyRate] = useState('300')

  const getMonthlyHours = (hours: number, unit: 'daily' | 'weekly' | 'monthly') => {
    switch (unit) {
      case 'daily': return hours * 20  // 20 pracovních dnů
      case 'weekly': return hours * 4  // 4 týdny
      case 'monthly': return hours     // bez převodu
    }
  }

  const calculateSavings = (hours: number, rate: number, unit: 'daily' | 'weekly' | 'monthly') => {
    if (isNaN(hours) || isNaN(rate)) return { monthly: 0, quarterly: 0, yearly: 0 }
    const monthlyHours = getMonthlyHours(hours, unit)
    const monthlySavings = monthlyHours * rate
    return {
      monthly: monthlySavings,
      quarterly: monthlySavings * 3,
      yearly: monthlySavings * 12
    }
  }

  const getMaxHours = (unit: 'daily' | 'weekly' | 'monthly') => {
    switch (unit) {
      case 'daily': return 16
      case 'weekly': return 100
      case 'monthly': return 400
    }
  }

  const handleHoursChange = (value: string) => {
    if (value === '') {
      setHoursPerUnit('')
      return
    }
    const num = Number(value)
    const maxHours = getMaxHours(timeUnit)
    if (!isNaN(num) && num >= 0 && num <= maxHours) {
      setHoursPerUnit(value)
    }
  }

  const handleRateChange = (value: string) => {
    if (value === '') {
      setHourlyRate('')
      return
    }
    const num = Number(value)
    if (!isNaN(num) && num >= 0 && num <= 2000) {
      setHourlyRate(value)
    }
  }

  const savings = calculateSavings(Number(hoursPerUnit) || 0, Number(hourlyRate) || 0, timeUnit)

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-custom p-5 sm:p-8 lg:p-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Kalkulačka úspor</h1>
          <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base">
            Zjistěte, kolik vám může ušetřit automatizace rutinních úkolů
          </p>
        </div>
        
        <div className="space-y-8">
          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-3 sm:mb-2 flex items-center gap-2">
              Počet hodin
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as 'daily' | 'weekly' | 'monthly')}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base sm:text-sm py-1 sm:py-0"
              >
                <option value="daily">denně</option>
                <option value="weekly">týdně</option>
                <option value="monthly">měsíčně</option>
              </select>
            </label>
            <div className="grid grid-cols-[1fr_4.5rem_2.5rem] sm:grid-cols-[1fr_4rem_2.5rem] gap-3 sm:gap-4 items-center">
              <input
                type="range"
                min="0"
                max={getMaxHours(timeUnit)}
                value={hoursPerUnit || '0'}
                onChange={(e) => handleHoursChange(e.target.value)}
                className="w-full h-3 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer touch-action-manipulation"
              />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={hoursPerUnit}
                onChange={(e) => handleHoursChange(e.target.value)}
                className="w-full px-2 py-2 sm:py-1 text-right rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base sm:text-sm"
              />
              <span className="text-base sm:text-sm text-gray-600 w-[2.5rem]">h</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vaše běžná hodinová mzda
            </label>
            <div className="grid grid-cols-[1fr_4rem_2.5rem] gap-4 items-center">
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={hourlyRate || '0'}
                onChange={(e) => handleRateChange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={hourlyRate}
                onChange={(e) => handleRateChange(e.target.value)}
                className="w-full px-2 py-1 text-right rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 w-[2.5rem]">Kč/h</span>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Kolik můžete ušetřit díky automatizaci?</h2>
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div className="bg-surface p-4 rounded-xl border border-gray-100">
                <p className="text-gray-800 flex items-center text-sm">
                  <span className="text-primary mr-2">💰</span>
                  Měsíčně: <span className="font-bold ml-1">{savings.monthly.toLocaleString()} Kč</span>
                </p>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-gray-100">
                <p className="text-gray-800 flex items-center text-sm">
                  <span className="text-primary mr-2">📈</span>
                  Kvartálně: <span className="font-bold ml-1">{savings.quarterly.toLocaleString()} Kč</span>
                </p>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-gray-100">
                <p className="text-gray-800 flex items-center text-sm">
                  <span className="text-primary mr-2">🎯</span>
                  Ročně: <span className="font-bold ml-1">{savings.yearly.toLocaleString()} Kč</span>
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8 text-center space-y-3">
                <a 
                  href="https://thrilled-embeds-105328.framer.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-primary text-white py-4 px-6 rounded-xl font-medium text-center hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-sm min-h-[48px] sm:min-h-[44px]"
                >
                  Získejte návrh automatizace zdarma
                </a>
                <p className="text-sm text-gray-500">
                  Ušetřete až {savings.yearly.toLocaleString()} Kč ročně
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App