import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchConflictApi } from "./api";

export const fetchConflict = createAsyncThunk<boolean, number>(
  "conflicts/fetchConflict",
  async (absenceId) => {
    return fetchConflictApi(String(absenceId));
  }
);
