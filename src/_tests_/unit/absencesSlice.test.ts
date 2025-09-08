import { configureStore } from "@reduxjs/toolkit";
import absencesReducer from "../../redux/features/absences/slice";
import { fetchAbsences } from "../../redux/features/absences/thunks";
import { Absence } from "../../redux/features/absences/types";

jest.mock("../../redux/services/api");
import api from "../../redux/services/api";
const mockedApi = api as jest.Mocked<typeof api>;

describe("test absences fetch request", () => {
  it("get employee absences and stores them correctly", async () => {
    const sample: Absence[] = [
      {
        id: 1,
        startDate: "2025-01-01T00:00:00Z",
        days: 5,
        absenceType: "ANNUAL_LEAVE",
        employee: { id: "emp-1", firstName: "Alice", lastName: "Johnson" },
        approved: true,
      },
      {
        id: 2,
        startDate: "2025-02-10T00:00:00Z",
        days: 2,
        absenceType: "SICKNESS",
        employee: { id: "emp-2", firstName: "Bob", lastName: "Smith" },
        approved: false,
      },
    ];

    mockedApi.get.mockResolvedValueOnce({ data: sample });

    const store = configureStore({ reducer: { absences: absencesReducer } });

    await store.dispatch(fetchAbsences());

    const state = store.getState().absences;

    expect(state.status).toBe("succeeded");
    expect(state.ids).toEqual([1, 2]);
    expect(state.entities[1].employee.firstName).toBe("Alice");
    expect(state.entities[2].employee.lastName).toBe("Smith");
    expect(state.entities[1].days).toBe(5);
  });

  it("handles empty array from API", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] });

    const store = configureStore({ reducer: { absences: absencesReducer } });

    await store.dispatch(fetchAbsences());

    const state = store.getState().absences;

    expect(state.status).toBe("succeeded");
    expect(state.ids).toEqual([]);
    expect(Object.keys(state.entities)).toHaveLength(0);
  });

  it("handles fetch error", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("Network error"));

    const store = configureStore({ reducer: { absences: absencesReducer } });

    await store.dispatch(fetchAbsences());

    const state = store.getState().absences;

    expect(state.status).toBe("failed");
    expect(state.error).toBe("Network error");
  });
});
