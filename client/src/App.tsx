
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CheckoutPage from './pages/CheckoutPage'
import InventoryManagementPage from './pages/InventoryManagementPage'
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage'
import RequireRole from './components/RequireRole'
import EmployeeManagementPage from './pages/EmpoyeeManagementPage'
import NotFound from './pages/NotFound'
// import ProductTable from 'InventoryUI/ProductTable'; 

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products_page' element={<ProductsPage />} />
        <Route path='/checkout_page' element={<CheckoutPage />} />
        <Route path='/cart_page' element={<CartPage />} />
        <Route path='/inventory_management_page' element={<InventoryManagementPage />} />
        <Route path='/account' element={<AccountPage />} /><Route
    path="/employees"
    element={
      <RequireRole role="Store Manager">
        <EmployeeManagementPage />
      </RequireRole>
    }
  />
  <Route path="*" element={<NotFound />} />
      </Routes>
      
    </>
  )
}

export default App
