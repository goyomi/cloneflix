import { useQuery } from "@tanstack/react-query";
import { getTrendingData } from "../api";
import styled from "styled-components";
import Slider from "../components/Slider";
import { makeImagePath } from "../utils";
import { ITrending } from "../type";
import { HomeDataContext, HomeDataProvider, MovieProvider } from "../context/DataContext";

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

const Banner = styled.article<{ bgPhoto: string }>`
  height: 100vh;
  padding: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 5.4rem;
  margin-bottom: 2rem;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 1.6rem;
  line-height: calc(1.6rem * 1.3);
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
            <Banner bgPhoto={makeImagePath(movieTrendingData?.results[0].backdrop_path || "")}>
              <Title>{movieTrendingData?.results[0].title}</Title>
              <Overview>{movieTrendingData?.results[0].overview}</Overview>
            </Banner>
            <Slider title="Movie" section="movie" category="trending" />
            <Slider title="TV" section="tv" category="trending" />
          </>
        )}
      </HomeContainer>
    </HomeDataContext.Provider>
  );
}

export default Home;
