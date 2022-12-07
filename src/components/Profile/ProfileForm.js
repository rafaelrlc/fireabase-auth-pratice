import classes from "./ProfileForm.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import userChangePasswordSchema from "../../validation/changePasswordData";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { key } from "../../services/api";
import { useNavigate } from "react-router-dom";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userChangePasswordSchema),
  });
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const submitHandler = async (data) => {
    let url = `accounts:update?key=${key}`;

    let params = {
      idToken: authCtx.token,
      password: data.newPassword,
      returnSecureToken: true,
    };

    console.log(data);
    try {
      const response = api.post(url, params, config);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.error);
    }
    //reset();
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="newPassword" {...register("newPassword")} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
