import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const userChangePasswordSchema = yup.object({
  newPassword: yup.string().password().required("Password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default userChangePasswordSchema;
