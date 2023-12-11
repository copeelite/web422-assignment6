import React, { useState, useEffect } from 'react';
import styles from './About.module.css';
import Image from 'next/image';

function AboutPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchProductData function to load product data
    fetchProductData();
  }, []);

  return (
    <div className={styles.container}>
    <div className={styles.aboutContainer}>
      
      <div className={styles.aboutContent}>
        <div className={styles.aboutImage} style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <h2 className={styles.companyName}>About Us</h2>
          <Image
            src="/shopwide2.png" // Relative path from the public directory
            alt="ShopWide Logo"
            width={300} // Specify the width of the image
            height={300} // Specify the height of the image
          />
        </div>
        <div className={styles.aboutText}>
          <p>
            Welcome to ShopWide, your one-stop online destination for all your shopping needs. At ShopWide, we take pride in offering a diverse range of products to our valued customers.
          </p>
          <p>
            Founded by Fanghao Meng, our CEO and founder, in 2021, our journey began with a simple goal: to provide a convenient and enjoyable shopping experience for people around the world. Over the years, we have grown into a global marketplace, connecting buyers and sellers, and offering a vast selection of products.
          </p>
          <p>
            Whether you&apos;re looking for the latest electronics and gadgets, fashionable apparel, home decor, or captivating books and entertainment, we&apos;ve got it all. Our commitment to customer satisfaction drives everything we do.
          </p>
          <p>
            Join us at ShopWide and experience the future of online shopping. We are dedicated to making your shopping journey seamless and enjoyable.
          </p>
        </div>
      </div>

      <div className={styles.productSection}>
        <h1 className={styles.productTitle}>Our Products</h1>
        <div className={styles.products}>
          {products.map(product => (
            <div key={product.id} className={styles.product}>
              <div className={styles.productInfo}>
                
                <h5>{product.id} : {product.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default AboutPage;
