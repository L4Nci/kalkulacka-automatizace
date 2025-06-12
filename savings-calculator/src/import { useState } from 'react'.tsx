import { useState } from 'react'

function App() {
  const [hoursPerWeek, setHoursPerWeek] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')

  const calculateSavings = (hours: number, rate: number) => {
    const monthlyHours = hours * 4
    const monthlySavings = monthlyHours * rate
    return {
      monthly: monthlySavings,
      quarterly: monthlySavings * 3,
      yearly: monthlySavings * 12
    }
  }

  const savings = calculateSavings(Number(hoursPerWeek), Number(hourlyRate))

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Kalkulačka úspor</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Počet hodin týdně
            </label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hodinová sazba (Kč)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Potenciální úspory:</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-900">Měsíčně: {savings.monthly.toLocaleString()} Kč</p>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-sm text-green-900">Kvartálně: {savings.quarterly.toLocaleString()} Kč</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-md">
                <p className="text-sm text-purple-900">Ročně: {savings.yearly.toLocaleString()} Kč</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
