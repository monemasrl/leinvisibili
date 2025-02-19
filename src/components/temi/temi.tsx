"use client";
import React, { use, useEffect, useRef, useState } from "react";
import style from "./temi.module.scss";
import { tTemi, tAutriciTemi, tAutrice, tLuoghi } from "@/type";
import Image from "next/image";
import { formatDataFromApi } from "@/utility/generic";
import freccia from "../../../public/image/freccia.svg";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue } from "motion/react";
import anelli from "../../../public/image/anelli.png";
import immaginitematiche from "../../../public/image/tematiche.svg";
function Temi({
  data,
  temiAutrici,
  autrici,
  mainTitle,
  luoghi,
}: {
  data: tTemi[];
  temiAutrici: tAutriciTemi[];
  autrici: tAutrice[];
  mainTitle: string;
  luoghi: tLuoghi[];
}) {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end end"],
  });
  const rotation = useTransform(scrollYProgress, [0.1, 1], [50, -2]);

  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0.2, 1]);

  const [motionValueOpacity, setMotionvalueOpacity] = useState<number>(0);

  opacity.on("change", (value) => {
    setMotionvalueOpacity(value);
  });

  return (
    <div className={style.wrappertemi} ref={scrollRef}>
      <Image src={immaginitematiche} alt="immagine tematiche" />
      <motion.div
        className={style.temi}
        style={{
          rotateZ: rotation,
          //boxShadow: `5px 0 23px rgba(192, 192, 192, ${motionvalue})`,
          background: `linear-gradient(90deg, rgb(240, 217, 207) 0%, rgb(242 228 218) 20%)`,
          opacity: motionValueOpacity,
        }}
      >
        <Image
          className={style.anelli}
          src={anelli}
          alt="anelli immagine grafica"
        />
        {mainTitle && <h2>{mainTitle}</h2>}
        <motion.div
          className={style.temi__box}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <h2>{data[0].titolo}</h2>
          <p dangerouslySetInnerHTML={{ __html: data[0].testo }} />
          <div className={style.temi__autrici}>
            {data[0].autrici.map((item, index) => {
              const autrice = getAutriciFromTema(item, temiAutrici, autrici);
              console.log(autrice?.luogo_morte, "test");

              const autriceLuoghi = {
                nascita:
                  luoghi.find((luogo) => luogo.id === autrice?.luogo_nascita) ||
                  null,
                morte:
                  luoghi.find((luogo) => luogo.id === autrice?.luogo_morte) ||
                  null,
              };
              return (
                <div key={index} className={style.temi__autrici__box}>
                  {autrice?.immagine_principale && (
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_ASSETS_URL +
                        autrice?.immagine_principale
                      }
                      width={500}
                      height={500}
                      alt={"item.titolo"}
                    />
                  )}
                  <div className={style.temi__autrici__box__text}>
                    <h3>
                      {autrice?.nome} {autrice?.cognome}
                    </h3>

                    <ul>
                      {autrice?.data_di_nascita && (
                        <li>
                          {" "}
                          {autriceLuoghi?.nascita &&
                            autriceLuoghi?.nascita.Nome}
                          -
                          {formatDataFromApi(autrice?.data_di_nascita, {
                            year: "numeric",
                          })}
                        </li>
                      )}
                      {autrice?.data_di_nascita && (
                        <li>
                          {autriceLuoghi?.morte && autriceLuoghi?.morte.Nome}-
                          {formatDataFromApi(autrice?.data_di_morte, {
                            year: "numeric",
                          })}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.temi__footer}>
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
              <Link href={`/temi/${data[0].slug}`}>Scheda tematica</Link>
              <Image src={freccia} width={220} height={6} alt="freccia" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
function getAutriciFromTema(
  idAutrici: number,
  temiautrici: tAutriciTemi[],
  autrici: tAutrice[]
) {
  const idautrice = temiautrici.find((idAutrice) => idAutrice.id === idAutrici);
  console.log(idautrice);
  const autriceData = autrici.find(
    (autrice) => autrice.id === idautrice?.autrici_id
  );
  return autriceData;
}
export default Temi;
