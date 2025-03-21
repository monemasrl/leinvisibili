"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion, m } from "motion/react";
import Image from "next/image";
import style from "./parallax.module.scss";
import { useLenis } from "@studio-freight/react-lenis";
import { useRouter } from "next/navigation";
import useMediaquery from "@/hooks/mediaquery";
function Parallax({
  className,
  imageURL,
  alt,
  text,
  buttonText,
  buttonLink,
  buttonScroll,
}: {
  imageURL: string;
  alt: string;
  className?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonScroll?: string;
}) {
  const paralRef = useRef(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: paralRef,
    offset: ["start end", "end start"],
  });

  const parallax = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const { landscape, desktop } = useMediaquery();
  const scroll = useLenis();
  return (
    <motion.div
      className={`${style.parallaxContainer} ${
        style[className as keyof typeof style]
      } ${landscape ? style["small"] : desktop ? style["medium"] : ""}`}
      ref={paralRef}
    >
      <motion.div
        style={{ y: landscape ? "0px" : parallax }}
        className={style.parallaxContainer__parallax__img}
      >
        <Image
          src={imageURL}
          width={1920}
          height={900}
          alt={alt}
          sizes="(max-width: 440px) 350px, (max-width: 768px) 768px, 1920px"
        />
      </motion.div>

      <motion.div className={style.parallaxContainer__parallax__testo}>
        <div
          className={style.parallaxContainer__parallax__testo_div}
          dangerouslySetInnerHTML={{ __html: text || "" }}
        />

        {buttonText && (
          <button
            className={style.parallaxContainer__parallax__testo__button}
            onClick={(e) => {
              e.preventDefault();
              //se è un'ancora usa lo scroll di lenis
              if (buttonScroll) {
                scroll?.scrollTo(buttonScroll, { offset: -100 });
              }
              if (buttonLink) {
                //altrimenti usa il router di next
                router.push(buttonLink || "");
              }
            }}
          >
            {buttonText}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Parallax;
