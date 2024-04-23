import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IMovie } from "../type";
import { useNavigate } from "react-router-dom";

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
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40vw;
  height: 80vh;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const ModalImage = styled.div`
  width: 100%;
  height: calc(80vh / 2);
  background-position: center center;
  background-size: cover;
`;

const ModalTitle = styled.h2`
  padding: 1.5rem;
  margin-top: -6rem;
  font-size: 3.5rem;
`;

const ModalOverview = styled.p`
  padding: 1.5rem;
  font-size: 1.5rem;
  line-height: 2rem;
`;

function Modal({ clickedCard }: { clickedCard: IMovie | null }) {
  const navigate = useNavigate();
  const onOverlayClicked = () => navigate("/");
  return (
    <AnimatePresence>
      {clickedCard ? (
        <>
          <Overlay onClick={onOverlayClicked} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <ModalWrapper layoutId={clickedCard.id}>
            {clickedCard && (
              <>
                <ModalImage
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedCard.backdrop_path
                    )})`,
                  }}
                />
                <ModalTitle>{clickedCard.title}</ModalTitle>
                <ModalOverview>{clickedCard.overview}</ModalOverview>
              </>
            )}
          </ModalWrapper>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;
