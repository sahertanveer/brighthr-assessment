import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import absencesReducer from "../../redux/features/absences/slice";
import conflictsReducer from "../../redux/features/conflicts/slice";
import App from "../../App";
import * as api from "../../redux/features/absences/api";

const mockAbsences = [
  {
    id: 1,
    startDate: "2025-09-06T09:42:12.470Z",
    days: 8,
    absenceType: "SICKNESS",
    employee: { firstName: "Alice", lastName: "Johnson", id: "123" },
    approved: true,
  },
  {
    id: 2,
    startDate: "2025-09-06T09:42:30.470Z",
    days: 5,
    absenceType: "MEDICAL",
    employee: { firstName: "Bob", lastName: "Smith", id: "124" },
    approved: false,
  },
];

jest.spyOn(api, "fetchAbsencesApi").mockResolvedValue(mockAbsences);

describe("Absences App Integration", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { absences: absencesReducer, conflicts: conflictsReducer },
    });
  });

  it("renders absences after successful fetch", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(await screen.findByText(/Absences/i)).toBeInTheDocument();
    expect(await screen.findByText(/Alice/i)).toBeInTheDocument();
    expect(await screen.findByText(/Bob/i)).toBeInTheDocument();
  });

  it('shows "No absences found" when API returns empty', async () => {
    jest.spyOn(api, "fetchAbsencesApi").mockResolvedValueOnce([]);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText(/No absences found/i)).toBeInTheDocument();
  });

  it("handles API failure gracefully", async () => {
    jest
      .spyOn(api, "fetchAbsencesApi")
      .mockRejectedValueOnce(new Error("Network Error"));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText(/Network Error/i)).toBeInTheDocument();
  });

  it("filters absences by search input", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for data
    expect(await screen.findByText(/Alice/i)).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Type name/i);
    fireEvent.change(searchInput, { target: { value: "Bob" } });

    expect(screen.queryByText(/Alice/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Bob/i)).toBeInTheDocument();
  });

  it("opens conflict panel when View button is clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText(/Alice/i)).toBeInTheDocument();

    // Assuming your View button has text "View" (update if different)
    const viewButtons = screen.getAllByRole("button", { name: /View/i });
    fireEvent.click(viewButtons[0]);

    expect(await screen.findByText(/Conflict Details/i)).toBeInTheDocument();
  });

  it("opens employee absences panel when employee is clicked", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText(/Alice Johnson/i)).toBeInTheDocument();

    const employeeLink = screen.getByText(/Alice Johnson/i);
    fireEvent.click(employeeLink);

    expect(await screen.findByText(/Total Absences:/i)).toBeInTheDocument();
  });
});
