export function Card({ children }) {
  return (
    <div className="bg-zinc-800 max-w-md w-full h-auto p-4 rounded-xl shadow-2xl flex-1">
      {children}
    </div>
  );
}
