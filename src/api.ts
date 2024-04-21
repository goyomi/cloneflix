const API_KEY = "3d6e29b3ff67795ee09d307f67541b45";
const BASE_URL = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1
  `).then((response) => response.json());
}

export function getTopRatedMovies() {
  return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then((response) =>
    response.json()
  );
}

export function getUpcomingMovies() {
  return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`).then((response) =>
    response.json()
  );
}
