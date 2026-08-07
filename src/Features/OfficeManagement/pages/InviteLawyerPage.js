import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import Loader from "../../../shared/components/Loading";
import MemberCard from "../../Lawers/components/MemberCard";
import LawyerPagination from "../../Lawers/components/LawyerPagination";
import { useInviteLawyer } from "../hooks/useInvitaions";
import { useSearchForLawyers } from "../hooks/useMembers";
import SharedModal from "../../../shared/components/SharedModal";
import toast from "react-hot-toast";
import SharedField from "../../../shared/components/SharedFeild";

export default function InviteLawyerPage() {
  const debounceRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({ page: 1, search_fullname: "" });
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [salaryExpected, setSalaryExpected] = useState("");

  const { data, isPending: isFetching } = useSearchForLawyers(filters);
  const { mutate: inviteLawyer, isPending: isInviting } = useInviteLawyer();

  const pagination = data?.data ?? null;
  const lawyers = pagination?.data ?? [];
  const isPending = isFetching || isInviting;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search_fullname: searchInput,
        page: 1,
      }));
    }, 1000);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput]);

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleInvite = (lawyer) => {
    setSelectedLawyer(lawyer);
    setSalaryExpected("");
  };

  const handleConfirmInvite = () => {
    if (!selectedLawyer) return;
    if (!salaryExpected) {
      toast.error("يرجى تحديد الراتب المتوقع قبل إرسال الدعوة");
      return;
    }
    inviteLawyer(
      {
        lawyer_profile_id: selectedLawyer.id,
        salary_expected: salaryExpected,
      },
      {
        onSettled: () => setSelectedLawyer(null),
      },
    );
  };

  return (
    <div className="space-y-5">
      {isPending && <Loader />}

      <div>
        <div>
          <span className="text-gray-500">إدارة المكتب /</span>
          <span className="text-lg font-bold text-gray-900">دعوة محامي</span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          استقطاب الكفاءات القانونية المستقلة للانضمام إلى المكتب
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-[#d8deea] shadow-sm p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="relative lg:col-span-6">
            <Search
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="ابحث باسم المحامي"
              className="w-full h-14 rounded-lg border border-gray-300 bg-[#fafbfd] pr-12 pl-4 outline-none focus:border-2"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {lawyers.length > 0 ? (
          lawyers.map((member) => (
            <MemberCard
              key={member.id}
              data={member}
              variant="invite"
              onInvite={() => handleInvite(member)}
            />
          ))
        ) : (
          <div>لا يوجد محاميين مطابقين</div>
        )}
      </div>

      <LawyerPagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />

      <SharedModal
        isOpen={!!selectedLawyer}
        title="تأكيد دعوة المحامي"
        description={` أنت على وشك إرسال دعوة انضمام إلى المحامي "${selectedLawyer?.full_name}"`}
        onClose={() => setSelectedLawyer(null)}
        primaryLabel="تأكيد"
        onPrimaryClick={handleConfirmInvite}
        secondaryLabel="إلغاء"
        onSecondaryClick={() => setSelectedLawyer(null)}
      >
        <div className="p-6">
          <SharedField label="الراتب المبدئي">
            <input
              type="number"
              value={salaryExpected}
              onChange={(e) => setSalaryExpected(e.target.value)}
              placeholder="حدد الراتب المبدئي للمحامي"
              className="w-full h-12 rounded-lg border border-gray-300 bg-[#fafbfd] px-4 outline-none focus:border-2"
            />
          </SharedField>
        </div>
      </SharedModal>
    </div>
  );
}
