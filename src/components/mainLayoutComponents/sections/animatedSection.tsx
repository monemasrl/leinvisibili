"use client";
import { motion } from "framer-motion";

function AnimatedSection({
  overflowHidden = true,
  animateOnce = true,
  width,
  children,
  classname,
  scrollToMe,
}: {
  overflowHidden?: boolean;
  animateOnce?: boolean;
  children?: React.ReactNode;
  width?: string;
  classname?: string;
  scrollToMe?: string;
}) {
  return (
    <motion.section
      style={{
        position: "relative",
        overflow: `${overflowHidden ? "hidden" : "initial"}`,
        maxWidth: `${width ? width : ""}`,
        margin: "0 auto",
      }}
      className={classname}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: animateOnce }}
      id={scrollToMe ? scrollToMe : ""}
    >
      {children}
    </motion.section>
  );
}

export default AnimatedSection;
