import { FC } from "react";

interface DropdownProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} border border-neutral-200 text-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-sm">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
