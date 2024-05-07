import { AnimatePresence, motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { ICredits, IData, IDetailData, ISimilar } from "../type";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getContentCredits, getContentDetail, getContentSimilar } from "../api";
import styles from "../styles/modal.module.scss";
import ModalContent from "./ModalContent";

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
            <ModalContent clickedCard={clickedCard} detailData={detailData} />
            {creditsData ? (
              <section className={styles.credit_part}>
                <h2 className={styles.title}>Cast Members</h2>
                <div className={styles.member_wrapper}>
                  {creditsData.cast.map((member, idx) => (
                    <span className={styles.member_card} key={idx}>
                      <div
                        className={styles.member_image}
                        style={{ backgroundImage: `url(${makeImagePath(member.profile_path)})` }}
                      >
                        {!member.profile_path && "No Image"}
                      </div>
                      <span>{member.name}</span>
                      <span>{member.character}</span>
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
            {similarData ? (
              <section className={styles.credit_part}>
                <h2 className={styles.title}>Similar {section}</h2>
                <div className={styles.member_wrapper}>
                  {similarData.results.slice(0, 6).map((data, idx) => (
                    <span className={styles.member_card} key={idx}>
                      <div
                        className={styles.member_image}
                        style={{ backgroundImage: `url(${makeImagePath(data.poster_path)})` }}
                      >
                        {!data.poster_path && "No Image"}
                      </div>
                      <span>{data.name || data.title}</span>
                      <span>(★ {data.vote_average})</span>
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
          </motion.article>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;
