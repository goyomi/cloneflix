import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { getMovie } from "../api";
import { IGetMovie } from "../type";

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
    queryFn: () => getMovie("now_playing"),
  });

  const { data: topRatedData, isLoading: topRatedIsLoading } = useQuery({
    queryKey: ["movie", "topRated"],
    queryFn: () => getMovie("top_rated"),
  });

  const { data: upcomingData, isLoading: upcomingIsLoading } = useQuery({
    queryKey: ["movie", "upcoming"],
    queryFn: () => getMovie("upcoming"),
  });

  const isLoading = nowPlayingIsLoading || topRatedIsLoading || upcomingIsLoading;

  return { nowPlayingData, topRatedData, upcomingData, isLoading };
};
