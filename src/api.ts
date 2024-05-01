const API_KEY = "3d6e29b3ff67795ee09d307f67541b45";
const BASE_URL = "https://api.themoviedb.org/3";

export function getContent(section: string, category: string) {
  return fetch(`${BASE_URL}/${section}/${category}?api_key=${API_KEY}&language=en-US
  `).then((response) => response.json());
}

export function getContentDetail(section: string, id: string) {
  return fetch(`${BASE_URL}/${section}/${id}?api_key=${API_KEY}&language=en-US
  `).then((response) => response.json());
}

export function getContentCredits(section: string, id: string) {
  return fetch(`${BASE_URL}/${section}/${id}/credits?api_key=${API_KEY}&language=en-US`).then((response) =>
    response.json()
  );
}

export function getContentSimilar(section: string, id: string) {
  return fetch(`${BASE_URL}/${section}/${id}/similar?api_key=${API_KEY}&language=en-US`).then((response) =>
    response.json()
  );
}

export function getSearchData(section: string, query: string) {
  return fetch(`${BASE_URL}/search/${section}?api_key=${API_KEY}&language=en-US&query=${query}`).then((response) =>
    response.json()
  );
}

export function getTrendingData(section: string) {
  return fetch(`${BASE_URL}/trending/${section}/week?api_key=${API_KEY}&language=en-US`).then((response) =>
    response.json()
  );
}
