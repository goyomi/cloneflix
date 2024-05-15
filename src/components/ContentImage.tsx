import { motion } from "framer-motion";
import styled from "styled-components";
import { IData } from "../type";
import { useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";

const Card = styled(motion.div)`
  width: 100%;
  height: auto;
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
  aspect-ratio: 16 / 9;
`;

const Info = styled(motion.h4)`
  width: 100%;
  height: 5rem;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
`;

const cardVariants = {
  normal: { scale: 1 },
  hover: { scale: 1.3, y: -50, transition: { type: "tween", delay: 0.2, duration: 0.3 }, zIndex: 10, ease: "linear" },
};

const infoVariants = {
  hover: { opacity: 1 },
};

interface IContentImageProps {
  result: IData;
  section: string;
  category: string;
}

function ContentImage({ result, section, category }: IContentImageProps) {
  const navigate = useNavigate();
  const onCardClicked = (movieId: string) => navigate(`/${section}/${category}/${movieId}`);

  return (
    <Card
      onClick={() => onCardClicked(result.id)}
      key={result.id}
      variants={cardVariants}
      initial="normal"
      whileHover="hover"
      transition={{ type: "tween" }}
      layoutId={result.id}
    >
      <MovieImage src={makeImagePath(result.backdrop_path)} />
      <Info variants={infoVariants}>{result.title || result.name}</Info>
    </Card>
  );
}
export default ContentImage;
