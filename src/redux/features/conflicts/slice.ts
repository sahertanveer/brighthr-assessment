import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConflict } from "./thunks";

interface ConflictsState {
  entities: Record<number, boolean>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: ConflictsState = {
  entities: {},
  status: "idle",
  error: null,
};

const conflictsSlice = createSlice({
  name: "conflicts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConflict.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchConflict.fulfilled, (state, action: PayloadAction<boolean, string, { arg: number }>) => {
        state.status = "succeeded";
        state.entities[action.meta.arg] = action.payload;
      })
      .addCase(fetchConflict.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch conflict";
      });
  },
});

export default conflictsSlice.reducer;
