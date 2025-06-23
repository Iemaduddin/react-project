import { Link } from "react-router-dom";
import ReactLogo from "../../assets/react.svg";

const AuthLogin = (props) => {
  const { children, title, image, type } = props;
  return (
    <div className="flex min-h-screen">
      {/* Bagian Gambar - Kiri */}
      <div className="w-1/2 hidden lg:block">
        <img
          src={image} // Ganti dengan path gambar kamu
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bagian Form - Kanan */}
      <div className="lg:w-1/2 md:w-full sm:w-full flex items-center justify-center bg-white">
        <div className="w-full max-w-lg p-6 ">
          <h1 className="text-3xl font-bold mb-2 text-amber-600">{title}</h1>
          <p className="font-medium text-slate-600 mb-4">Welcome, please enter your details</p>
          {children}
          <div className="my-3">
            <p>
              {type === "login" ? "Don't have an account? " : "Already have an account? "}
              {type === "register" && (
                <Link to="/login" className="font-bold">
                  Sign In
                </Link>
              )}
              {type === "login" && (
                <Link to="/register" className="font-bold">
                  Sign Up
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
