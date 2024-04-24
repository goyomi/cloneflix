import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { getMovie, getTvShow } from "../api";
import { IGetMovie, IGetTvShow } from "../type";

interface IMovieDataContext {
  nowPlayingData: IGetMovie;
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
    queryFn: () => getMovie("movie", "now_playing"),
  });

  const { data: topRatedData, isLoading: topRatedIsLoading } = useQuery({
    queryKey: ["movie", "topRated"],
    queryFn: () => getMovie("movie", "top_rated"),
  });

  const { data: upcomingData, isLoading: upcomingIsLoading } = useQuery({
    queryKey: ["movie", "upcoming"],
    queryFn: () => getMovie("movie", "upcoming"),
  });

  const isLoading = nowPlayingIsLoading || topRatedIsLoading || upcomingIsLoading;

  return { nowPlayingData, topRatedData, upcomingData, isLoading };
};

// TV show
interface ITvShowDataContext {
  airingTodayData: IGetTvShow;
  onTheAirData: IGetTvShow;
  popularData: IGetTvShow;
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
  popularData: {
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
    queryFn: () => getTvShow("tv", "airing_today"),
  });

  // Get a list of TV shows that air in the next 7 days
  const { data: onTheAirData, isLoading: onTheAirIsLoading } = useQuery({
    queryKey: ["tv", "onTheAir"],
    queryFn: () => getTvShow("tv", "on_the_air"),
  });

  const { data: popularData, isLoading: popularIsLoading } = useQuery({
    queryKey: ["tv", "popular"],
    queryFn: () => getTvShow("tv", "popular"),
  });

  const { data: tvTopRatedData, isLoading: topRatedIsLoading } = useQuery({
    queryKey: ["tv", "topRated"],
    queryFn: () => getTvShow("tv", "top_rated"),
  });

  const isLoading = airingTodayIsLoading || onTheAirIsLoading || popularIsLoading || topRatedIsLoading;

  return { airingTodayData, onTheAirData, popularData, tvTopRatedData, isLoading };
};
