import style from "./loader.module.scss";

import { AnimatePresence, motion } from "framer-motion";

function LoaderSite({ loading }: { loading?: boolean }) {
  return (
    <AnimatePresence>
      <motion.div
        className={style.loader}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
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
          <svg
            width="178"
            height="182"
            viewBox="0 0 178 182"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M70.6207 32.1858H1V181.377H147.919V107.216"
              stroke="white"
            />
            <path d="M6.11182 40.3269V175.697H65.561" stroke="white" />
            <path
              d="M87.6319 121.542L144.606 0.500013L177.234 0.500015L101.685 172.06L75.5737 172.06L17.2739 44.0677L51.4505 44.0677L86.7244 121.537L87.172 122.519L87.6319 121.542Z"
              stroke="white"
            />
          </svg>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
export default LoaderSite;
