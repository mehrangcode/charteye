
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CoinsMarket from './pages/CoinsMarket';
import EthBlocks from './pages/EthBlocks';
import Navbar from './components/Navbar';
function App() {
  return <div className="app">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coins' element={<CoinsMarket />} />
        <Route path='/eth' element={<EthBlocks />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App