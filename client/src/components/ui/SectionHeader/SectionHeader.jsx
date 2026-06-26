const SectionHeader = ({ eyebrow, title, description }) => {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="text-cyan-400 font-medium mb-3">{eyebrow}</p>
      )}

      <h2 className="text-3xl md:text-5xl font-bold mb-5">
        {title}
      </h2>

      {description && (
        <p className="text-slate-400 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;