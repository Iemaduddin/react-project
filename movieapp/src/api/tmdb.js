const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(query, page = 1) {
  const url = query ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}` : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchMovieDetail(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie detail");
  return res.json();
}

export async function fetchMovieVideos(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`);
  const data = await res.json();
  return data.results;
}
export async function fetchMovieTrailer(movieId) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`);
  const data = await res.json();
  const trailer = data.results.find((v) => v.type === "Trailer" && v.site === "YouTube");
  return trailer ? trailer.key : null;
}
