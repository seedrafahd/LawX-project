import { useMemo, useState } from "react";
import TasksHeader from "../components/TasksHeader";
import FiltersBar from "../components/FiltersBar";
import StatsCards from "../components/StatsCard";
import TasksTable from "../components/TasksTable";
import { useTasks } from "../hooks/useTasks";
import Loader from "../../../shared/components/Loading";

const ITEMS_PER_PAGE = 10;
export default function TasksPage() {
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    assignee: "",
  });
  const { data, isPending } = useTasks();
  const allTasks = data?.data.tasks;

  const teamMembers = useMemo(() => {
    if (!allTasks) return [];
    const map = new Map();
    allTasks.forEach((t) => {
      const name = t.assignee || t.assigned_to;
      if (name && !map.has(name)) map.set(name, { name });
    });
    return Array.from(map.values());
  }, [allTasks]);

  const stats = useMemo(() => {
    const total = allTasks?.length || 0;
    const done = allTasks?.filter((t) => t.task_status === "done").length || 0;
    const pending =
      allTasks?.filter((t) => t.task_status === "pending").length || 0;
    const progress =
      allTasks?.filter((t) => t.task_status === "progress").length || 0;
    return [
      {
        title: "إجمالي المهام",
        value: total,
        bg: "bg-white",
        text: "text-gray-900",
      },
      {
        title: "مكتمل",
        value: done,
        bg: "bg-[#F0FDF4]",
        text: "text-[#14532D]",
      },
      {
        title: "قيد الانتظار",
        value: pending,
        bg: "bg-[#FACC15]/30",
        text: "text-[#390C00]",
      },
      {
        title: "جاري العمل",
        value: progress,
        bg: "bg-[#D6E3FB]",
        text: "text-[#0F1C2D]",
      },
    ];
  }, [allTasks]);
  // Filtering
  const filteredTasks = useMemo(() => {
    if (!allTasks) return [];
    return allTasks.filter((task) => {
      const matchSearch =
        !filters.search ||
        task.task_title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.case_number?.toLowerCase().includes(filters.search.toLowerCase());

      const matchStatus =
        !filters.status || task.task_status === filters.status;

      const matchAssignee =
        !filters.assignee || task.assignee === filters.assignee;

      return matchSearch && matchStatus && matchAssignee;
    });
  }, [allTasks, filters]);
  // Pagination
  const totalPages = Math.ceil((filteredTasks?.length || 0) / ITEMS_PER_PAGE);

  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return filteredTasks?.slice(start, end);
  }, [filteredTasks, page]);

  return (
    <div className="min-h-screen space-y-4">
      {isPending && <Loader />}

      <div className="flex flex-col gap-5">
        {/* Header */}
        <TasksHeader />
        {allTasks?.length > 0 ? (
          <>
            {/* Stats */}
            <StatsCards stats={stats} />

            {/* Filters */}
            <FiltersBar
              filters={filters}
              setFilters={setFilters}
              teamMembers={teamMembers}
            />

            {/* Table */}
            <TasksTable
              tasks={paginatedTasks}
              isLoading={isPending}
              currentPage={page}
              totalPages={totalPages}
              totalItems={filteredTasks?.length || 0}
              currentItems={paginatedTasks?.length || 0}
              onPageChange={setPage}
            />
          </>
        ) : (
          <p className="rounded-xl bg-white p-8 text-center text-sm font-semibold text-gray-500">
            لا توجد مهام بعد
          </p>
        )}
      </div>
    </div>
  );
}
