import { ClipLoader } from "react-spinners";

export default function Loader({ size = 60, color = "#36d7b7" }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <ClipLoader color={color} size={size} />
    </div>
  );
}