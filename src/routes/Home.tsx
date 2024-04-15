import { useQuery } from "react-query";
import { getMovies } from "../api";
import { IGetMovies } from "../type";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const HomeContainer = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10rem;
`;

const Banner = styled.article<{ bgPhoto: string }>`
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

const Card = styled(motion.div)<{ bgPhoto: string }>`
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
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

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMovies>(["movies", "nowPlaying"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
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

  return (
    <HomeContainer>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner onClick={increaseIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Card key={movie.id} bgPhoto={makeImagePath(movie.backdrop_path)} />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </HomeContainer>
  );
}

export default Home;
