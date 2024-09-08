import { useState } from 'react'
import './Header.css'

const Header = () => {
  const [supportLink, setSupportLink] = useState("Supportadress")
  const handleCopy = event => {
event.preventDefault();
    navigator.clipboard.writeText("bc1qlxylv26hhrqzngqpax6cnyd3ds6dlrnyr49uw3")
    setSupportLink("Adress copied!")
  }
  return (
    <div className="Header">
      <h1>Transaction Size Calculator</h1>
      <h3>How much is the fee?</h3>
      <div className="Header-contacts">
        <a target="_blank" href="https://github.com/1uggl/Transaction-Size-Calculator">Github</a>
        <a target="_blank" href="https://x.com/1Uggl">X</a>
        <a onClick={handleCopy} href="Copy Adress">{supportLink}</a>
      </div>
    </div>
  )
}

export default Header
