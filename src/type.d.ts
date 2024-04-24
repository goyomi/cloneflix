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
  vote_average: number;
}

export interface IDetailData {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
    }
  ];
}
