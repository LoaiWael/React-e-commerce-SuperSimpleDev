import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import axios from "axios";
import HomePage from "./pages/Home/HomePage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const response = await axios.get("api/cart-items?expand=product");
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const initialLoad = async () => {
      await loadCart();
      if (!isMounted) return;
    }
    initialLoad();
    return () => { isMounted = false };
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route
          path="checkout"
          element={<CheckoutPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="orders"
          element={<OrdersPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="tracking/:orderId/:orderedProductId"
          element={<TrackingPage cart={cart} />}
        />
        <Route path="*" element={<NotFoundPage cart={cart} />} />
      </Routes>
    </>
  );
}

export default App;
