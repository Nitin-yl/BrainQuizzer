import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = ({ label = "Loading...", className = "", size = 40, color = "#22d3ee" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`} role="status" aria-live="polite">
      <AiOutlineLoading3Quarters
        className="sexy-spin drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
        size={size}
        color={color}
        aria-hidden="true"
      />
      {label && <p className="mt-4 text-sm text-gray-300">{label}</p>}
    </div>
  );
};

export default Loader;
