import React from "react";

import style from "./modals.module.scss";
import { AnimatePresence, motion } from "framer-motion";

function FixedModal({
  children,
  modalState,
  closeModal,
}: {
  children: React.ReactNode;
  modalState: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean | true>>;
}) {
  return (
    <AnimatePresence>
      {modalState && (
        <motion.div
          className={style.fixedModal}
          initial={{
            opacity: 0,

            filter: "blur(40px)",
          }}
          animate={{
            opacity: 1,

            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,

            filter: "blur(10px)",
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          {children}
          <div
            className={style.fixedModal__backGroundClose}
            onClick={() => {
              closeModal(false);
            }}
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FixedModal;
