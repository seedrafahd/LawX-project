import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TasksHeader from "../Components/TasksHeader";
import FiltersBar from "../Components/FiltersBar";
import StatsCards from "../Components/StatsCard";
import TasksTable from "../Components/TasksTable";
import { useTasks } from "../Hooks/useTasks";
import Loader from "../../../shared/Components/Loading";

const ITEMS_PER_PAGE = 10;
export default function TasksPage() {
  //   const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("الحالة: الكل");
  const [managerFilter, setManagerFilter] = useState("المسؤول: الجميع");
  const [caseFilter, setCaseFilter] = useState("القضية: الكل");

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    assignee: "",
  });
  const { data, isPending } = useTasks();
  // Filtering
  const filteredTasks = useMemo(() => {
    if (!data) return [];

    return data.filter((task) => {
      const matchSearch =
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.caseNo.toLowerCase().includes(filters.search.toLowerCase());

      const matchStatus = !filters.status || task.status === filters.status;

      const matchAssignee =
        !filters.assignee || task.assignee === filters.assignee;

      return matchSearch && matchStatus && matchAssignee;
    });
  }, [data, filters]);
  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return filteredTasks.slice(start, end);
  }, [filteredTasks, page]);

  return (
    <div className="min-h-screen space-y-4">
      {isPending && <Loader />}
      {data.length ? (
        <div className="flex flex-col gap-5">
          {/* Header */}
          <TasksHeader />

          {/* Stats */}
          <StatsCards />

          {/* Filters */}
          <FiltersBar
            filters={filters}
            setFilters={setFilters}
            statusFilter={statusFilter}
            managerFilter={managerFilter}
            caseFilter={caseFilter}
          />

          {/* Table */}
          <TasksTable
            tasks={paginatedTasks}
            isLoading={isPending}
            currentPage={page}
            totalPages={totalPages}
            totalItems={filteredTasks.length}
            currentItems={paginatedTasks.length}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <p className="text-sm font-semibold text-gray-500">لا توجد مهام بعد</p>
      )}
    </div>
  );
}
