import { Absence } from "../../../../redux/features/absences/types";

export interface AbsenceFilterOptions {
  searchTerm?: string;
  selectedDateRange?: string;
  selectedType?: string;
}

export const filterAbsences = (
  absences: Absence[],
  { searchTerm, selectedDateRange, selectedType }: AbsenceFilterOptions
): Absence[] => {
  if (!absences || absences.length === 0) return [];

  return absences.filter((a) => {
    const fullName = `${a.employee.firstName} ${a.employee.lastName}`.toLowerCase();

    // ✅ Search filter (apply only if searchTerm exists)
    if (searchTerm && !fullName.includes(searchTerm.toLowerCase())) return false;

    // ✅ Type filter (apply only if selectedType exists)
    if (selectedType && a.absenceType !== selectedType) return false;

    // ✅ Date range filter (apply only if selectedDateRange exists)
    if (selectedDateRange) {
      const startDate = new Date(a.startDate);
      const now = new Date();

      switch (selectedDateRange) {
        case "today":
          if (startDate.toDateString() !== now.toDateString()) return false;
          break;
        case "yesterday":
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          if (startDate.toDateString() !== yesterday.toDateString()) return false;
          break;
        case "last_week":
          const lastWeek = new Date(now);
          lastWeek.setDate(now.getDate() - 7);
          if (startDate < lastWeek) return false;
          break;
        case "last_month":
          const lastMonth = new Date(now);
          lastMonth.setMonth(now.getMonth() - 1);
          if (startDate < lastMonth) return false;
          break;
        case "last_year":
          const lastYear = new Date(now);
          lastYear.setFullYear(now.getFullYear() - 1);
          if (startDate < lastYear) return false;
          break;
        case "3_years":
          const twoYears = new Date(now);
          twoYears.setFullYear(now.getFullYear() - 3);
          if (startDate < twoYears) return false;
          break;
        case "5_years":
          const fiveYears = new Date(now);
          fiveYears.setFullYear(now.getFullYear() - 5);
          if (startDate < fiveYears) return false;
          break;
      }
    }

    return true;
  });
};
