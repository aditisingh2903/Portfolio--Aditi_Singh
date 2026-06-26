const ProgressBar = ({ value = 0 }) => {
  return (
    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
      <div
        className="h-full rounded-full bg-cyan-400 transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;