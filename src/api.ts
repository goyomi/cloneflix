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

// TV Shows API
export function getAiringTodayTVShow() {
  return fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`).then((response) =>
    response.json()
  );
}

// Get a list of TV shows that air in the next 7 days
export function getOnTheAirTVShow() {
  return fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`).then((response) =>
    response.json()
  );
}

export function getPopularTVShow() {
  return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`).then((response) => response.json());
}

export function getTopRatedTVShow() {
  return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then((response) => response.json());
}
