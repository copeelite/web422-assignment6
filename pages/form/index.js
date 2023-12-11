import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from '../../styles/form.module.css';

export default function App() {

  const US_STATES = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' }
  ];
  const [submitted, setSubmitted] = useState(false);
  const [data, setFormData] = useState({}); 

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const watchedPhone = watch("phone");
  const watchedEmail = watch("email");
  function submitForm(data) {
    console.log(data);
    setFormData(data); 
    setSubmitted(true);
  }

  return (
    <>
      <h2 style={{ color: 'brown' }}>Registrant Information</h2>
      <form onSubmit={handleSubmit(submitForm)} className={styles.formContainer}>
        {/* Company */}
        <label className={styles.label}>Company: </label>
        <input className={styles.inputField} {...register("company")} />

        {/* First Name */}
        <label className={styles.label}>First Name: *</label>
        <input className={styles.inputField} {...register("firstName", { required: true, maxLength: 20 })} />
        {errors.firstName?.type === "required" && <span className={styles.errorMessage}>First Name is required*</span>}
        {errors.firstName?.type === "maxLength" && <span className={styles.errorMessage}>First Name cannot contain more than 20 characters</span>}

        {/* Last Name */}
        <label className={styles.label}>Last Name: *</label>
        <input className={styles.inputField} {...register("lastName", { required: true, maxLength: 20 })} />
        {errors.lastName?.type === "required" && <span className={styles.errorMessage}>Last Name is required*</span>}
        {errors.lastName?.type === "maxLength" && <span className={styles.errorMessage}>Last Name cannot contain more than 20 characters</span>}

        {/* Email */}
        <label className={styles.label}>Email: </label>
        <input type="email" className={styles.inputField} {...register("email", { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
        {watchedEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(watchedEmail) && <span className={styles.errorMessage}>Invalid email format</span>}

        {/* Phone */}
        <label className={styles.label}>Phone: </label>
        <input type="tel" className={styles.inputField} {...register("phone", { pattern: /^\d{10}$/ })} />
        {watchedPhone && !/^\d{10}$/.test(watchedPhone) && <span className={styles.errorMessage}>Invalid phone format. Should be: xxxxxxxxxx (10 digits)</span>}

        {/* Address */}
        <label className={styles.label}>Address: *</label>
        <input className={styles.inputField} {...register("address", { required: true })} />
        {errors.address?.type === "required" && <span className={styles.errorMessage}>Address is required*</span>}

        {/* City */}
        <label className={styles.label}>City: *</label>
        <input className={styles.inputField} {...register("city", { required: true })} />
        {errors.city?.type === "required" && <span className={styles.errorMessage}>City is required*</span>}

        {/* US State */}
        <label className={styles.label}>State: *</label>
        <select className={styles.inputField} {...register("state", { required: true })}>
          {US_STATES.map(state => (
            <option key={state.code} value={state.code}>{state.name} (US)</option>
          ))}
        </select>
        {errors.state?.type === "required" && <span className={styles.errorMessage}>State is required</span>}

        <button type="submit" disabled={Object.keys(errors).length > 0} className={styles.submitButton}>Submit My Registration</button>
      </form>

      {/* Conditionally render the success message */}
      {submitted && (
        <div className={styles.successMessage}>
          <h3>Successfully submitted!</h3>
          {/* Display the submitted data */}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {Object.entries(data).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
