import MemberCard from "../components/MemberCard";
import { useLocation } from "react-router-dom";
import Loader from "../../../shared/components/Loading";
import {
  useAcceptInvitation,
  useInvitations,
  useReceivedInvitations,
  useRejectInvitation,
  useRemoveInvitation,
  useRemoveMember,
} from "../../OfficeManagement/hooks/useInvitaions";
import { useMembers } from "../../OfficeManagement/hooks/useMembers";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function MembersPage() {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const isMembersPage = location.pathname.includes("members");
  const isReceiveInvitationsPage = location.pathname.includes("receive");

  ///////// Fetch Data/////////////
  const { data: membersData, isPending: isMembersFetching } = useMembers({
    enabled: isMembersPage,
  });
  const { data: invitationsData, isPending: isFetching } = useInvitations({
    enabled: !isMembersPage && !isReceiveInvitationsPage,
  });
  const { data: receivedInvitations, isPending: isRecFetching } =
    useReceivedInvitations({
      enabled: isReceiveInvitationsPage,
    });
  console.log(receivedInvitations);

  ////////////Actions///////////
  const { mutate: removeInvitation, isPending: isWithdrowing } =
    useRemoveInvitation();
  const { mutate: acceptInvitation, isPending: isAccepting } =
    useAcceptInvitation();
  const { mutate: rejectInvitation, isPending: isRejecting } =
    useRejectInvitation();
  const { mutate: removeMember, isPending: isRemoving } = useRemoveMember();
  /////////////
  const isPending =
    (isMembersPage && isMembersFetching) ||
    (isReceiveInvitationsPage && isRecFetching) ||
    (!isMembersPage && !isReceiveInvitationsPage && isFetching) ||
    isWithdrowing ||
    isRemoving ||
    isAccepting ||
    isRejecting;

  const cards = useMemo(() => {
    return (
      (isMembersPage
        ? membersData?.data
        : isReceiveInvitationsPage
          ? receivedInvitations?.data
          : invitationsData?.data) ?? []
    );
  }, [
    invitationsData,
    isReceiveInvitationsPage,
    isMembersPage,
    receivedInvitations,
    membersData,
  ]);

  const filteredCards = useMemo(() => {
    const searchValue = searchInput.trim().toLowerCase();

    if (!searchValue) return cards;

    return cards.filter((member) => {
      const searchableText = [
        member?.name,
        member?.full_name,
        member?.lawyer_name,
        member?.office_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchValue);
    });
  }, [cards, searchInput]);

  const handleRemoveMember = (lawyerId) => {
    removeMember(lawyerId);
  };

  return (
    <div className="space-y-8">
      {isPending && <Loader />}
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-5">
        <div className="text-right">
          <div>
            <span className="text-gray-500">إدارة المكتب /</span>
            <span className="text-lg font-bold text-gray-900">
              {isMembersPage ? " أعضاء المكتب" : "الدعوات المرسلة"}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {isMembersPage
              ? " إدارة الفريق القانوني وتتبع حالة المحامين المسجلين في النقابة"
              : "تتبع حالة استقطاب المحامين وإدارة دعوات الانضمام المعلقة"}
          </p>
        </div>

        <div className="border rounded-lg h-12 px-6 flex items-center bg-gray-300">
          <span className="text-gray-600">
            {isMembersPage ? "إجمالي الأعضاء :" : "إجمالي الدعوات"}
          </span>
          <span className="font-bold mr-2">{filteredCards.length}</span>
        </div>
      </div>

      {/* Search */}
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
          className="w-full h-14 rounded-lg border border-gray-300 bg-white pr-12 pl-4 outline-none focus:border-2"
        />
      </div>

      {/* Cards */}
      {filteredCards.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
          لا توجد نتائج.
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {filteredCards.map((member) => (
            <MemberCard
              key={member.id || member.invitation_id}
              data={member}
              variant={
                isMembersPage
                  ? "member"
                  : isReceiveInvitationsPage
                    ? "receive"
                    : "invitation"
              }
              onRemove={() => handleRemoveMember(member.id)}
              onWithdraw={() => removeInvitation(member.invitation_id)}
              onViewProfile={() => {}}
              onAccept={() => {
                acceptInvitation(member.invitation_id);
              }}
              onReject={() => {
                rejectInvitation(member.invitation_id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
