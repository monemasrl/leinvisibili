"use client";
import React from "react";
import style from "./Hero.module.scss";
import Image from "next/image";
import Link from "next/link";
import freccia from "../../../public/image/freccia.svg";
import { motion, AnimatePresence } from "motion/react";
import useMediaquery from "../../hooks/mediaquery";
type Tdata = {
  nome: string | null;
  descrizione: string | null;
  image: string | null;
  data_nascita: string | null;
  data_morte: string | null;
  link: string | null;
};
function HeroLei({
  data,
  assetsURL,
}: {
  data: Tdata[] | undefined;
  assetsURL: string | undefined;
}) {
  const [boxOpen, setBoxOpen] = React.useState<number | null>(null);

  const { landscape } = useMediaquery();

  return (
    <div className={style.hero}>
      {data?.map((item, index) => {
        return (
          <div
            className={`${style.hero__box} ${boxOpen != null && style.open}`}
            key={index}
            onClick={() => setBoxOpen(index)}
          >
            {item && assetsURL && (
              <Image
                src={assetsURL + item.image || ""}
                width={566}
                height={1050}
                alt={item.nome || ""}
                sizes="(max-width: 460px) 30vw"
                priority={true}
              />
            )}
          </div>
        );
      })}
      {landscape ? (
        <AnimatePresence>
          {data && boxOpen != null && (
            <motion.div className={style.hero__content}>
              <motion.div
                className={style.closeArea}
                onClick={() => setBoxOpen(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></motion.div>
              <motion.div
                className={style.hero__content__box}
                animate={{
                  opacity: [0, 1],
                  x: [-1000, 0],
                  rotate: [20, 0],

                  transition: { duration: 1.5 },
                }}
                exit={{ opacity: 0, x: -100, transition: { duration: 0.5 } }}
              >
                {assetsURL && (
                  <Image
                    src={assetsURL + data[boxOpen].image || ""}
                    width={485}
                    height={675}
                    alt={data[boxOpen].nome || ""}
                  />
                )}
                <div className={style.hero__content__box__text}>
                  <motion.div
                    className={style.data}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.6, duration: 0.5 },
                    }}
                    exit={{ opacity: 0 }}
                  >
                    {" "}
                    {data[boxOpen].data_nascita} - {data[boxOpen].data_morte}
                    <h2>{data[boxOpen].nome}</h2>
                  </motion.div>

                  <motion.div
                    dangerouslySetInnerHTML={{
                      __html: data[boxOpen].descrizione || "",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.8, duration: 0.5 },
                    }}
                    exit={{ opacity: 0 }}
                  />

                  <motion.div
                    className={style.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 2, duration: 0.5 },
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <Link href={`/autrici/${data[boxOpen].link}`}>
                      Scopri di più
                    </Link>
                    <Image src={freccia} width={200} height={3} alt="freccia" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}{" "}
        </AnimatePresence>
      ) : null}
    </div>
  );
}

export default HeroLei;
