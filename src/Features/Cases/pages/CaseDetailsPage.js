import { Pencil, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { HearingsOverview } from "../Components/Hearings";
import SharedButton from "../../../shared/components/SharedButton";
import DocumentLibrary from "../../Documents/Components/DocumentLibrary";
import TasksListForCase from "../../Tasks/components/TasksListForCase";
import CaseTeamCard from "../Components/caseDetails/CaseTeamCard";
import MainDetailsCard from "../Components/caseDetails/MainDetailsCard";
import CaseInvoicesList from "../../Invoices/components/CaseInvoicesList";
import {
  useCaseDetails,
  useDeleteCase,
  useUpdateCase,
} from "../hooks/useCases";
import DeleteModal from "../../../shared/components/DeleteModal";
import Loader from "../../../shared/components/Loading";
import { useEffect, useState } from "react";
import CaseInfoCard from "../Components/caseDetails/CaseInfoCard";
import FinancialInfoCard from "../Components/caseDetails/FinancialInfoCard";
import PaymentMilestons from "../Components/caseDetails/PaymentMilestons";
import EditCaseModal from "../Components/EditCaseModal";
import EditTeamModal from "../Components/caseDetails/EditTeamModal";

export default function CaseDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending } = useCaseDetails(id);
  const caseData = data?.data?.case;
  const [editOpen, setEditOpen] = useState(false);
  const [teamEditOpen, setTeamEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { mutate: updateCase, isPending: isUpdating } = useUpdateCase(
    caseData?.id,
  );
  const { mutate: deleteCase, isPending: isDeleting } = useDeleteCase();

  useEffect(() => {
    if (caseData) {
      setForm({
        case_id: caseData.id,
        title: caseData.title || "",
        description: caseData.description || "",
        price: caseData.price || "",
        case_category: caseData.case_category || "",
        court: caseData.court || "",
        billing_type: caseData.billing_type,
        collection_percentage: caseData.collection_percentage || "",
        importance_stars: caseData.importance_stars || 1,
        payment_milestones: caseData.payment_milestones || [],
        opponents: caseData.opponents || [],
      });
    }
  }, [caseData]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (isUpdating) return;

    const validationErrors = {};
    if (!form.title.trim()) validationErrors.title = "هذا الحقل مطلوب";
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const payload = { ...form };
    if (payload.billing_type === "installments") {
      delete payload.collection_percentage;
    } else if (payload.billing_type === "percentage_collection") {
      delete payload.payment_milestones;
    } else if (payload.billing_type === "fixed_proposal") {
      delete payload.payment_milestones;
      delete payload.collection_percentage;
    }
    updateCase(payload, {
      onSuccess: () => setEditOpen(false),
    });
  };

  const handleTeamEditSave = (members) => {
    console.log(members);
    if (isUpdating) return;
    const cleanTeam = members.map((m) => ({
      user_id: m.user_id,
      role_in_case: m.role_in_case,
    }));
    updateCase(
      { case_id: caseData.id, team: cleanTeam },
      {
        onSuccess: () => setTeamEditOpen(false),
      },
    );
  };

  const handleDelete = () => {
    deleteCase(id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        navigate("/cases");
      },
    });
  };

  if (isPending || isDeleting) return <Loader />;
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-gray-500">
            <span className="text-lg">القضايا</span>
            <span>/</span>
            <span className="text-black">
              القضية رقم {caseData.case_number}
            </span>
          </div>
          <h2 className="text-gray-900 text-2xl font-bold">
            {caseData.title || "لا يوجد عنوان للقضية"}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <SharedButton
            icon={<Pencil size={18} />}
            onClick={() => setEditOpen(true)}
          >
            تعديل
          </SharedButton>
          <SharedButton
            icon={<Trash2 size={18} />}
            colors="bg-red-700 text-white hover:bg-red-800"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            حذف
          </SharedButton>
        </div>
      </div>

      {/* content */}
      <MainDetailsCard caseData={caseData} />

      <CaseInfoCard caseData={caseData} />
      <FinancialInfoCard caseData={caseData} />
      {caseData.payment_milestones?.length > 0 && (
        <PaymentMilestons payments={caseData.payment_milestones} />
      )}

      <HearingsOverview
        next_session={caseData.next_session}
        last_session={caseData.last_session}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TasksListForCase case_id={id} />
        <CaseTeamCard
          team={caseData.team}
          onEditTeam={() => setTeamEditOpen(true)}
        />
      </div>

      <CaseInvoicesList invoices={caseData.invoices} />
      <DocumentLibrary caseId={id} />

      <EditCaseModal
        isOpen={editOpen}
        setEditOpen={setEditOpen}
        handleEditSubmit={handleEditSubmit}
        isUpdating={isUpdating}
        errors={errors}
        form={form}
        updateField={updateField}
      />

      <EditTeamModal
        isOpen={teamEditOpen}
        onClose={() => setTeamEditOpen(false)}
        team={caseData.team || []}
        onSave={handleTeamEditSave}
        isUpdating={isUpdating}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        title="حذف القضية"
        description="هل أنت متأكد من حذف هذه القضية؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={handleDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
