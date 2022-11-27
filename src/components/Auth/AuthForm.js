import { useState } from "react";
import classes from "./AuthForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userValidationSchema from "../../validation/userData";

import axios from "axios";

const key = "AIzaSyA_JQ06cuajLFsd8wKNp9OVbc3dejuW3eM";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userValidationSchema) });

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (data) => {
    const params = {
      email: data.userEmail,
      password: data.userPassword,
      returnSecureToken: true,
    };

    if (isLogin) {
      //
    } else {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
          params,
          config
        );

        console.log(response);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" {...register("userEmail")} />
          {errors.userEmail && (
            <p className={classes.error_message}>{errors.userEmail.message}</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" {...register("userPassword")} />
          {errors.userPassword && (
            <p className={classes.error_message}>
              {errors.userPassword.message}
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="submit"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
