import React from "react";
const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-16 h-16 border-4 border-[var(--green)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
