
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CheckoutPage from './pages/CheckoutPage'
import InventoryManagementPage from './pages/InventoryManagementPage'
// import ProductTable from 'InventoryUI/ProductTable'; 

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products_page' element={<ProductsPage />} />
        <Route path='/checkout_page' element={<CheckoutPage />} />
        <Route path='/inventory_management_page' element={<InventoryManagementPage />} />
      </Routes>
      
    </>
  )
}

export default App
