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
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={"imagePreload" + " " + type}
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
        alt={"test"}
        width={image.width}
        height={image.height}
        onLoadingComplete={(e) => {
          e.classList.add("loaded");
          setLoaded(true);
        }}
      />
    </div>
  );
};
export default ImagePreload;
