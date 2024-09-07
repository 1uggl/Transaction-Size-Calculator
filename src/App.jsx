import { useState } from 'react'
import Header from './Header.jsx'
import './App.css'
import Calculator from './Calculator.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Calculator />
    </>
  )
}

export default App
