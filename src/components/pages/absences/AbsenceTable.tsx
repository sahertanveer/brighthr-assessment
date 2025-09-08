import { FC, useMemo } from "react";
import Table, { Column } from "../../global/Table";
import { Absence } from "../../../redux/features/absences/types";
import { format } from "date-fns";
import Button from "../../global/Button";

interface AbsenceTableProps {
  absences: Absence[];
  onViewConflict: (absenceId: number) => void;
  onViewEmployeeAbsences: (firstName: string, lastName: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const AbsenceTable: FC<AbsenceTableProps> = ({
  absences,
  onViewConflict,
  onViewEmployeeAbsences,
  currentPage,
  setCurrentPage
}) => {
  const columns: Column<Absence>[] = useMemo(
    () => [
      {
        header: "Employee",
        accessor: "employee",
        render: (value: Absence["employee"]) => (
          <a
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              onViewEmployeeAbsences(value.firstName, value.lastName);
            }}
          >
            {value.firstName} {value.lastName}
          </a>
        ),
      },
      {
        header: "Start Date",
        accessor: "startDate",
        sortable: true,
        render: (value: Absence["startDate"]) =>
          format(new Date(value), "dd/MM/yyyy"),
      },
      { header: "Days", accessor: "days", sortable: true },
      {
        header: "Type",
        accessor: "absenceType",
        sortable: true,
        render: (value: Absence["absenceType"]) =>
          value
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase()),
      },
      {
        header: "Status",
        accessor: "approved",
        sortable: true,
        render: (value: Absence["approved"]) => (
          <span className="inline-flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${
                value ? "bg-success" : "bg-error"
              }`}
            ></span>
            {value ? "Approved" : "Rejected"}
          </span>
        ),
      },
      {
        header: "Conflict",
        accessor: "id",
        render: (id: Absence["id"]) => (
          <Button
            onClick={() => onViewConflict(id)}
            variant="primary"
            size="sm"
          >
            View
          </Button>
        ),
      },
    ],
    [onViewConflict, onViewEmployeeAbsences]
  );

  return (
    <Table
      data={absences?.sort((a, b) =>
        a.employee.firstName.localeCompare(b.employee.firstName)
      )}
      columns={columns}
      pagination
      itemsPerPageOptions={[10, 20, 50]}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default AbsenceTable;
