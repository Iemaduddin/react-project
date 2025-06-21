import Button from "../src/components/Elements/Button/index";
import LoginPage from "../src/components/Pages/login";

function App() {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-xs">
        <LoginPage />
        <Button>login</Button>
      </div>
    </div>
  );
}

export default App;
