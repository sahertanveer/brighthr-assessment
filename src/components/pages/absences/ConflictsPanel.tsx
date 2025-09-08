import { FC, useEffect } from "react";
import { Absence } from "../../../redux/features/absences/types";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchConflict } from "../../../redux/features/conflicts";
import SidePanel from "../../global/SidePanel";

interface ConflictPanelProps {
  absenceId: number;
  onClose: () => void;
  absence?: Absence;
}

const ConflictPanel: FC<ConflictPanelProps> = ({
  absenceId,
  onClose,
  absence,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const hasConflict = useSelector((state: RootState) =>
    absenceId !== null ? state.conflicts.entities[absenceId] : undefined
  );

  useEffect(() => {
    if (absenceId !== null && absenceId >= 0 && hasConflict === undefined) {
      dispatch(fetchConflict(absenceId));
    }
  }, [absenceId, hasConflict, dispatch]);

  if (absenceId === null || !absence) return null;

  const conflictColor = "text-red-600";
  const successColor = "text-green-600";

  const details = [
    { label: "Employee", value: `${absence.employee.firstName} ${absence.employee.lastName}` },
    { label: "Start Date", value: new Date(absence.startDate).toLocaleDateString() },
    { label: "Days", value: absence.days },
    { label: "Type", value: absence?.absenceType?.replace(/_/g, " ")
            ?.toLowerCase()
            ?.replace(/\b\w/g, (l) => l?.toUpperCase()), },
    {
      label: "Conflict Status",
      value:
        hasConflict === undefined
          ? "Loading..."
          : hasConflict
          ? "Conflict detected"
          : "No conflict",
      color: hasConflict === undefined ? "text-neutral-500" : hasConflict ? conflictColor : successColor,
    },
  ];

  return (
    <SidePanel title="Conflict Details" onClose={onClose}>
      <div className="divide-y divide-neutral-200">
        {details.map((item, idx) => (
          <div key={idx} className="py-2 flex justify-between items-center">
            <span className="text-neutral-500 font-medium text-sm">{item.label}</span>
            <span className={`font-medium text-sm ${item.color || "text-neutral-800"}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </SidePanel>
  );
};

export default ConflictPanel;
