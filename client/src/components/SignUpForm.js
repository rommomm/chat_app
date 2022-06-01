import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { errorStyle, successStyle } from "./toastStyled";

import "react-toastify/dist/ReactToastify.css";
import "./SignForm.scss";

function SignUpForm({ handleSignUpForm }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (!values.email) {
        return toast.error("Enter your email", errorStyle);
      } else if (values.username.length < 3) {
        return toast.error("Short username", errorStyle);
      } else if (values.password.length < 6) {
        return toast.error("Short password", errorStyle);
      }
      handleSignUpForm(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Sign Up</button>
      <span>
        <div>Alredy have an account ?</div>
        <div>
          <Link to="/sign-in">Sign In</Link>
        </div>
      </span>
    </form>
  );
}

export default SignUpForm;
