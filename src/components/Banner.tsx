import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IGetMovie } from "../type";
import { useNavigate } from "react-router-dom";
import { InfoIconSvg } from "../svg";

const Container = styled.article<{ bgPhoto: string }>`
  height: 100vh;
  padding: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const ContentWrapper = styled.div`
  width: 60%;
`;

const Title = styled.h2`
  font-size: 5rem;
`;

const Overview = styled.p`
  width: 60%;
  margin: 2rem 0;
  font-size: 2rem;
  line-height: calc(2rem * 1.3);
`;

const InfoButton = styled.button`
  width: 12rem;
  padding: 1.2rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const InfoIcon = styled.svg`
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 0.5rem;
  fill: currentColor;
  vertical-align: text-top;
`;

interface IBannerProps {
  movieTrendingData: IGetMovie;
  section: string;
  category: string;
}

function Banner({ movieTrendingData, section, category }: IBannerProps) {
  const navigate = useNavigate();
  const onCardClicked = () => navigate(`/${section}/${category}/${MOVIE_RESULTS_DATA.id}`);

  const MOVIE_RESULTS_DATA = movieTrendingData?.results[0];
  return (
    <Container bgPhoto={makeImagePath(MOVIE_RESULTS_DATA.backdrop_path || "")}>
      <ContentWrapper>
        <Title>{MOVIE_RESULTS_DATA.title}</Title>
        <Overview>{MOVIE_RESULTS_DATA.overview}</Overview>
      </ContentWrapper>
      <InfoButton onClick={onCardClicked}>
        <InfoIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <InfoIconSvg />
        </InfoIcon>
        More Info
      </InfoButton>
    </Container>
  );
}

export default Banner;
