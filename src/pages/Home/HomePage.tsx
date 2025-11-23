import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import Header from "../../components/Header";
import ProductContainer from "./ProductContainer";
import { formatCurrency } from "../../utils/money";
import type { cartItem, product } from "../../types";
import "./HomePage.css";

export default function HomePage({ cart, loadCart }: { cart: cartItem[], loadCart: CallableFunction }) {
  const [products, setProducts] = useState<product[]>([]);
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = search
        ? await axios.get(`api/products?search=${search}`)
        : await axios.get("api/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, [search]);

  return (
    <>
      <title>Home | E-commerce</title>
      <link rel="icon" href="favicons/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => (
            <ProductContainer
              key={product.id}
              productId={product.id}
              image={product.image}
              name={product.name}
              rating={product.rating}
              price={formatCurrency(product.priceCents)}
              loadCart={loadCart}
            />
          ))}
        </div>
      </div>
    </>
  );
}
