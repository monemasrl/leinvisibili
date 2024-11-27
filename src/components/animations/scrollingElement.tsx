"use client";
import React, { useRef } from "react";
import style from "./animations.module.scss";
import {
  useScroll,
  useTransform,
  motion,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";
function ScrollingElement({
  src,
  className,
  from,
  to,
  noScroll = false,
}: {
  src: string;
  className: string;
  from: string;
  to: string;
  noScroll?: boolean;
}) {
  /**
   * SCROLLING ELEMENT
   * Componente per la gestione di un elemento che si muove in base allo scroll della pagina
   */
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0.3, 0.7], [from, to]);
  const imageScroll = useMotionTemplate`${progress}`;
  return (
    <motion.div
      className={`${style.scrollingElement} ${style[className]}`}
      style={{
        top: !noScroll ? imageScroll : from,
      }}
    >
      {" "}
      <Image src={src} alt="Picture of the author" fill quality={90} />
    </motion.div>
  );
}

export default ScrollingElement;
