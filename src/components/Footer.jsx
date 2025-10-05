

export const Footer = () => {
  return (
    <div>
      <footer className="bg-zinc-900 py-6 text-center text-gray-400" >
        <p>© {new Date().getFullYear()} Nahuel Anselmo - Web Developer</p>
        <div className="flex justify-center gap-6 mt-2">
          <a
            href="https://github.com/NahuelAnselmo"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nahuelanselmo"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="mailto:anselmonahuel63t@gmail.com"
            className="hover:text-white"
          >
            Contacto
          </a>
        </div>
      </footer>
    </div>
  );
};
