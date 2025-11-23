import { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { calculateCartQuantity } from "../utils/cart";
import type { cartItem } from "../types";
import logoWhite from "../assets/images/logo-white.png";
import mobileLogoWhite from "../assets/images/mobile-logo-white.png";
import searchIcon from "../assets/images/icons/search-icon.png";
import cartIcon from "../assets/images/icons/cart-icon.png";
import "./Header.css";

export default function Header({ cart }: { cart: cartItem[] }) {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={logoWhite} />
          <img className="mobile-logo" src={mobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && navigate(`/?search=${search}`)}
        />

        <button
          className="search-button"
          onClick={() => navigate(`/?search=${search}`)}
        >
          <img className="search-icon" src={searchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIcon} />
          <div className="cart-quantity">{calculateCartQuantity(cart)}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
