import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAbsencesApi } from "./api";
import { Absence } from "./types";

// Async thunk to fetch all absences
export const fetchAbsences = createAsyncThunk<Absence[]>(
  "absences/fetchAbsences",
  async () => {
    const absences = await fetchAbsencesApi();
    return absences;
  }
);
