import { Menu } from "lucide-react";

const navItems = [
  { name: "System", href: "#system" },
  { name: "Modules", href: "#modules" },
  { name: "Lab", href: "#lab" },
  { name: "Timeline", href: "#timeline" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <h1 className="text-xl font-bold text-white">
          Aditi<span className="text-cyan-400">OS</span>
        </h1>
        
        <div className="hidden md:flex items-center gap-8 text-sm">
       {navItems.map((item) => (
        <a
        key={item.name}
        href={item.href}
        className="text-slate-300 hover:text-cyan-400 transition"
        >
        {item.name}
        </a>
        ))}
        </div>
        

        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;