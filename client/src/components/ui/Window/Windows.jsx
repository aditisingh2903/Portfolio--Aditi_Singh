 import Card from "../Card";
const Window = ({ label, title, children, className = "" }) => {
 
  return (
    <Card
  className={`overflow-hidden shadow-2xl ${className}`}
>
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        <p className="font-mono text-xs text-slate-500">{label}</p>
      </div>

      <div className="p-6">
        {title && <h3 className="text-2xl font-semibold mb-5">{title}</h3>}
        {children}
      </div>
    </Card>
  );
};

export default Window;