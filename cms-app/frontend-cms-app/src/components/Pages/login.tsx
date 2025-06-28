import AuthLogin from "../Layouts/AuthLayouts";
import FormLogin from "../Fragments/FormLogin";

import LoginImage from "../../assets/login-img.jpg";
const LoginPage = () => {
  return (
    <AuthLogin title="Login" image={LoginImage} type="login">
      <FormLogin />
    </AuthLogin>
  );
};

export default LoginPage;
