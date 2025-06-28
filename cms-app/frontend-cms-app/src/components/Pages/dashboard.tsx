import { useEffect, useState } from "react";
import CardTotal from "../Elements/Card/total";
import DashboardLayout from "../Layouts/DashboardLayout";

const DashboardPage = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const totalUsers = users.length;
  const user = JSON.parse(localStorage.getItem("user") || "null") as { name?: string } | null;
  const authName = user?.name || "Guest";
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  const [totalNews, setTotalNews] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal Mengambil Data");
        }
        return res.json();
      })
      .then((data) => {
        setTotalNews(data.length);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal Mengambil Data");
        }
        return res.json();
      })
      .then((data) => {
        setTotalAlbums(data.length);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      <h2 className="text-2xl font-bold mb-4">Selamat Datang, {authName}!</h2>
      {pending ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <CardTotal title="Total Users" total={totalUsers} bg="bg-gradient-to-r from-blue-800 to-blue-400" fontcolor="text-white" />
          <CardTotal title="Total News" total={totalNews} bg="bg-gradient-to-r from-red-800 to-red-500" fontcolor="text-white" />
          <CardTotal title="Total Foto" total={totalAlbums} bg="bg-gradient-to-r from-yellow-700 to-amber-400" fontcolor="text-white" />
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
