import { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";

import CardAlbum from "../../Elements/Card/albums";

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=20") // limit agar ringan
      .then((res) => {
        if (!res.ok) throw new Error("Gagal Mengambil Data");
        return res.json();
      })
      .then((data) => {
        setAlbums(data);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);
  useEffect(() => {
    fetch("https://picsum.photos/v2/list") // limit agar ringan
      .then((res) => {
        if (!res.ok) throw new Error("Gagal Mengambil Data");
        return res.json();
      })
      .then((data) => {
        setPhotos(data);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);
  return (
    <DashboardLayout title="Album">
      <div className="p-6">
        {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
        <h2 className="text-xl font-bold mb-4">Daftar Album</h2>

        {pending ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {albums.map((album, index) => (
              <CardAlbum
                key={album.id}
                title={album.title}
                image={photos[index]?.download_url} // gunakan optional chaining untuk keamanan
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AlbumPage;
