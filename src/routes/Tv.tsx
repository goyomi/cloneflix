import { useQuery } from "react-query";
import { getAiringTodayTVShow, getOnTheAirTVShow, getPopularTVShow, getTopRatedTVShow } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import Slider from "../components/Slider";

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

function Tv() {
  const { data, isLoading: airingTodayIsLoading } = useQuery(["tvShows", "airingToday"], getAiringTodayTVShow);
  const { data: onTheAirData, isLoading: onTheAirLoading } = useQuery(["tvShows", "onTheAir"], getOnTheAirTVShow);
  const { data: popularData, isLoading: popularIsLoading } = useQuery(["tvShows", "popular"], getPopularTVShow);
  const { data: topRatedData, isLoading: topRatedIsLoading } = useQuery(["tvShows", "topRated의"], getTopRatedTVShow);

  const isLoading = airingTodayIsLoading || onTheAirLoading || popularIsLoading || topRatedIsLoading;

  return (
    <HomeContainer>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {data ? <Slider data={data} title="Airing Today" /> : null}
          {onTheAirData ? <Slider data={onTheAirData} title="On The Air" /> : null}
          {popularData ? <Slider data={popularData} title="Popular" /> : null}
          {topRatedData ? <Slider data={topRatedData} title="Top Rated" /> : null}
        </>
      )}
    </HomeContainer>
  );
}

export default Tv;
