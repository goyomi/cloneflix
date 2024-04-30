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
  original_name: string;
  overview: string;
  vote_average: number;
  // movie
  title?: string;
  release_date?: string;
  // tv
  name?: string;
  first_air_date?: string;
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
  episode_run_time: [];
  runtime: number;
}

export interface ICredits {
  id: number;
  cast: [
    {
      profile_path: string;
      character: string;
      name: string;
    }
  ];
}

export interface ISimilar {
  page: number;
  results: ISimilarResults[];
  total_pages: number;
  total_results: number;
}

export interface ISimilarResults {
  poster_path: string;
  name?: string;
  title?: string;
  vote_average: number;
}

export interface ISearchData {
  page: number;
  results: ISearchResults[];
  total_pages: number;
  total_results: number;
}

interface ISearchResults {
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
}
