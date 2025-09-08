import { ReactNode, FC } from "react";

interface SidePanelProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const SidePanel: FC<SidePanelProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-[400px] bg-neutral-50 shadow-2xl z-50 overflow-auto transition-transform">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-200">
        <h2 className="font-heading text-l font-semibold text-neutral-800">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-red-500 text-2xl transition"
          title="Close"
        >
          ✖
        </button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">{children}</div>
    </div>
  );
};

export default SidePanel;
