import { FC, useMemo } from "react";
import { Absence } from "../../../redux/features/absences/types";
import SidePanel from "../../global/SidePanel";
import Table, { Column } from "../../global/Table";
import { format } from "date-fns";

interface EmployeeAbsencesPanelProps {
  employeeName: string;
  absences: Absence[];
  onClose: () => void;
}

const EmployeeAbsencesPanel: FC<EmployeeAbsencesPanelProps> = ({
  employeeName,
  absences,
  onClose,
}) => {
  const totalDays = useMemo(
    () => absences.reduce((acc, a) => acc + a.days, 0),
    [absences]
  );

  const columns: Column<Absence>[] = useMemo(
    () => [
      {
        header: "Start Date",
        accessor: "startDate",
        sortable: true,
        render: (value: Absence["startDate"]) =>
          format(new Date(value), "dd/MM/yyyy"),
      },
      {
        header: "Days",
        accessor: "days",
        sortable: true,
      },
      {
        header: "Status",
        accessor: "approved",
        render: (value: Absence["approved"]) => (
          <span className="inline-flex items-center gap-1 text-sm font-medium">
            <span
              className={`w-2 h-2 rounded-full ${
                value ? "bg-success" : "bg-error"
              }`}
            ></span>
            {value ? "Approved" : "Rejected"}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <SidePanel title={`Absences for ${employeeName}`} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm text-neutral-700">
          <span>Total Absences: {absences.length}</span>
          <span className="mr-1">Total Days: {totalDays}</span>
        </div>

        <div className="rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
          <Table
            data={absences}
            columns={columns}
            pagination={false}
            itemsPerPageOptions={[5, 10]}
            className="text-sm"
          />
        </div>
      </div>
    </SidePanel>
  );
};

export default EmployeeAbsencesPanel;
