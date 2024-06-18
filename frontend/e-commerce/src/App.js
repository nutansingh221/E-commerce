
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/CheckOut' element={<CheckOut/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
