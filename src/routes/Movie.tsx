import Slider from "../components/Slider";
import { MovieDataContext, MovieProvider } from "../context/DataContext";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import { HomeContainer, IRandomContentResult } from "./Home";
import { IData } from "../type";

export interface IExtendRandomContentResult extends Omit<IRandomContentResult, "randomContentSection"> {
  randomContentCategory: string;
}

function Movie() {
  const { nowPlayingData, popularData, topRatedData, upcomingData, isLoading } = MovieProvider();
  const [randomContentData, setRandomContentData] = useState<IExtendRandomContentResult | null>(null);
  const getRandomContent = (): IExtendRandomContentResult | null => {
    if (!nowPlayingData?.results || !popularData?.results || !topRatedData?.results || !upcomingData?.results)
      return null;
    const allContent = [
      ...nowPlayingData.results.map((result: IData) => ({ ...result, source: "now_playing" })),
      ...popularData.results.map((result: IData) => ({ ...result, source: "popular" })),
      ...topRatedData.results.map((result: IData) => ({ ...result, source: "top_rated" })),
      ...upcomingData.results.map((result: IData) => ({ ...result, source: "upcoming" })),
    ];
    if (allContent.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * allContent.length);
    const randomContent = allContent[randomIndex];
    const randomContentCategory = randomContent.source;
    return { randomContent, randomContentCategory };
  };

  useEffect(() => {
    const randomContentResult = getRandomContent();
    setRandomContentData(randomContentResult);
  }, [nowPlayingData, popularData, topRatedData, upcomingData]);

  const { randomContent, randomContentCategory } = randomContentData || {};

  return (
    <MovieDataContext.Provider value={{ nowPlayingData, popularData, topRatedData, upcomingData, isLoading }}>
      <HomeContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {randomContent && randomContentCategory && (
              <Banner getRandomContent={() => randomContent} section="movie" category={randomContentCategory} />
            )}
            <Slider title="Now Showing Movies" section="movie" category="now_playing" />
            <Slider title="Most Popular Movies" section="movie" category="popular" />
            <Slider title="Best Reviewed Movies" section="movie" category="top_rated" />
            <Slider title="Soon To Be Released Movies" section="movie" category="upcoming" />
          </>
        )}
      </HomeContainer>
    </MovieDataContext.Provider>
  );
}

export default Movie;
