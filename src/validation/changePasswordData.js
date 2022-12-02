import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const userChangePasswordSchema = yup.object().shape({
  newPassword: yup.string().password().required("Campo obrigatório."),
});

export default userChangePasswordSchema;
