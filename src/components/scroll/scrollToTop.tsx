"use client";
import style from "./scroll.module.scss";
import { RxArrowUp } from "react-icons/rx";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

function ScrollTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) setVisible(true);
    else setVisible(false);
  });

  return (
    <motion.div
      className={style.scrollTop}
      style={{ opacity: visible ? 0.5 : 0, transition: "opacity 0.5s" }}
      transition={{ duration: 0.5 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <RxArrowUp />
    </motion.div>
  );
}

export default ScrollTop;
