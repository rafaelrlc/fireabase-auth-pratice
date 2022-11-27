import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const userValidationSchema = yup.object().shape({
  userEmail: yup
    .string()
    .email("O email deve ser válido.")
    .required("Campo obrigatório."),
  userPassword: yup.string().password().required("Campo obrigatório."),
});

export default userValidationSchema;
