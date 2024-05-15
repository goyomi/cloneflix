import styled from "styled-components";
import Slider from "../components/Slider";
import { HomeDataContext, HomeDataProvider } from "../context/DataContext";
import Banner from "../components/Banner";

const HomeContainer = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10rem;
`;

function Home() {
  const { movieTrendingData, tvTrendingData, isLoading } = HomeDataProvider();

  return (
    <HomeDataContext.Provider value={{ movieTrendingData, tvTrendingData, isLoading }}>
      <HomeContainer>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner movieTrendingData={movieTrendingData} />
            <Slider title="Movie" section="movie" category="trending" />
            <Slider title="TV" section="tv" category="trending" />
          </>
        )}
      </HomeContainer>
    </HomeDataContext.Provider>
  );
}

export default Home;
