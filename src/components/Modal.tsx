import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IGetMovies, IMovies } from "../type";
import { useMatch, useNavigate } from "react-router-dom";

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Modal = styled(motion.div)`
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

function MovieModal({ data }: { data: IGetMovies }) {
  const movieIdMatch = useMatch("/movie/:movieId");
  const navigate = useNavigate();
  const onOverlayClicked = () => navigate("/");
  const clickedMovie =
    movieIdMatch?.params.movieId &&
    data?.results.find((movie: IMovies) => String(movie.id) === movieIdMatch.params.movieId);

  return (
    <AnimatePresence>
      {movieIdMatch ? (
        <>
          <Overlay onClick={onOverlayClicked} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <Modal layoutId={movieIdMatch.params.movieId}>
            {clickedMovie && (
              <>
                <ModalImage
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path
                    )})`,
                  }}
                />
                <ModalTitle>{clickedMovie.title}</ModalTitle>
                <ModalOverview>{clickedMovie.overview}</ModalOverview>
              </>
            )}
          </Modal>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default MovieModal;
