import Loader from "../../../shared/components/Loading";
import { useModal } from "../../../shared/hooks/useModal";
import BenefitsSection from "../components/createOffice/BenefitsSection";
import CreateOfficeModal from "../components/createOffice/CreateOfficeModal";
import FeaturesGrid from "../components/createOffice/FeaturesGrid";
import HeroSection from "../components/createOffice/HeroSection";
import { useCreateOffice } from "../hooks/useCreateOffice";

export default function CreateOfficePage() {
  const createOfficeModal = useModal();
  const { mutate, isPending } = useCreateOffice();

  const handleSubmit = () => {
    mutate(
      { lawer_profile_id: "019f66ce-7491-73c2-b677-add8f1c41377" },
      {
        onSuccess: () => {
          createOfficeModal.toggle();
          window.history.back();
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      {isPending && <Loader />}
      <HeroSection handleOpenModal={createOfficeModal.toggle} />

      <FeaturesGrid />

      <BenefitsSection />

      <CreateOfficeModal
        isOpen={createOfficeModal.isOpen}
        onClose={createOfficeModal.toggle}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
