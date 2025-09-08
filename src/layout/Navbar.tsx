import { useState } from "react";
import Button from "../components/global/Button";

const Navbar = () => {
  const [hover, setHover] = useState(false);

  return (
    <header className="h-14 px-6 bg-white border-b flex items-center justify-between shadow-sm relative">
      <h1 className="text-lg font-heading font-semibold text-brand">
        BrightHR Dashboard
      </h1>

      <div className="relative flex flex-col items-center">
        <Button
          size="sm"
          variant="primary"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          + Add Absence
        </Button>

        {hover && (
          <div className="absolute top-full mt-1 bg-neutral-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
            Coming Soon
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
