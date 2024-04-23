import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import styled from "styled-components";
import { IMovie } from "../type";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { MovieDataContext } from "../context/DataContext";

const SliderContainer = styled.section`
  position: relative;
  top: -10rem;
  margin-bottom: 26.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SliderTitle = styled.h3`
  padding: 2rem 1rem;
  font-size: 2.5rem;
`;

const IndexButton = styled(motion.button)<{ way: string }>`
  position: absolute;
  left: ${(props) => props.way === "left" && 0};
  right: ${(props) => props.way === "right" && 0};
  top: 16.5rem;
  transform: translateY(-50%);
  height: 20rem;
  font-size: 5rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
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

const rowVariants = {
  hidden: (direction: string) => ({
    x: direction === "right" ? window.outerWidth : -window.outerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: string) => ({
    x: direction === "right" ? -window.outerWidth : window.outerWidth,
  }),
};

const cardVariants = {
  normal: { scale: 1 },
  hover: { scale: 1.3, y: -50, transition: { type: "tween", delay: 0.2, duration: 0.3 }, zIndex: 10, ease: "linear" },
};

const infoVariants = {
  hover: { opacity: 1 },
};

const offset = 6;

function Slider({ title, category }: { title: string; category: string }) {
  const { nowPlayingData, topRatedData, upcomingData } = useContext(MovieDataContext);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState("right");
  const navigate = useNavigate();

  const data = category === "now_playing" ? nowPlayingData : category === "top_rated" ? topRatedData : upcomingData;

  const variationIndex = (way: string) => {
    if (leaving || !data) return;
    toggleLeaving();
    setDirection(way);
    const totalMovie = data.results.length - 1;
    const maxIndex = Math.floor(totalMovie / offset) - 1;
    setIndex((prev) => {
      if (way === "right") {
        return prev === maxIndex ? 0 : prev + 1;
      } else {
        return prev === 0 ? maxIndex : prev - 1;
      }
    });
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onCardClicked = (movieId: string) => navigate(`/movie/${category}/${movieId}`);

  const movieIdMatch = useMatch("/movie/:category/:movieId");

  const matchCard = data.results.filter((movie: IMovie) => String(movie.id) === movieIdMatch?.params.movieId);
  let clickedCard = null;
  if (matchCard.length > 0) {
    clickedCard = matchCard[0];
  }

  return (
    <>
      <SliderContainer>
        <SliderTitle>{title}</SliderTitle>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={direction}>
          <IndexButton onClick={() => variationIndex("left")} way={"left"}>
            {"<"}
          </IndexButton>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
            transition={{ type: "tween", duration: 0.8, ease: "linear" }}
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
          <IndexButton onClick={() => variationIndex("right")} way={"right"}>
            {">"}
          </IndexButton>
        </AnimatePresence>
      </SliderContainer>
      <Modal clickedCard={clickedCard} />
    </>
  );
}

export default Slider;
