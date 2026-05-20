const KnowledgeInfoBlock = ({ label, children, variant = "default" }) => {
  const variantClass =
    variant === "insight"
      ? "border-red-500/20 bg-red-500/[0.06]"
      : "border-white/[0.06] bg-white/[0.02]";

  return (
    <div className={`min-w-0 rounded-xl border p-3.5 sm:p-4 ${variantClass}`}>
      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-red-500/90">
        {label}
      </h4>
      <div className="min-w-0 break-words text-sm leading-relaxed text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default KnowledgeInfoBlock;
