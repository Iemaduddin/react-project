import Navbar from "../Elements/Navbar";

const WeatherLayout = ({ children, title }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <Navbar title={title} />
        <main className="flex-1 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default WeatherLayout;
