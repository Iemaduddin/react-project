import AuthLogin from "../Layouts/AuthLayouts";
import FormRegister from "../Fragments/FormRegister";
import RegisterImage from "../../assets/register-img.jpg";

const RegisterPage = () => {
  return (
    <AuthLogin title="Register" image={RegisterImage} type="register">
      <FormRegister />
    </AuthLogin>
  );
};

export default RegisterPage;
