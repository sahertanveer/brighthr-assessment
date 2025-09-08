import { FC } from "react";
import Dropdown from "../../global/Dropdown";

interface AbsenceFiltersProps {
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  searchTerm?: string;
  clearFilters?: () => void;
}

export const dateRanges = [
  { value: "", label: "All" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last_week", label: "Last Week" },
  { value: "last_month", label: "Last Month" },
  { value: "last_year", label: "Last Year" },
  { value: "2_years", label: "2 Years" },
  { value: "5_years", label: "5 Years" },
];

export const absenceTypes = [
  { value: "", label: "All" },
  { value: "SICKNESS", label: "Sickness" },
  { value: "ANNUAL_LEAVE", label: "Annual Leave" },
  { value: "MEDICAL", label: "Medical" },
];

const AbsenceFilters: FC<AbsenceFiltersProps> = ({
  selectedDateRange,
  setSelectedDateRange,
  selectedType,
  setSelectedType,
  searchTerm = "",
  clearFilters,
}) => {
  const showClear = clearFilters && (selectedDateRange || selectedType || searchTerm);

  return (
    <div className="flex flex-wrap items-start gap-4 mr-1">
      <Dropdown
        label="Date Range"
        options={dateRanges}
        value={selectedDateRange}
        onChange={setSelectedDateRange}
        className="min-w-[150px]"
      />
      <Dropdown
        label="Absence Type"
        options={absenceTypes}
        value={selectedType}
        onChange={setSelectedType}
        className="min-w-[150px]"
      />

      {showClear && (
        <button
          onClick={clearFilters}
          className="ml-2 mt-8 text-error hover:text-error/80"
          aria-label="Clear filters"
        >
          ✖ Clear All
        </button>
      )}
    </div>
  );
};

export default AbsenceFilters;
