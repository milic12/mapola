import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Text } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

const AnimatedText = ({ text }: { text: string }) => {
  const controls = useAnimation();
  const words = text.split(" ");

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.8 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "easeIn",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "easeIn",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      style={{
        overflow: "hidden",
        display: "flex",
        fontSize: "2rem",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
    >
      {words.map((word: string, index: number) => (
        <motion.span
          variants={child}
          style={{ marginRight: "5px" }}
          key={index}
        >
          <Text className="animated-text">{word}</Text>
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
