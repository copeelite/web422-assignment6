import React from 'react';
import Link from 'next/link';
import styles from './Layout.module.css'; // adjust path as needed
import useAuthStore from '@/store/authStore';

import { useShoppingCart } from "@/context/ShoppingCartContext";
 


export default function Layout(props) {
  const {cartQuantity} = useShoppingCart()


  const { isLoggedIn, signOut } = useAuthStore();

  const handleSignOut = () => {
    signOut();
    alert("You have signed out");
  };
  return (
    <div>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/dashboard" className={styles.navLink}>
          Product Details
        </Link>
        <Link href="/shoppingCart" className={styles.navLink}>
          Shopping Cart ({cartQuantity})
        </Link>
        {/* <Link href="/form" className={styles.navLink}>
          Submit Form
        </Link> */}
        {isLoggedIn ? (
          <button className={styles.navLink} onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <Link href="/signIn" className={styles.navLink}>
            Sign In
          </Link>
        )}
      </nav>
      <hr className={styles.hrLine} />
      <div className={styles.container}>{props.children}</div>
    </div>
  );
}