import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { getContent, getTrendingData } from "../api";
import { IGetMovie, IGetTvShow, ITrending } from "../type";

export interface IHomeDataContext {
  movieTrendingData: ITrending;
  movieTrendingData_2: ITrending;
  tvTrendingData: ITrending;
  tvTrendingData_2: ITrending;
  isLoading: boolean;
}

export const HomeDataContext = createContext<IHomeDataContext>({
  movieTrendingData: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  movieTrendingData_2: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  tvTrendingData: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  tvTrendingData_2: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  isLoading: true,
});

export const HomeDataProvider = () => {
  const { data: movieTrendingData, isLoading: movieTrendingLoading } = useQuery({
    queryKey: ["trending", "movie"],
    queryFn: () => getTrendingData("movie"),
  });
  const { data: movieTrendingData_2, isLoading: movieTrendingLoading_2 } = useQuery({
    queryKey: ["trending_2", "movie"],
    queryFn: () => getTrendingData("movie", 2),
  });
  const { data: tvTrendingData, isLoading: tvTrendingLoading } = useQuery({
    queryKey: ["trending", "tv"],
    queryFn: () => getTrendingData("tv"),
  });
  const { data: tvTrendingData_2, isLoading: tvTrendingLoading_2 } = useQuery({
    queryKey: ["trending_2", "tv"],
    queryFn: () => getTrendingData("tv", 2),
  });

  const isLoading = movieTrendingLoading || movieTrendingLoading_2 || tvTrendingLoading || tvTrendingLoading_2;

  return { movieTrendingData, movieTrendingData_2, tvTrendingData, tvTrendingData_2, isLoading };
};

interface IMovieDataContext {
  nowPlayingData: IGetMovie;
  popularData: IGetMovie;
  topRatedData: IGetMovie;
  upcomingData: IGetMovie;
  isLoading: boolean;
}

export const MovieDataContext = createContext<IMovieDataContext>({
  nowPlayingData: {
    dates: { maximum: "", minimum: "" },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  popularData: {
    dates: { maximum: "", minimum: "" },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  topRatedData: {
    dates: { maximum: "", minimum: "" },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  upcomingData: {
    dates: { maximum: "", minimum: "" },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  isLoading: true,
});

export const MovieProvider = () => {
  const { data: nowPlayingData, isLoading: nowPlayingIsLoading } = useQuery({
    queryKey: ["movie", "nowPlaying"],
    queryFn: () => getContent("movie", "now_playing"),
  });

  const { data: popularData, isLoading: popularIsLoading } = useQuery({
    queryKey: ["movie", "popular"],
    queryFn: () => getContent("movie", "popular"),
  });

  const { data: topRatedData, isLoading: topRatedIsLoading } = useQuery({
    queryKey: ["movie", "topRated"],
    queryFn: () => getContent("movie", "top_rated"),
  });

  const { data: upcomingData, isLoading: upcomingIsLoading } = useQuery({
    queryKey: ["movie", "upcoming"],
    queryFn: () => getContent("movie", "upcoming"),
  });

  const isLoading = nowPlayingIsLoading || popularIsLoading || topRatedIsLoading || upcomingIsLoading;

  return { nowPlayingData, popularData, topRatedData, upcomingData, isLoading };
};

// TV show
interface ITvShowDataContext {
  airingTodayData: IGetTvShow;
  onTheAirData: IGetTvShow;
  tvPopularData: IGetTvShow;
  tvTopRatedData: IGetTvShow;
  isLoading: boolean;
}

export const TvShowDataContext = createContext<ITvShowDataContext>({
  airingTodayData: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  onTheAirData: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  tvPopularData: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  tvTopRatedData: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  isLoading: true,
});

export const TvShowProvider = () => {
  const { data: airingTodayData, isLoading: airingTodayIsLoading } = useQuery({
    queryKey: ["tv", "airingToday"],
    queryFn: () => getContent("tv", "airing_today"),
  });

  // Get a list of TV shows that air in the next 7 days
  const { data: onTheAirData, isLoading: onTheAirIsLoading } = useQuery({
    queryKey: ["tv", "onTheAir"],
    queryFn: () => getContent("tv", "on_the_air"),
  });

  const { data: tvPopularData, isLoading: popularIsLoading } = useQuery({
    queryKey: ["tv", "popular"],
    queryFn: () => getContent("tv", "popular"),
  });

  const { data: tvTopRatedData, isLoading: topRatedIsLoading } = useQuery({
    queryKey: ["tv", "topRated"],
    queryFn: () => getContent("tv", "top_rated"),
  });

  const isLoading = airingTodayIsLoading || onTheAirIsLoading || popularIsLoading || topRatedIsLoading;

  return { airingTodayData, onTheAirData, tvPopularData, tvTopRatedData, isLoading };
};
