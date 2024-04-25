import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath, starRating } from "../utils";
import { IData, IDetailData } from "../type";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getContentCredits, getContentDetail, getContentSimilar } from "../api";

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 10rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 0.5rem;
  overflow: hidden;
  z-index: 10;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: calc(80vh / 2);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
`;

const PosterImage = styled.div`
  display: inline-block;
  margin-top: -20rem;
  width: calc(40vw * 0.25);
  height: 0;
  padding-top: 56.25%;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const TextWrapper = styled.div`
  margin-top: -10rem;
  padding: 1.5rem;
  width: calc(40vw * 0.7);

  & > * {
    margin-bottom: 0.6rem;
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
  .vote_average {
    font-size: 2rem;
  }
`;

const VoteAverage = styled.div`
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
`;

const ContentOverview = styled.p`
  font-size: 1.5rem;
  line-height: 2rem;
`;

function Modal({ clickedCard }: { clickedCard: IData | null }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onOverlayClicked = () => navigate(-1);
  const [section, category, id] = location.pathname.split("/").filter((value) => value);
  const { data: detailData } = useQuery<IDetailData>({
    queryKey: [section, category],
    queryFn: () => getContentDetail(section, id),
  });

  const { data: creditsData } = useQuery({
    queryKey: [section, category],
    queryFn: () => getContentCredits(section, id),
  });

  const { data: similarData } = useQuery({
    queryKey: [section, category],
    queryFn: () => getContentSimilar(section, id),
  });

  return (
    <AnimatePresence>
      {clickedCard ? (
        <>
          <Overlay onClick={onOverlayClicked} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <ModalWrapper layoutId={clickedCard.id}>
            {clickedCard && (
              <>
                <BackgroundImage
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedCard.backdrop_path
                    )})`,
                  }}
                />
                <ContentWrapper>
                  <PosterImage style={{ backgroundImage: `url(${makeImagePath(clickedCard.poster_path)})` }} />
                  <TextWrapper>
                    <h2 className="title">{clickedCard.title || clickedCard.name}</h2>
                    <h3 className="original_title">{clickedCard.original_name}</h3>
                    <VoteAverage>{starRating(clickedCard.vote_average)}</VoteAverage>
                    <ContentOverview>{clickedCard.overview}</ContentOverview>
                  </TextWrapper>
                </ContentWrapper>
              </>
            )}
          </ModalWrapper>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;
