const API_KEY = "3d6e29b3ff67795ee09d307f67541b45";
const BASE_URL = "https://api.themoviedb.org/3";

export function getContent(section: string, category: string) {
  return fetch(`${BASE_URL}/${section}/${category}?api_key=${API_KEY}&language=en-US&page=1
  `).then((response) => response.json());
}

export function getContentDetail(section: string, id: string) {
  return fetch(`${BASE_URL}/${section}/${id}?api_key=${API_KEY}&language=en-US&page=1
  `).then((response) => response.json());
}
