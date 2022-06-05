import React, { useEffect, useState } from "react";
import { useFormik, useFormikContext } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { errorStyle, successStyle } from "./toastStyled";
import axios from "axios";
import randomImage from "../libs/botAvatarRandom";
import "react-toastify/dist/ReactToastify.css";
import "./SignForm.scss";
function SignUpForm({ handleSignUpForm }) {
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(randomImage);
  const [hiddenAvatar, setHiddenAvatar] = useState(false);
  const [hiddenAvatarButton, setHiddenAvatarButton] = useState(false);
  console.log("image", imageUrl);
  console.log("randomImage", randomImage);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      values.avatar = imageUrl;
      if (!values.email) {
        return toast.error("Enter your email", errorStyle);
      } else if (values.username.length < 3) {
        return toast.error("Short username", errorStyle);
      } else if (values.username.length > 10) {
        return toast.error("Long username", errorStyle);
      } else if (values.password.length < 6) {
        return toast.error("Short password", errorStyle);
      } else if (!values.avatar) {
        return toast.error("Please upload your profile avatar", errorStyle);
      }
      console.log("values", values);
      handleSignUpForm(values);
    },
  });

  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return toast.error("Max file size is 1mb", errorStyle);
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setHiddenAvatar(true);
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "bxq8xfwl");
    try {
      setUploadingImage(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/rezet/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadingImage(false);
      setHiddenAvatar(false);
      setHiddenAvatarButton(true);
      return res.data.url;
    } catch (error) {
      setUploadingImage(false);
      console.log("error", error);
    }
  };

  async function handleUploadAvatar(e) {
    e.preventDefault(e);
    if (!image) {
      return toast.error("Please upload your profile avatar", errorStyle);
    }
    const url = await uploadImage();
    console.log("url", url);
    setImageUrl(url);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="sign-up-avatar-container">
        <img src={imagePreview || randomImage} className="profile-avatar" />
        <label htmlFor="image-upload" className="image-upload">
          <i className="material-icons  add-picture-icon">add</i>
        </label>
        <input
          type="file"
          id="image-upload"
          hidden
          accept="image/png, image/jpeg"
          onChange={validateImg}
        />
      </div>
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
      {imageUrl && (
        <button type="submit" hidden={hiddenAvatar}>
          Sign up
        </button>
      )}
      {image && (
        <button
          onClick={(e) => handleUploadAvatar(e)}
          hidden={hiddenAvatarButton}
        >
          {uploadingImage ? "Uploading..." : "Upload avatar"}
        </button>
      )}

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
