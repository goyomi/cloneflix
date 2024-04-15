export interface IGetMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovies[];
  total_pages: number;
  total_results: number;
}

export interface IMovies {
  id: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
