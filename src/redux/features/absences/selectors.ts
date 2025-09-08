import { RootState } from "../../store";
import { Absence } from "./types";

export const selectAbsencesState = (state: RootState) => state.absences;

export const selectAllAbsences = (state: RootState): Absence[] =>
  state.absences.ids.map((id) => state.absences.entities[id]);

export const selectAbsenceById = (state: RootState, id: number): Absence | undefined =>
  state.absences.entities[id];

export const selectAbsencesStatus = (state: RootState) => state.absences.status;
export const selectAbsencesError = (state: RootState) => state.absences.error;
