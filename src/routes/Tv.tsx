import Slider from "../components/Slider";
import { TvShowDataContext, TvShowProvider } from "../context/DataContext";
import Loading from "../components/Loading";
import { HomeContainer } from "./Home";
import Banner from "../components/Banner";
import { useEffect, useState } from "react";
import { IExtendRandomContentResult } from "./Movie";
import { IData } from "../type";

function Tv() {
  const { airingTodayData, onTheAirData, tvPopularData, tvTopRatedData, isLoading } = TvShowProvider();
  const [randomContentData, setRandomContentData] = useState<IExtendRandomContentResult | null>(null);
  const getRandomContent = (): IExtendRandomContentResult | null => {
    if (!airingTodayData?.results || !onTheAirData?.results || !tvPopularData?.results || !tvTopRatedData?.results)
      return null;
    const allContent = [
      ...airingTodayData.results.map((result: IData) => ({ ...result, source: "airing_today" })),
      ...onTheAirData.results.map((result: IData) => ({ ...result, source: "on_the_air" })),
      ...tvPopularData.results.map((result: IData) => ({ ...result, source: "popular" })),
      ...tvTopRatedData.results.map((result: IData) => ({ ...result, source: "top_rated" })),
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
  }, [airingTodayData, onTheAirData, tvPopularData, tvTopRatedData]);

  const { randomContent, randomContentCategory } = randomContentData || {};
  return (
    <TvShowDataContext.Provider value={{ airingTodayData, onTheAirData, tvPopularData, tvTopRatedData, isLoading }}>
      <HomeContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {randomContent && randomContentCategory && (
              <Banner getRandomContent={() => randomContent} section="tv" category={randomContentCategory} />
            )}
            <Slider title="Today On TV" section="tv" category="airing_today" />
            <Slider title="Live Broadcast Shows" section="tv" category="on_the_air" />
            <Slider title="Most Popular Shows" section="tv" category="popular" />
            <Slider title="Best Reviewed TVShows" section="tv" category="top_rated" />
          </>
        )}
      </HomeContainer>
    </TvShowDataContext.Provider>
  );
}

export default Tv;
