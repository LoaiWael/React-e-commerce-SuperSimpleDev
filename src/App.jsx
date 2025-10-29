import { useEffect, useState } from "react"
import { Routes, Route } from "react-router"
import axios from "axios"
import HomePage from "./pages/Home/HomePage"
import CheckoutPage from "./pages/Checkout/CheckoutPage"
import OrdersPage from "./pages/Orders/OrdersPage"
import TrackingPage from "./pages/TrackingPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get('api/cart-items?expand=product').then(response => {
      setCart(response.data);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking/:orderId/:orderedProductId" element={<TrackingPage cart={cart} />} />
        <Route path="*" element={<NotFoundPage cart={cart} />} />
      </Routes>
    </>
  )
}

export default App