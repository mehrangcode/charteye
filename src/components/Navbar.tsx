import { Link } from "react-router-dom"
import './navbar.css'
function Navbar() {
  return (
    <div>
        <nav>
            <Link to={"/"}>HOME</Link>
            <Link to={"/coins"}>COINS</Link>
            <Link to={"/eth"}>ETH</Link>
        </nav>
    </div>
  )
}

export default Navbar