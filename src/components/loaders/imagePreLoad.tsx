"use client";

import { AnimatePresence, motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import "./imagepreload.scss";

export const ImagePreload = ({
  src,
  alt,
  width,
  height,
  isLazy,
  type,
}: {
  src: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
  isLazy?: boolean;
  type: "fill" | "hero" | "fixed";
}) => {
  const [reveal, setReveal] = useState(false);
  const visibility = reveal ? "visible" : "hidden";
  const loader = reveal ? "none" : "inline-block";
  console.log(src);
  return (
    <div
      className={`${"imagePreloadWrapper"} ${
        type === "hero" ? "hero" : type === "fill" ? "fill" : "fixed"
      }`}
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      {type === "hero" && (
        <Image
          className={"imagePreload"}
          src={src || ""}
          alt={alt}
          layout="fill"
          style={{ visibility, objectFit: "cover", width: "100%" }}
          onError={() => setReveal(true)}
          onLoadingComplete={() => setReveal(true)}
          priority={true}
          sizes="(max-width: 440px) 30vw,(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
      )}
      {type === "fixed" && (
        <Image
          src={src || ""}
          alt={alt}
          width={width}
          height={height}
          style={{ visibility }}
          onError={() => setReveal(true)}
          onLoadingComplete={() => setReveal(true)}
          priority={isLazy}
          sizes="(max-width: 480px) 40vw,"
        />
      )}

      {type === "fill" && (
        <Image
          className={"imagePreload"}
          src={src || ""}
          alt={alt}
          layout="fill"
          onError={() => setReveal(true)}
          onLoadingComplete={() => setReveal(true)}
          priority={!isLazy}
          sizes="(max-width: 480px) 50vw, (max-width: 1200px) 100vw, 100vw"
        />
      )}
      <AnimatePresence>
        {!reveal && (
          <motion.div className={"loader"}>
            <motion.div
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              <Image
                className={"imagePreload"}
                src="/image/leiloader.svg"
                width={300}
                height={58}
                alt="logo"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ImagePreload;
