"use client";
import React from "react";
import style from "./textHide.module.scss";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { motion } from "motion/react";
function TextHide({
  contenuto,
  classStyle,
}: {
  contenuto: string;
  classStyle: string;
}) {
  const [openContent, setOpenContent] = React.useState(false);

  if (contenuto.length > 1000) {
    return (
      <div className={style.container}>
        <motion.div
          className={style.toHide}
          initial={{
            height: 500,
            overflow: "hidden",
          }}
          animate={{
            height: !openContent ? 490 : "auto",
            overflow: !openContent ? "hidden" : "vislbe",
          }}
          transition={{
            duration: !openContent ? 1 : 3,
          }}
        >
          <section
            className={classStyle || ""}
            dangerouslySetInnerHTML={{ __html: contenuto }}
          />
        </motion.div>
        {!openContent && (
          <button
            onClick={() => {
              setOpenContent((prev) => !prev);
            }}
          >
            <FaAnglesDown />
          </button>
        )}
      </div>
    );
  }
  return (
    <section
      className={classStyle || ""}
      dangerouslySetInnerHTML={{ __html: contenuto }}
    />
  );
}

export default TextHide;
