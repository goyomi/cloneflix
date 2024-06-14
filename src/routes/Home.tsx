import styled from "styled-components";
import Slider from "../components/Slider";
import { HomeDataContext, HomeDataProvider } from "../context/DataContext";
import Banner from "../components/Banner";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { IData } from "../type";

const HomeContainer = styled.div`
  background-color: black;
`;

interface IRandomContentResult {
  randomContent: IData;
  randomContentSection: string;
}

function Home() {
  const { movieTrendingData, movieTrendingData_2, tvTrendingData, tvTrendingData_2, isLoading } = HomeDataProvider();
  const [randomContentData, setRandomContentData] = useState<IRandomContentResult | null>(null);
  const getRandomContent = (): IRandomContentResult | null => {
    if (
      !movieTrendingData?.results ||
      !movieTrendingData_2?.results ||
      !tvTrendingData?.results ||
      !tvTrendingData_2?.results
    )
      return null;
    const allContent = [
      ...movieTrendingData.results,
      ...movieTrendingData_2.results,
      ...tvTrendingData.results,
      ...tvTrendingData_2.results,
    ];
    if (allContent.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * allContent.length);
    const randomContent = allContent[randomIndex];
    const randomContentSection = allContent[randomIndex].media_type;
    return { randomContent, randomContentSection };
  };

  useEffect(() => {
    const randomContentResult = getRandomContent();
    setRandomContentData(randomContentResult);
  }, [movieTrendingData, movieTrendingData_2, tvTrendingData, tvTrendingData_2]);

  const { randomContent, randomContentSection } = randomContentData || {};

  return (
    <HomeDataContext.Provider
      value={{ movieTrendingData, movieTrendingData_2, tvTrendingData, tvTrendingData_2, isLoading }}
    >
      <HomeContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {randomContent && randomContentSection && (
              <Banner getRandomContent={() => randomContent} section={randomContentSection} category="trending" />
            )}
            <Slider title="Top20 Trending Movies" section="movie" category="trending" />
            <Slider title="Next20 Trending Movies" section="movie" category="trending_2" />
            <Slider title="Trending TV Shows Top20" section="tv" category="trending" />
            <Slider title="Trending TV Shows Next20" section="tv" category="trending_2" />
          </>
        )}
      </HomeContainer>
    </HomeDataContext.Provider>
  );
}

export default Home;
