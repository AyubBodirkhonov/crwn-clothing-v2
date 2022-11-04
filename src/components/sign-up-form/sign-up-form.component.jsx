import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create a user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;

// import { useState } from "react";

// const defaultFormFields = {
//   displayName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// const SignUpForm = () => {
//   const [formFields, setFormFields] = useState(defaultFormFields);
//   const { displayName, email, password, confirmPassword } = formFields;

//   console.log(formFields);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormFields({ ...formFields, [name]: value });
//   };

//   return (
//     <div>
//       <h1>sign up with your email and password</h1>
//       <form onSubmit={() => {}}>
//         <label>Display Name</label>
//         <input
//           type="text"
//           required
//           onChange={handleChange}
//           name="displayName"
//           value={displayName}
//         />

//         <label>Email</label>
//         <input
//           type="email"
//           required
//           onChange={handleChange}
//           name="email"
//           value={email}
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           required
//           onChange={handleChange}
//           name="password"
//           value={password}
//         />

//         <label>Confirm Passoword</label>
//         <input
//           type="password"
//           required
//           onChange={handleChange}
//           name="confirmPassword"
//           value={confirmPassword}
//         />

//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;
