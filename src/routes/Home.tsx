import styled from "styled-components";
import { makeImagePath } from "../utils";
import Slider from "../components/Slider";
import { MovieDataContext, MovieProvider } from "../context/DataContext";

const HomeContainer = styled.div`
  background-color: black;
  overflow-x: hidden;
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
  const { nowPlayingData, popularData, topRatedData, upcomingData, isLoading } = MovieProvider();

  return (
    <MovieDataContext.Provider value={{ nowPlayingData, popularData, topRatedData, upcomingData, isLoading }}>
      <HomeContainer>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner bgPhoto={makeImagePath(nowPlayingData?.results[0].backdrop_path || "")}>
              <Title>{nowPlayingData?.results[0].title}</Title>
              <Overview>{nowPlayingData?.results[0].overview}</Overview>
            </Banner>
            <Slider title="Now Playing" section="movie" category="now_playing" />
            <Slider title="Popular" section="movie" category="popular" />
            <Slider title="Top Rated" section="movie" category="top_rated" />
            <Slider title="Upcoming" section="movie" category="upcoming" />
          </>
        )}
      </HomeContainer>
    </MovieDataContext.Provider>
  );
}

export default Home;
