import api from "../../services/api";
import { Absence } from "./types";

interface RawAbsence {
  id: number;
  startDate: string;
  days: number;
  absenceType: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
  };
  approved: boolean;
}

function normalizeRaw(raw: RawAbsence): Absence {
  return {
    id: raw.id,
    startDate: raw.startDate,
    days: raw.days,
    absenceType: raw.absenceType,
    employee: {
      id: raw.employee.id,
      firstName: raw.employee.firstName,
      lastName: raw.employee.lastName,
    },
    approved: raw.approved,
  };
}

export async function fetchAbsencesApi(): Promise<Absence[]> {
  const res = await api.get("/absences");
  const raw = res.data;
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeRaw);
}
