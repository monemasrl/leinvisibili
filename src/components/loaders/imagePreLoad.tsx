"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import "./imagepreload.scss";

export const ImagePreload = ({
  loader,
  image,
  round = false,
  backgroundColor = "transparent",
  type,
  classname,
}: {
  loader?: { url: StaticImageData | string; width: number; height: number };
  image: {
    url: StaticImageData | string;
    width: number;
    height: number;
    alt: string;
  };
  children?: React.ReactNode;
  round?: boolean;
  type: "fill" | "hero" | "fixed";
  backgroundColor?: string;
  classname?: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={"imagePreload" + " " + type + " " + (classname || "")}
      style={{
        borderRadius: round ? "50%" : "0",
        overflow: round ? "hidden" : "",
      }}
    >
      {!loaded && (
        <div className="imagePreload__loader" style={{ backgroundColor }}>
          {loader && (
            <Image
              src={loader.url}
              alt={"loader"}
              width={loader.width}
              height={loader.height}
              style={{ width: loader.width, height: loader.height }}
            />
          )}
        </div>
      )}
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        onLoad={(e) => {
          (e.currentTarget as HTMLImageElement).classList.add("loaded");
          setLoaded(true);
        }}
      />
    </div>
  );
};
export default ImagePreload;
