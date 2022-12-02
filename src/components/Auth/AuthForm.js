import { useState, useContext } from "react";
import classes from "./AuthForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userValidationSchema from "../../validation/userData";
import AuthContext from "../../store/auth-context";
import api from "../../services/api";
import { key } from "../../services/api";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);
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

    let url = `accounts:signUp?key=${key}`;

    if (isLogin) {
      url = `accounts:signInWithPassword?key=${key}`;
    }

    try {
      const response = await api.post(url, params, config);
      console.log(response);
      authCtx.login(response.data.idToken);
    } catch (error) {
      console.log(error.response.data.error);
    }

    //reset()
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="text" id="email" {...register("userEmail")} />
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
          <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
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
