import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { errorStyle } from "./toastStyled";
import "react-toastify/dist/ReactToastify.css";
import "./SignForm.scss";

function SignInForm({ handleSignInForm }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      if (!values.username) {
        return toast.error("Enter your username", errorStyle);
      } else if (values.password.length < 6) {
        return toast.error("Short password", errorStyle);
      }
      handleSignInForm(values);
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
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Sign in</button>
      <span>
        <div>Account already exists ?</div>
        <div>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </span>
    </form>
  );
}

export default SignInForm;
