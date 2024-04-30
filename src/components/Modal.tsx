import { AnimatePresence, motion } from "framer-motion";
import { makeImagePath, starRating } from "../utils";
import { ICredits, IData, IDetailData, ISimilar } from "../type";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getContentCredits, getContentDetail, getContentSimilar } from "../api";
import styles from "../styles/modal.module.scss";

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

  // console.log(section, id);
  // console.log("크레딧", creditsData);
  // console.log("시밀러", similarData?.results.slice(0, 6));
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
            <section className={styles.content_part}>
              <div
                className={styles.poster_image}
                style={{ backgroundImage: `url(${makeImagePath(clickedCard.poster_path)})` }}
              />
              <div className={styles.text_wrapper}>
                <h2 className={styles.title}>{clickedCard.title || clickedCard.name}</h2>
                <h3 className={styles.original_title}>{clickedCard.original_name}</h3>
                <ul className={styles.detail_info_list}>
                  <li>
                    <h4>{clickedCard.release_date || clickedCard.first_air_date}</h4>
                  </li>
                  <li>
                    <h4>{detailData.episode_run_time || detailData.runtime} min</h4>
                  </li>
                  <li>
                    <div className={styles.vote_average}>{starRating(clickedCard.vote_average)}</div>
                  </li>
                </ul>
                <ul className={styles.genre_list}>
                  {detailData.genres.map((val, idx) => (
                    <li>
                      <h4 key={idx}>{val.name}</h4>
                    </li>
                  ))}
                </ul>
                <p className={styles.content_overview}>{clickedCard.overview}</p>
              </div>
            </section>
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
