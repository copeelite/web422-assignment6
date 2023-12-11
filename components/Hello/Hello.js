import React, { useState, useEffect } from 'react';
import styles from './Hello.module.css';
import Image from 'next/image';

function Hello() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from an external API
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {/* Company Logo Placeholder */}
        <h1 className={styles.companyName}>Welcome to ShopWide</h1>
        <Image
          src="/shopwide.png" // Relative path from the public directory
          alt="ShopWide Logo"
          width={300} // Specify the width of the image
          height={300} // Specify the height of the image
        />
        {/* Insert your company logo image here */}
      </div>

      <div className={styles.content}>

        {/* Mission Statement */}
        <section className={styles.section}>
          <h2>Mission Statement</h2>
          <p>
            At ShopWide, our mission is to connect people with the products they love, offering a vast selection,
            convenience, and exceptional customer service. We&apos;re dedicated to making online shopping an enjoyable
            and seamless experience for customers worldwide.
          </p>
        </section>

        {/* About Us */}
        <section className={styles.section}>
          <h2>ShopWide created by Fanghao</h2>
          <p>
            ShopWide is a leading online retailer, founded in 2021 with a vision to revolutionize the way people shop.
            Over the years, we&apos;ve grown into a global marketplace that offers a wide range of products, from electronics
            and fashion to home decor and more.
          </p>
          <p>
            Our commitment to customer satisfaction drives everything we do. With millions of products, competitive
            prices, and fast shipping options, we aim to make shopping as convenient and enjoyable as possible. Our platform
            connects buyers and sellers, enabling individuals and businesses to thrive in the digital age.
          </p>
          <p>
            Join us at ShopWide and experience the future of online shopping.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Products</h2>
          <div className={styles.galleryContainer}>
            <div className={styles.gallery}>
              {products.map((product) => (
                <div key={product.id} className={styles.product}>
                  <img src={product.image} alt={product.title} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Hello;
