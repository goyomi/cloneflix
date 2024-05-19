import { AnimatePresence, motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { ICredits, IData, IDetailData, ISimilar } from "../type";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getContentCredits, getContentDetail, getContentSimilar } from "../api";
import ContentInformation from "./ModalContents/ContentInformation";
import CastMember from "./ModalContents/CastMember";
import SimilarContent from "./ModalContents/SimilarContent";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 20;
`;

const ModalWrapper = styled(motion.article)`
  width: 50vw;
  min-height: 40vw;
  height: auto;
  position: absolute;
  top: 10rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #2f2f2f;
  border-radius: 0.5rem;
  z-index: 30;
  overflow-y: hidden; // border radius
`;

const BackgroundImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

function Modal({ clickedCard }: { clickedCard: IData | null }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onOverlayClicked = () => navigate(-1);
  const [section, category, id] = location.pathname.split("/").filter((value) => value);

  const { data: detailData } = useQuery<IDetailData>({
    queryKey: [section, category, "detail", id],
    queryFn: () => getContentDetail(section, id),
  });

  const { data: creditsData } = useQuery<ICredits>({
    queryKey: [section, category, "credits", id],
    queryFn: () => getContentCredits(section, id),
  });

  const { data: similarData } = useQuery<ISimilar>({
    queryKey: [section, category, "similar", id],
    queryFn: () => getContentSimilar(section, id),
  });

  return (
    <AnimatePresence>
      {clickedCard && detailData ? (
        <>
          <Overlay onClick={onOverlayClicked} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <ModalWrapper layoutId={clickedCard.id}>
            <BackgroundImage
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  clickedCard.backdrop_path
                )})`,
              }}
            />
            <ContentInformation clickedCard={clickedCard} detailData={detailData} />
            {creditsData ? <CastMember creditsData={creditsData} /> : null}
            {similarData ? <SimilarContent similarData={similarData} section={section} /> : null}
          </ModalWrapper>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;
