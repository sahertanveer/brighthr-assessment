import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Absence, AbsencesState } from "./types";
import { fetchAbsences } from "./thunks";

const initialState: AbsencesState = {
  entities: {},
  ids: [],
  status: "idle",
  error: null,
};

const absencesSlice = createSlice({
  name: "absences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbsences.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAbsences.fulfilled, (state, action: PayloadAction<Absence[]>) => {
        state.status = "succeeded";
        state.ids = action.payload.map((a) => a.id);
        state.entities = {};
        action.payload.forEach((a) => {
          state.entities[a.id] = a;
        });
      })
      .addCase(fetchAbsences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch absences";
      });
  },
});

export default absencesSlice.reducer;
