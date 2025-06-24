export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          ✖
        </button>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-72 object-cover rounded" />
        <h2 className="text-xl font-bold mt-4 text-gray-900">{movie.title}</h2>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
        <p className="text-sm mt-2 text-gray-800">{movie.overview}</p>
        <p className="text-sm mt-2 text-yellow-600">⭐ {movie.vote_average} / 10</p>
        <button onClick={() => (window.location.href = `/movie/${movie.id}`)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Lihat Detail
        </button>
      </div>
    </div>
  );
}
