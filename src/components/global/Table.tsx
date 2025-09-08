import { ReactNode, useState, useMemo } from "react";
import Pagination from "./Pagination";

export interface Column<T, K extends keyof T = keyof T> {
  header: string;
  accessor: K;
  sortable?: boolean;
  render?: (value: any, row: T) => ReactNode;
}

interface TableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  pagination?: boolean;
  itemsPerPageOptions?: number[];
  defaultSortColumn?: keyof T;
  defaultSortAsc?: boolean;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  className?: string;
}

const Table = <T extends { id: string | number }>({
  data,
  columns,
  pagination = false,
  itemsPerPageOptions = [10, 20, 50],
  defaultSortColumn,
  defaultSortAsc = true,
  currentPage: externalPage,
  setCurrentPage: setExternalPage,
  className,
}: TableProps<T>) => {
  const [internalPage, setInternalPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [sortColumn, setSortColumn] = useState<keyof T | undefined>(
    defaultSortColumn
  );
  const [sortAsc, setSortAsc] = useState(defaultSortAsc);

  const currentPage = externalPage ?? internalPage;
  const setCurrentPage = setExternalPage ?? setInternalPage;

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === "string" && typeof valB === "string")
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);

      if (typeof valA === "number" && typeof valB === "number")
        return sortAsc ? valA - valB : valB - valA;

      if (typeof valA === "boolean" && typeof valB === "boolean")
        return sortAsc
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);

      return 0;
    });
  }, [data, sortColumn, sortAsc]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, pagination, currentPage, itemsPerPage]);

  // Sort toggle
  const handleSort = (col: keyof T) => {
    if (!columns.find((c) => c.accessor === col)?.sortable) return;
    if (sortColumn === col) setSortAsc(!sortAsc);
    else {
      setSortColumn(col);
      setSortAsc(true);
    }
  };

  return (
    <div>
      <table
        className={`${className} min-w-full text-sm rounded-xl overflow-hidden`}
      >
        <thead className="bg-neutral-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className={`px-4 py-2 text-left font-small cursor-pointer select-none ${
                  col.sortable ? "hover:text-brand" : ""
                }`}
                onClick={() => handleSort(col.accessor)}
              >
                <div className="flex items-center space-x-1">
                  <span>{col.header}</span>
                  {col.sortable && sortColumn === col.accessor && (
                    <span>{sortAsc ? "▲" : "▼"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              className="even:bg-neutral-50 hover:bg-neutral-100 transition"
            >
              {columns.map((col) => {
                const value = row[col.accessor];
                return (
                  <td key={String(col.accessor)} className="px-4 py-2">
                    {col.render ? col.render(value, row) : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="flex justify-between text-sm items-center mt-4">
          <div>
            Show{" "}
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              {itemsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>{" "}
            entries
          </div>
          <Pagination
            totalItems={sortedData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
