import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { id } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`)
      .then((res) => res.json())
      .then((data) => setCast(data.cast || []));
  }, [id]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cast.map((actor) => (
          <div key={actor.cast_id} className="text-sm bg-white p-3 rounded shadow">
            <p className="font-medium text-gray-800">{actor.name}</p>
            <p className="text-gray-600 text-xs">as {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
