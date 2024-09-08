import './Header.css'
const Header = () => {
  return (
    <div className="Header">
      <h1>Transaction Size Calculator</h1>
      <h3>How much is the fee?</h3>
      <div className="Header-contacts">
        <a target="_blank" href="https://github.com/1uggl/Transaction-Size-Calculator">Github</a>
        <a target="_blank" href="https://x.com/1Uggl">X</a>
        <a target="_blank" href="https://mempool.space/address/bc1qlxylv26hhrqzngqpax6cnyd3ds6dlrnyr49uw3">Support</a>
      </div>
    </div>
  )
}

export default Header
