export interface IGetMovie {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvShow {
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export interface IData {
  id: string;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}
