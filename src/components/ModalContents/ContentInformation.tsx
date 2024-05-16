import styled from "styled-components";
import { IData, IDetailData } from "../../type";
import { makeImagePath, starRating } from "../../utils";

const InfoWrapper = styled.section`
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const PosterImage = styled.div`
  flex: 3;
  display: inline-block;
  margin-top: -55vh;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const TextWrapper = styled.div`
  flex: 7;
  margin-top: -18vh;
  padding: 1.5rem;
  width: calc(40vw * 0.7);

  & > * {
    margin-bottom: 0.7rem;
  }

  .title,
  .original_title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .title {
    font-size: 3rem;
  }
  .original_title {
    font-size: 2.5rem;
    height: 2.5rem;
  }
`;

const DetailInfoList = styled.ul`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.7rem;

  li .vote_average {
    font-size: 1.8rem;
    color: currentColor;
    .full {
      color: gold;
    }
    .half {
      position: relative;
      display: inline-block;
    }
    .half::before {
      display: inline-block;
      content: "★";
      width: 50%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      color: gold;
    }
  }
`;

const GenreList = styled(DetailInfoList)`
  li h4 {
    margin-bottom: 0;
    padding: 0.3rem 0.5rem;
    background-color: rgba(179, 57, 57, 1);
    border-radius: 0.5rem;
  }
`;

const Overview = styled.p`
  font-size: 1.7rem;
  line-height: 2rem;
  text-align: justify;
`;

function ContentInformation({ clickedCard, detailData }: { clickedCard: IData; detailData: IDetailData }) {
  return (
    <InfoWrapper>
      <PosterImage style={{ backgroundImage: `url(${makeImagePath(clickedCard.poster_path)})` }} />
      <TextWrapper>
        <h2 className="title">{clickedCard.title || clickedCard.name}</h2>
        <h3 className="original_title">{clickedCard.original_name}</h3>
        <DetailInfoList>
          <li>
            <h4>{clickedCard.release_date || clickedCard.first_air_date}</h4>
          </li>
          <li>
            <h4>{detailData.episode_run_time || detailData.runtime} min</h4>
          </li>
          <li>
            <div className="vote_average">{starRating(clickedCard.vote_average)}</div>
          </li>
        </DetailInfoList>
        <GenreList>
          {detailData.genres.map((val, idx) => (
            <li>
              <h4 key={idx}>{val.name}</h4>
            </li>
          ))}
        </GenreList>
        <Overview className="content_overview">{clickedCard.overview}</Overview>
      </TextWrapper>
    </InfoWrapper>
  );
}

export default ContentInformation;
