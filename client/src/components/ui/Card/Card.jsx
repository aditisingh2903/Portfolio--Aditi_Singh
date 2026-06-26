const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-800
        bg-slate-950/80
        backdrop-blur-sm
        transition-all
        duration-300
        hover:border-cyan-400/40
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;