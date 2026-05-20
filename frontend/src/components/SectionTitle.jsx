import { motion } from "framer-motion";

const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}) => {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <motion.header
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-10 max-w-3xl md:mb-12 ${alignClass}`}
    >
      {eyebrow && (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-red-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-gray-400 md:mt-4 md:text-base md:leading-relaxed">
          {description}
        </p>
      )}
    </motion.header>
  );
};

export default SectionTitle;
