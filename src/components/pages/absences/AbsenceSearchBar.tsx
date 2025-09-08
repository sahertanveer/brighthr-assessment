import { FC } from "react";
import Input from "../../global/Input";

interface AbsenceSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  clearSearch?: () => void;
}

const AbsenceSearchBar: FC<AbsenceSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  clearSearch,
}) => {
  return (
    <div className="relative w-full md:w-72">
      <Input
        label="Search Employee"
        placeholder="Type name..."
        value={searchTerm}
        onChange={(e: string) => setSearchTerm(e)}
        className="pr-10"
      />
      {searchTerm && clearSearch && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-[5%] text-neutral-400 hover:text-neutral-600 font-bold"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default AbsenceSearchBar;
