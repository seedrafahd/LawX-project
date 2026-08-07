import Header from "../components/lawyerDetails/Header";
import BasicInfo from "../components/lawyerDetails/BasicInfo";
import Actions from "../components/lawyerDetails/Actions";
import AccountState from "../components/lawyerDetails/AccountState";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteLawyer,
  useUpdateLawyerState,
  useUpdateLawyerStatus,
} from "../hooks/useLawyers";
import DeleteModal from "../../../shared/components/DeleteModal";
import { useState } from "react";
import Loader from "../../../shared/components/Loading";

export default function LawyerDetailsPage() {
  const location = useLocation();
  const [lawyer, setLawyer] = useState(location.state?.lawyerData ?? {});
  const navigate = useNavigate();
  const [isPromoteModalOpen, setisPromoteModalOpen] = useState(false);
  const [isSuspendedModalOpen, setisSuspendedModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const { mutate: updateState, isPending: isUpdatingState } =
    useUpdateLawyerState();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateLawyerStatus();
  const { mutate: deleteLawyer, isPending: isDeleting } = useDeleteLawyer();

  const isPending = isUpdatingState || isUpdatingStatus || isDeleting;

  const handleEditLawyer = () => {
    navigate(`/lawyers/edit/${lawyer.id}`, {
      state: { lawyerData: lawyer },
    });
  };

  const applyMutationResult = (data, fallback) => {
    const updated = data?.data?.lawyer ?? data?.data;
    setLawyer((prev) =>
      updated && typeof updated === "object"
        ? { ...prev, ...updated }
        : { ...prev, ...fallback },
    );
  };

  const handlePromote = () => {
    if (!lawyer) return;
    updateState(lawyer.id, {
      onSuccess: (data) => {
        applyMutationResult(data, { lawyer_state: "licensed" });
        setisPromoteModalOpen(false);
      },
    });
  };

  const handleSuspend = () => {
    if (!lawyer) return;
    updateStatus(lawyer.id, {
      onSuccess: (data) => {
        applyMutationResult(data, { is_suspended: !lawyer.is_suspended });
        setisSuspendedModalOpen(false);
      },
    });
  };

  const handleDelete = () => {
    if (!lawyer) return;
    deleteLawyer(lawyer.id, {
      onSuccess: () => {
        window.history.back();
        setisDeleteModalOpen(false);
      },
    });
  };

  return (
    <div className="space-y-8">
      {isPending && <Loader />}
      {/* ================= Header ================= */}
      <Header
        full_name={lawyer.full_name}
        handleEditLawyer={handleEditLawyer}
      />
      {/* ================= Body ================= */}
      <div className="grid grid-cols-12 gap-8">
        {/* Right */}
        <div className="col-span-12 lg:col-span-8">
          {/* ================= Basic Information ================= */}
          <BasicInfo lawyer={lawyer} />
        </div>

        {/* Left */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Account Status */}
          <AccountState
            type={lawyer.lawyer_state}
            is_claimed={lawyer.is_claimed}
            isSuspended={lawyer.is_suspended}
          />

          {/* Actions */}
          <Actions
            type={lawyer.lawyer_state}
            isSuspended={lawyer.is_suspended}
            setisPromoteModalOpen={() => setisPromoteModalOpen(true)}
            setisDeleteModalOpen={() => setisDeleteModalOpen(true)}
            setisSuspendedModalOpen={() => setisSuspendedModalOpen(true)}
          />
        </div>
      </div>

      <DeleteModal
        isPrimary={
          isPromoteModalOpen || (isSuspendedModalOpen && lawyer.is_suspended)
        }
        isOpen={isDeleteModalOpen || isSuspendedModalOpen || isPromoteModalOpen}
        title={
          isPromoteModalOpen
            ? "منح ترخيص للمحامي المتدرب"
            : isSuspendedModalOpen
              ? lawyer.is_suspended
                ? "إعادة تفعيل حساب المحامي"
                : "تعليق حساب المحامي"
              : "حذف حساب المحامي"
        }
        description={
          isPromoteModalOpen
            ? "سيتم تحويل هذا المحامي من محامي متدرب إلى محامي موثق وسيحصل على كافة الصلاحيات التي يتمتع بها المحامي الموثق. هل ترغب في المتابعة؟"
            : isSuspendedModalOpen
              ? lawyer.is_suspended
                ? "هل أنت متأكد من إعادة تفعيل حساب هذا المحامي؟"
                : "هل أنت متأكد من تعليق حساب هذا المحامي؟ لن يتمكن من تسجيل الدخول حتى يتم إعادة تفعيل حسابه."
              : "هل أنت متأكد من حذف حساب هذا المحامي؟ هذا الإجراء لا يمكن التراجع عنه."
        }
        onConfirm={
          isPromoteModalOpen
            ? handlePromote
            : isSuspendedModalOpen
              ? handleSuspend
              : handleDelete
        }
        onClose={() => {
          setisPromoteModalOpen(false);
          setisSuspendedModalOpen(false);
          setisDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
