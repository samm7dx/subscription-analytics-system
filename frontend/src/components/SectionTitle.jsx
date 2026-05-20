import { motion } from "framer-motion";

const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}) => {
  const isCenter = align === "center";

  return (
    <motion.header
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-8 md:mb-10 ${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-3xl text-left"}`}
    >
      {eyebrow && (
        <p className="mb-2.5 break-words text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500 sm:mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="break-words text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 break-words text-sm leading-relaxed text-gray-400 md:mt-4 md:text-base ${
            isCenter ? "mx-auto max-w-xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </motion.header>
  );
};

export default SectionTitle;
