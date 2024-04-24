const API_KEY = "3d6e29b3ff67795ee09d307f67541b45";
const BASE_URL = "https://api.themoviedb.org/3";

export function getMovie(section: string, queryKey: string) {
  return fetch(`${BASE_URL}/${section}/${queryKey}?api_key=${API_KEY}&language=en-US&page=1
  `).then((response) => response.json());
}

export function getTvShow(section: string, queryKey: string) {
  return fetch(`${BASE_URL}/${section}/${queryKey}?api_key=${API_KEY}&language=en-US&page=1`).then((response) =>
    response.json()
  );
}
