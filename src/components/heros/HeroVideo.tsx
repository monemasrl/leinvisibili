"use client";
import Image from "next/image";
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

function HeroVideo({
  typeOfData,
  URL,
  data,
}: {
  URL: string;
  data: any;
  typeOfData: "video" | "image";
}) {
  const isHome = usePathname() === "/";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
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
        duration: 1,
        ease: easeOut,
      },
    },
  };

  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -500]);
  if (!isHome) {
    return null;
  }
  return (
    <section className={style.hero}>
      <div className={style.hero__wrapperVideo}>
        <motion.svg
          width="178"
          height="182"
          viewBox="0 0 178 182"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: "30%" }}
          transition={{ duration: 1, ease: easeOut, delay: 2 }}
        >
          <path d="M70.6207 32.1858H1V181.377H147.919V107.216" stroke="white" />
          <path d="M6.11182 40.3269V175.697H65.561" stroke="white" />
          <path
            d="M87.6319 121.542L144.606 0.500013L177.234 0.500015L101.685 172.06L75.5737 172.06L17.2739 44.0677L51.4505 44.0677L86.7244 121.537L87.172 122.519L87.6319 121.542Z"
            stroke="white"
          />
        </motion.svg>
        {typeOfData === "video" && (
          <>
            {" "}
            <video
              autoPlay
              loop
              muted
              playsInline
              className={style.hero__video}
            >
              <source src={URL} type="video/mp4" />
              <Image
                className={style.hero__image}
                src={"/image/mainImage.jpg"}
                fill
                alt="Immagine Principale HomePage"
                onLoadingComplete={() => setLoading(false)}
                priority
              />
            </video>
            <div className={style.hero__wrapperImg}>
              <Image
                className={style.hero__image}
                src={"/image/mainImage.jpg"}
                fill
                alt="Immagine Principale HomePage"
                onLoadingComplete={() => setLoading(false)}
                priority
              />
              {loading && <LoaderSite loading={loading} />}
            </div>
          </>
        )}
        {typeOfData === "image" && (
          <ImagePreload
            src={URL}
            alt="heroImage"
            type="hero"
            width={1920}
            height={1080}
          />
        )}
      </div>

      <motion.div className={style.hero__text} style={{ y }}>
        <motion.ul variants={container} initial="hidden" animate="show">
          {data.list.map((listItem: string, index: number) => (
            <motion.li key={index} variants={item}>
              <span>{listItem}</span>
            </motion.li>
          ))}
        </motion.ul>{" "}
        <motion.div
          className={style.hero__text__quoteBy}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          {data.quoteBy}
        </motion.div>
      </motion.div>
    </section>
  );
}
export default HeroVideo;
