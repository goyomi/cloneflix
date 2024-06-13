import styled from "styled-components";
import Slider from "../components/Slider";
import { HomeDataContext, HomeDataProvider } from "../context/DataContext";
import Banner from "../components/Banner";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { IData } from "../type";

const HomeContainer = styled.div`
  background-color: black;
`;

function Home() {
  const { movieTrendingData, movieTrendingData_2, tvTrendingData, tvTrendingData_2, isLoading } = HomeDataProvider();
  const getRandomContent = (): IData | null => {
    if (
      !movieTrendingData?.results ||
      !movieTrendingData_2?.results ||
      !tvTrendingData?.results ||
      !tvTrendingData_2?.results
    )
      return null;
    const allContent = [
      ...movieTrendingData.results,
      ...tvTrendingData_2.results,
      ...tvTrendingData.results,
      ...tvTrendingData_2.results,
    ];
    if (allContent.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * allContent.length);
    return allContent[randomIndex];
  };

  useEffect(() => {
    getRandomContent();
  });

  return (
    <HomeDataContext.Provider
      value={{ movieTrendingData, movieTrendingData_2, tvTrendingData, tvTrendingData_2, isLoading }}
    >
      <HomeContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Banner getRandomContent={getRandomContent} section="movie" category="trending" />
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
