import type { cartItem } from '../types';
import Header from '../components/Header';
import logo from '../assets/images/mobile-logo.png'
import './NotFoundPage.css';

export default function NotFoundPage({ cart }: { cart: cartItem[] }) {
  return (
    <>
      <title>Error 404</title>
      <link rel="icon" href={logo} />

      <Header cart={cart} />
      <section className='page-body'>
        <h1>Error 404</h1>
        <p>Page not found</p>
      </section>
    </>
  )
}