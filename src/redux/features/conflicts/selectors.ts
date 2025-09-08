import type { RootState } from "../../store";

export const selectConflictById = (state: RootState, id: number): boolean | undefined =>
  state.conflicts.entities[id];

export const selectConflictsStatus = (state: RootState) => state.conflicts.status;

export const selectConflictsError = (state: RootState) => state.conflicts.error;
