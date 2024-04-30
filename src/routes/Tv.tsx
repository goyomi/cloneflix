import styled from "styled-components";
import { makeImagePath } from "../utils";
import Slider from "../components/Slider";
import { TvShowDataContext, TvShowProvider } from "../context/DataContext";

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

function Tv() {
  const { airingTodayData, onTheAirData, tvPopularData, tvTopRatedData, isLoading } = TvShowProvider();

  return (
    <TvShowDataContext.Provider value={{ airingTodayData, onTheAirData, tvPopularData, tvTopRatedData, isLoading }}>
      <HomeContainer>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner bgPhoto={makeImagePath(airingTodayData?.results[0].backdrop_path || "")}>
              <Title>{airingTodayData?.results[0].title}</Title>
              <Overview>{airingTodayData?.results[0].overview}</Overview>
            </Banner>
            <Slider title="Airing Today" section="tv" category="airing_today" />
            <Slider title="On The Air" section="tv" category="on_the_air" />
            <Slider title="Popular" section="tv" category="popular" />
            <Slider title="Top Rated" section="tv" category="top_rated" />
          </>
        )}
      </HomeContainer>
    </TvShowDataContext.Provider>
  );
}

export default Tv;
