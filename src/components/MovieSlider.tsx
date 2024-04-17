import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetMovies } from "../type";
import { makeImagePath } from "../utils";

const Slider = styled.section`
  position: relative;
  top: -10rem;
`;

const Row = styled(motion.div)`
  width: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const Card = styled(motion.div)`
  width: 100%;
  height: 20rem;
  background-color: ${(props) => props.theme.black.lighter};
  cursor: pointer;
  &:first-child {
    transform-origin: left;
  }
  &:last-child {
    transform-origin: right;
  }
`;

const MovieImage = styled(motion.img)<{ src: string }>`
  width: 100%;
  height: 20rem;
  object-fit: cover;
`;

const Info = styled(motion.h4)`
  width: 100%;
  padding: 2rem;
  height: 5rem;
  font-size: 1.5rem;
  text-align: center;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
`;

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

const rowVariants = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};

const cardVariants = {
  normal: { scale: 1 },
  hover: { scale: 1.3, y: -50, transition: { type: "tween", delay: 0.2, duration: 0.3 }, zIndex: 10, ease: "linear" },
};

const infoVariants = {
  hover: { opacity: 1 },
};

const offset = 6;

function MovieSlider({ data }: { data: IGetMovies }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const movieIdMatch = useRouteMatch<{ movieId: string }>("/movie/:movieId");
  const history = useHistory<{ movieId: string }>();
  const clickedMovie =
    movieIdMatch?.params.movieId && data?.results.find((movie) => String(movie.id) === movieIdMatch.params.movieId);
  console.log(clickedMovie);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onCardClicked = (movieId: string) => history.push(`/movie/${movieId}`);
  const onOverlayClicked = () => history.push("/");

  return (
    <>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.8, ease: "linear" }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Card
                  onClick={() => onCardClicked(movie.id)}
                  key={movie.id}
                  variants={cardVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  layoutId={movie.id}
                >
                  <MovieImage src={makeImagePath(movie.backdrop_path)} />
                  <Info variants={infoVariants}>{movie.title}</Info>
                </Card>
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
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
    </>
  );
}

export default MovieSlider;
