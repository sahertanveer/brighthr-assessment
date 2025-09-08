import { FC } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  label?: string;
  className?: string;
}

const Input: FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className,
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${className} border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand text-sm`}

      />
    </div>
  );
};

export default Input;
