import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden mt-16">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x opacity-10"></div>

      {/* Capa difuminada */}
      <div className="absolute inset-0 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
        
        {/* Texto principal */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Nahuel Anselmo
          </h2>
          <p className="text-sm text-gray-400">
            Web Developer · Creando interfaces con propósito
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex gap-6">
          <a
            href="https://github.com/NahuelAnselmo"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all"
          >
            <Github size={22} className="group-hover:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-sm">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/nahuelanselmo"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all"
          >
            <Linkedin size={22} className="group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-sm">LinkedIn</span>
          </a>

          <a
            href="mailto:anselmonahuel63t@gmail.com"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all"
          >
            <Mail size={22} className="group-hover:text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-sm">Contacto</span>
          </a>
        </div>
      </div>

      {/* Línea decorativa animada */}
      <div className="relative z-10 h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>

      {/* Texto inferior */}
      <div className="relative z-10 text-center text-gray-500 text-sm py-3">
        © {new Date().getFullYear()} Nahuel Anselmo — Todos los derechos reservados
      </div>
    </footer>
  );
};
