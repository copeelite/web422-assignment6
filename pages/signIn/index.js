import React from 'react';
import { useForm } from 'react-hook-form';
import styles from "../../styles/signIn.module.css"
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/authStore'; // Adjust the path as necessary

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const { signIn } = useAuthStore(); // use the signIn method from the store

  const onSignInSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/api/login', { // adjust the URL/port as per your server setup
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: data.userName,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login successful:', result);
        signIn(); 
        // Handle login success (e.g., storing JWT, redirecting, etc.)
        router.push('/');
      } else {
        console.error('Login failed:', result);
        // Handle login failure (e.g., displaying an error message)
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors
    }
  };

  return (
    <div className={styles.signInContainer}>
  <h2 className={styles.signInTitle}>Sign In</h2>
      <form onSubmit={handleSubmit(onSignInSubmit)}>
        <div>
          <label className={styles.formLabel}>Username:</label>
          <input
            className={styles.formInput}
            {...register("userName", { required: true })}
            type="text"
          />
          {errors.userName && <span className={styles.errorMessage}>This field is required</span>}
        </div>
        <div>
          <label className={styles.formLabel}>Password:</label>
          <input
            className={styles.formInput}
            {...register("password", { required: true })}
            type="password"
          />
          {errors.password && <span className={styles.errorMessage}>This field is required</span>}
        </div>
        <button className={styles.submitButton} type="submit">Sign In</button>
      </form>

  <div className={styles.signUpLink}>
        <p>Don't have an account?</p>
        <Link className={styles.signUpButton}href="/signup">
          Sign Up
        </Link>
      </div>
</div>


  );
};

export default SignIn;
