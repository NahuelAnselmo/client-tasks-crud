export function Button({ onClick, children, className = "", ...props }) {
  return (
    <button
      className={`bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300 hover:bg-indigo-600 transition-colors text-white w-full ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
