import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IData } from "../type";
import { useNavigate } from "react-router-dom";
import { InfoIconSvg } from "../svg";

const Container = styled.article<{ $bgPhoto: string }>`
  height: 100vh;
  padding: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.$bgPhoto});
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
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  getRandomContent: () => IData | null;
  section: string;
  category: string;
}

function Banner({ getRandomContent, section, category }: IBannerProps) {
  const navigate = useNavigate();
  const randomContent = getRandomContent();
  if (!randomContent) return <section>No content available</section>;
  const onCardClicked = () => navigate(`/${section}/${category}/${randomContent.id}`);

  return (
    <Container $bgPhoto={makeImagePath(randomContent.backdrop_path || "")}>
      <ContentWrapper>
        <Title>{randomContent.title || randomContent.name}</Title>
        <Overview>{randomContent.overview}</Overview>
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
