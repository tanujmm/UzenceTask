import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Handle row selection
  const toggleRow = (id: string | number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedRows(newSelection);
    if (onRowSelect) {
      const selectedData = data.filter((row) => newSelection.has(row.id));
      onRowSelect(selectedData);
    }
  };

  // Handle sorting change
  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === col.dataIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.dataIndex, direction });
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">Loading data...</div>
    );
  }

  if (!loading && data.length === 0) {
    return <div className="p-4 text-center text-gray-500">No data found</div>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {selectable && <th className="p-2"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={`p-2 text-left font-medium text-gray-700 cursor-${
                  col.sortable ? "pointer" : "default"
                }`}
              >
                {col.title}
                {sortConfig.key === col.dataIndex &&
                  (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-gray-50 transition"
            >
              {selectable && (
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-2 text-gray-800">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
