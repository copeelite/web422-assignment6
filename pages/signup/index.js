// pages/signup.js
import { useForm } from 'react-hook-form';
import styles from '@/styles/signUp.module.css';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: data.userName,
          password: data.password,
          password2: data.password2, // Include this field
          fullName: data.fullName,   // Include this field
          role: " " // Include this field, defaulting to 'user' if not provided
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Registration successful:', result.message);
        // Handle success (e.g., navigate to a different page or show a success message)
      } else {
        console.error('Registration failed:', result.error);
        // Handle errors (e.g., show error message to the user)
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors (e.g., show error message to the user)
    }
  };


  return (
    <div className={styles.signUpContainer}>
      <h2 className={styles.formTitle}>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div>
          <label className={styles.formLabel}>Confirm Password:</label>
          <input
            className={styles.formInput}
            {...register("password2", { required: true })}
            type="password"
          />
          {errors.password2 && <span className={styles.errorMessage}>This field is required</span>}
        </div>
        <div>
          <label className={styles.formLabel}>Full Name:</label>
          <input
            className={styles.formInput}
            {...register("fullName")} // This field is optional
            type="text"
          />
        </div>
        <div>
          <label className={styles.formLabel}>Role:</label>
          <input
            className={styles.formInput}
            {...register("role")} // This field is optional
            type="text"
          />
        </div>
        <button className={styles.submitButton} type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
