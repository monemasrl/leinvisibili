"use client";
import React from "react";
import style from "./textHide.module.scss";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
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
        <div className={`${style.toHide} ${openContent ? style.open : ""}`}>
          <section
            className={classStyle || ""}
            dangerouslySetInnerHTML={{ __html: contenuto }}
          />
        </div>
        <button
          onClick={() => {
            setOpenContent((prev) => !prev);
            window.scrollTo(0, 0);
          }}
        >
          {/* <span>{openContent == false ? "mostra tutto" : "nascondi"}</span> */}
          {openContent == true ? <FaAnglesUp /> : <FaAnglesDown />}
        </button>
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
