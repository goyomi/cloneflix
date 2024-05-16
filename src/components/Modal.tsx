import { AnimatePresence, motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { ICredits, IData, IDetailData, ISimilar } from "../type";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getContentCredits, getContentDetail, getContentSimilar } from "../api";
import styles from "../styles/modal.module.scss";
import ContentInformation from "./ModalContents/ContentInformation";
import CastMember from "./ModalContents/CastMember";
import SimilarContent from "./ModalContents/SimilarContent";

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
          <motion.div
            className={styles.overlay}
            onClick={onOverlayClicked}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.article className={styles.modal_wrapper} layoutId={clickedCard.id}>
            <div
              className={styles.background_image}
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  clickedCard.backdrop_path
                )})`,
              }}
            />
            <ContentInformation clickedCard={clickedCard} detailData={detailData} />
            {creditsData ? <CastMember creditsData={creditsData} /> : null}
            {similarData ? <SimilarContent similarData={similarData} section={section} /> : null}
          </motion.article>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;
