import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IGetMovie } from "../type";

const BannerWrapper = styled.article<{ bgPhoto: string }>`
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

function Banner({ movieTrendingData }: { movieTrendingData: IGetMovie }) {
  return (
    <BannerWrapper bgPhoto={makeImagePath(movieTrendingData?.results[0].backdrop_path || "")}>
      <Title>{movieTrendingData?.results[0].title}</Title>
      <Overview>{movieTrendingData?.results[0].overview}</Overview>
    </BannerWrapper>
  );
}

export default Banner;
