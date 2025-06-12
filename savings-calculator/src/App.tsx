import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// @ts-expect-error: Unused for now but will be used later
const getCommonValues = (unit: 'daily' | 'weekly' | 'monthly') => {
  switch (unit) {
    case 'daily': return [8, 12]
    case 'weekly': return [40, 60]
    case 'monthly': return [160, 240]
  }
}

// @ts-expect-error: Unused for now but will be used later
const timeUnitLabels = {
  daily: 'denně',
  weekly: 'týdně',
  monthly: 'měsíčně'
}

function App() {
  const [count, setCount] = useState(0)
  const [hoursPerUnit, setHoursPerUnit] = useState('40')
  const [timeUnit, setTimeUnit] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [hourlyRate, setHourlyRate] = useState('300')

  const savings = calculateSavings(Number(hoursPerUnit) || 0, Number(hourlyRate) || 0, timeUnit)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
