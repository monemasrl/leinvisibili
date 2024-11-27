"use client";
import style from "./splash.module.scss";
import IconAnimation from "../svg/iconAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
function Splash({}) {
  const [splash, setSplash] = useState(true);
  setTimeout(() => {
    setSplash(false);
  }, 1300);

  return (
    <AnimatePresence>
      {splash && (
        <motion.div
          key="splash"
          initial={{ backgroundColor: "#000000", opacity: 1 }}
          animate={{ backgroundColor: "#000000", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={style.splash}>
            <div className={style.splash__svgwrapper}>
              <IconAnimation />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Splash;
