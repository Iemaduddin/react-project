import AuthLogin from "../Layouts/AuthLayouts";
import FormRegister from "../Fragments/FormRegister";
import Button from "../Elements/Button/index";
import { Link } from "react-router-dom";
import RegisterImage from "../../assets/register-img.jpg";

const RegisterPage = () => {
  return (
    <AuthLogin title="Register" image={RegisterImage} type="register">
      <FormRegister />
    </AuthLogin>
  );
};

export default RegisterPage;
