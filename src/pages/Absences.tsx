import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAbsences } from "../redux/features/absences/thunks";
import { RootState, AppDispatch } from "../redux/store";
import { Absence } from "../redux/features/absences/types";

import AbsenceTable from "../components/pages/absences/AbsenceTable";
import AbsenceSearchBar from "../components/pages/absences/AbsenceSearchBar";
import AbsenceFilters from "../components/pages/absences/AbsenceFilters";
import ConflictPanel from "../components/pages/absences/ConflictsPanel";
import EmployeeAbsencesPanel from "../components/pages/absences/EmployeeAbsencePanel";
import {
  filterAbsences,
  AbsenceFilterOptions,
} from "../components/pages/absences/utils/filters";

const Absences = () => {
  const dispatch = useDispatch<AppDispatch>();
  const absencesState = useSelector((state: RootState) => state.absences);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAbsenceId, setSelectedAbsenceId] = useState<number | null>(
    null
  );
  const [selectedEmployee, setSelectedEmployee] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  const absences = useMemo(
    () =>
      absencesState.ids
        .map((id) => absencesState.entities[id])
        .filter(Boolean) as Absence[],
    [absencesState]
  );

  useEffect(() => {
    dispatch(fetchAbsences());
  }, [dispatch]);

  // Reset pagination when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDateRange, selectedType]);

  const filteredAbsences = useMemo(() => {
    const hasFilters = searchTerm || selectedDateRange || selectedType;
    if (!hasFilters) return absences;
    const options: AbsenceFilterOptions = {
      searchTerm,
      selectedDateRange,
      selectedType,
    };
    return filterAbsences(absences, options);
  }, [absences, searchTerm, selectedDateRange, selectedType]);

  const selectedAbsence = useMemo(
    () => filteredAbsences.find((a) => a.id === selectedAbsenceId),
    [filteredAbsences, selectedAbsenceId]
  );

  const employeeAbsences = useMemo(() => {
    if (!selectedEmployee) return [];
    return absences.filter(
      (a) =>
        a.employee.firstName === selectedEmployee.firstName &&
        a.employee.lastName === selectedEmployee.lastName
    );
  }, [selectedEmployee, absences]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedDateRange("");
    setSelectedType("");
  };

  return (
    <div className="space-y-6 p-6 bg-neutral-50 min-h-screen">
      <h2 className="text-2xl font-heading font-semibold text-neutral-800">
        Absences
      </h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-auto">
          <AbsenceSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            clearSearch={() => setSearchTerm("")}
          />
        </div>

        <div className="w-full md:w-auto">
          <AbsenceFilters
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            clearFilters={clearAllFilters}
          />
        </div>
      </div>

      <div className="bg-neutral-50 shadow-card rounded-2xl p-4">
        {absencesState.status === "loading" && (
          <p className="text-neutral-500">Loading...</p>
        )}
        {absencesState.status === "succeeded" &&
          filteredAbsences.length > 0 && (
            <>
              <AbsenceTable
                absences={filteredAbsences}
                onViewConflict={(id) => setSelectedAbsenceId(id)}
                onViewEmployeeAbsences={(firstName, lastName) =>
                  setSelectedEmployee({ firstName, lastName })
                }
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              {selectedAbsenceId !== null && selectedAbsence && (
                <ConflictPanel
                  absenceId={selectedAbsenceId}
                  absence={selectedAbsence}
                  onClose={() => setSelectedAbsenceId(null)}
                />
              )}

              {selectedEmployee && employeeAbsences.length > 0 && (
                <EmployeeAbsencesPanel
                  employeeName={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                  absences={employeeAbsences}
                  onClose={() => setSelectedEmployee(null)}
                />
              )}
            </>
          )}

        {absencesState.status === "succeeded" &&
          filteredAbsences.length === 0 && (
            <p className="text-neutral-500 text-center py-8">
              No absences found.
            </p>
          )}
        {absencesState.status === "failed" && (
          <p className="text-error text-center py-8">{absencesState.error}</p>
        )}
      </div>
    </div>
  );
};

export default Absences;
