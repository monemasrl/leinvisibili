"use client";
import React, { useRef, useState } from "react";
import style from "./temi.module.scss";
import { tTemi, tAutriciTemi, tAutrice, tLuoghi } from "@/type";
import Image from "next/image";
import freccia from "../../../public/image/freccia.svg";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import anelli from "../../../public/image/anelli.png";
import immaginitematiche from "../../../public/image/tematiche.svg";
import immagineSfondoDefault from "../../../public/image/areatematica-min.jpg";
import useMediaquery from "@/hooks/mediaquery";
import TemiAutrici from "./temiAutrici";

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
  const { phone, tablet, landscape, desktop, large, wide, big } =
    useMediaquery();
  const mediaQueryData = {
    phone,
    tablet,
    landscape,
    desktop,
    large,
    wide,
    big,
  };

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
    <>
      <div className={style.temiBackground}>
        <Image src={immagineSfondoDefault} alt="immagine tematiche" />
      </div>
      <div className={style.wrappertemi} ref={scrollRef}>
        <Image src={immaginitematiche} alt="immagine tematiche" />
        <motion.div
          className={style.temi}
          style={{
            rotateZ: mediaQueryData.landscape ? rotation : 0,

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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <h2>{data[0].titolo}</h2>
            <p dangerouslySetInnerHTML={{ __html: data[0].abstract }} />
            <TemiAutrici
              data={data}
              temiAutrici={temiAutrici}
              autrici={autrici}
              luoghi={luoghi}
            />
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
    </>
  );
}

export default Temi;
