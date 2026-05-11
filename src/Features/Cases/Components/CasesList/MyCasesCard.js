import GavelIcon from "@mui/icons-material/Gavel";
import CaseCard from "../CaseCard";

export default function MyCasesView({ data }) {
  const cases = 0;
  const isOdd = cases.length % 3 === 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {data?.length ? (
        <>
          <div className="lg:col-span-2 space-y-4">
            <div
              key={cases.id}
              className={`grid grid-cols-1 xl:grid-cols-2 gap-4
        ${isOdd ? "md:col-span-3" : ""}
      `}
            >
              {data?.map((c) => (
                <CaseCard key={c.id} c={c} />
              ))}
            </div>
          </div>

          <TasksSidebar />
        </>
      ) : (
        <p className="text-sm font-semibold text-gray-500">لا توجد قضايا بعد</p>
      )}
    </div>
  );
}

function TasksSidebar() {
  return (
    <div className="bg-blue-700 text-white px-6 py-4 gap-[6px] rounded-xl">
      <div className="flex flex-col gap-2">
        <GavelIcon />
        <h3 className="mb-4">موجز المهام</h3>
      </div>

      <div className="space-y-3">
        <div className="bg-blue-600 flex justify-between rounded-xl p-3">
          <div> مذكرات</div>
          <div className=" text-xl font-bold">04</div>
        </div>

        <div className="bg-blue-600 flex justify-between rounded-xl p-3">
          <div> جلسات</div>
          <div className=" text-xl font-bold">02</div>
        </div>
      </div>
    </div>
  );
}
