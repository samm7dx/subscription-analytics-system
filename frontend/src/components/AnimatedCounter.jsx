import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const AnimatedCounter = ({
  value,
  duration = 1.2,
  formatter = (v) => Math.round(v).toLocaleString(),
  className = "",
}) => {
  const numericValue = Number(value);
  const safeValue = Number.isNaN(numericValue) ? 0 : numericValue;

  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => formatter(v));
  const [text, setText] = useState(formatter(0));

  useEffect(() => {
    spring.set(safeValue);
  }, [safeValue, spring]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setText(v));
    return unsubscribe;
  }, [display]);

  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {text}
    </motion.span>
  );
};

export default AnimatedCounter;
