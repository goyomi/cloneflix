export interface IGetMovie {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  id: string;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  overview: string;
  name?: string;
}
