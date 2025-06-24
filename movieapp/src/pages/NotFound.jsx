import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-3 p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-red-500">Not Found!</h2>

      <p className="text-gray-700">Oops, halaman tidak ditemukan</p>
      <Link to={"/"} className="bg-black px-4 py-2 text-white rounded-2xl">
        ⬅️ Kembali ke Halaman Utama
      </Link>
    </div>
  );
};

export default NotFound;
