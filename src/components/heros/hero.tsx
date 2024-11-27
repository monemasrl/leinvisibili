"use client";
import Image, { StaticImageData } from "next/image";
import style from "./Hero.module.scss";
import { easeOut, motion, useTransform, useScroll } from "framer-motion";
import { useState } from "react";
import LoaderSite from "@/components/loaders/loader";
import { usePathname } from "next/navigation";

import React from "react";
/**
 * HERO VIDEO
 * Componente per la gestione del video in homepage con testo
 *
 * @param {{ videoURL: string; data: any }} param0
 * variabile videoURL: string,
 * definisce l'url del video
 * variabile data: any
 * definisce il testo da visualizzare, può essere un oggetto complesso
 */

function Hero({
  typeOfData,
  IMGURL,
  VIDEOURL,
  data,
}: {
  IMGURL?: StaticImageData;
  data: any;
  typeOfData: "video" | "image";
  VIDEOURL?: string;
}) {
  const isHome = usePathname() === "/";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();

  if (!isHome) {
    return null;
  }
  return (
    <section className={style.hero}>
      <div className={style.hero__wrapperVideo}>
        {typeOfData === "image" && (
          <Image src={IMGURL || ""} alt="heroImage" width={1920} height={900} />
        )}
      </div>

      <motion.div
        className={style.hero__text}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,

          transition: {
            duration: 0.5,
            ease: easeOut,
          },
        }}
      >
        <motion.ul variants={container} initial="hidden" animate="show">
          {data.list?.map((listItem: string, index: number) => (
            <motion.li key={index} variants={item}>
              <span>{listItem}</span>
            </motion.li>
          ))}
        </motion.ul>{" "}
        <motion.div
          className={style.hero__text__title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          {data.titolo}
        </motion.div>
      </motion.div>
    </section>
  );
}
export default Hero;
