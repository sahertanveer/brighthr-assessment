import { configureStore } from "@reduxjs/toolkit";
import conflictsReducer from "../../redux/features/conflicts/slice";
import { fetchConflict } from "../../redux/features/conflicts/thunks";

jest.mock("../../redux/services/api");
import api from "../../redux/services/api";
const mockedApi = api as jest.Mocked<typeof api>;

describe("conflicts slice", () => {
  it("stores conflict correctly", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: { conflicts: true } });

    const store = configureStore({ reducer: { conflicts: conflictsReducer } });

    await store.dispatch(fetchConflict(1));

    const state = store.getState().conflicts;

    expect(state.status).toBe("succeeded");
    expect(state.entities[1]).toBe(true);
  });

  it("handles conflict fetch error", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("Network error"));

    const store = configureStore({ reducer: { conflicts: conflictsReducer } });

    await store.dispatch(fetchConflict(1));

    const state = store.getState().conflicts;

    expect(state.status).toBe("failed");
    expect(state.error).toBe("Network error");
  });
});
