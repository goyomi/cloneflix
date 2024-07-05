import styled from "styled-components";
import { makeImagePath } from "../utils";

const ContentImage = styled.div<{ $customStyle?: string }>`
  margin-bottom: 1rem;
  aspect-ratio: 1 / 1.5;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: black;
  ${(props) => props.$customStyle}
`;

const NoImage = styled(ContentImage)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: currentColor;
  ${(props) => props.$customStyle}
`;

interface IContentImage {
  imagePath: string;
  customImageStyle?: string;
  customNoImageStyle?: string;
}

function ContentWithImage({ imagePath, customImageStyle, customNoImageStyle }: IContentImage) {
  return imagePath ? (
    <ContentImage $customStyle={customImageStyle} style={{ backgroundImage: `url(${makeImagePath(imagePath)})` }} />
  ) : (
    <NoImage $customStyle={customNoImageStyle}>"No Image"</NoImage>
  );
}

export default ContentWithImage;
