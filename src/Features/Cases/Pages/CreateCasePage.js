import { useState } from "react";
import Stepper from "../Components/CreateCase/Stepper";
import CaseDetailsStep from "../Components/CreateCase/CaseDetailsStep";
import WorkflowStep from "../Components/CreateCase/WorkflowStep";
import PaymentTypeStep from "../Components/CreateCase/PaymentTypeStep";
import AssignLawyerStep from "../Components/CreateCase/AssignLawyerStep";
import ClientAndOpponentsStep from "../Components/CreateCase/Client&OpponentsStep";
import CaseSummary from "../Components/CreateCase/CaseSummary";
import CaseHeader from "../Components/CaseHeader";
import Loader from "../../../shared/Components/Loading";
import AssignCourtStep from "../Components/CreateCase/AssignCourtStep";
import { useCaseForm } from "../Hooks/useCaseForm";
import { useClients } from "../Hooks/useClient";
import AssignTeamStep from "../Components/CreateCase/AssignTeamStep";

export default function CreateCasePage() {
  const { form, errors, isPending, updateField, handleSubmit, closeModal } =
    useCaseForm();
  const { data, isPending: isClients } = useClients();
  const clients = data?.clients || [];
  console.log(clients);

  const [step, setStep] = useState(1);

  if (isPending || isClients) return <Loader />;

  return (
    <div className="flex-1 flex flex-col">
      <CaseHeader />

      <div className="p-6">
        <Stepper currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <ClientAndOpponentsStep
                formData={form}
                setFormData={updateField}
                onNext={() => setStep(2)}
                clients={clients}
              />
            )}

            {step === 2 && (
              <CaseDetailsStep
                formData={form}
                setFormData={updateField}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <WorkflowStep
                formData={form}
                setFormData={updateField}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <PaymentTypeStep
                formData={form}
                setFormData={updateField}
                onNext={() => setStep(5)}
                onBack={() => setStep(3)}
              />
            )}

            {step === 5 && (
              <>
                <div className="space-y-[38px]">
                  <AssignLawyerStep
                    formData={form}
                    setFormData={updateField}
                    errors={errors}
                    onBack={() => setStep(4)}
                  />
                  <AssignTeamStep
                    formData={form}
                    setFormData={updateField}
                    errors={errors}
                    onBack={() => setStep(4)}
                  />
                  <AssignCourtStep
                    formData={form}
                    setFormData={updateField}
                    errors={errors}
                    onBack={() => setStep(4)}
                  />
                </div>

                <div className="flex justify-between mt-16">
                  <button
                    onClick={closeModal}
                    className="px-2 py-1 border border-gray-300 text-gray-700 text-sm
                    rounded-md hover:bg-variable-collection-primary-color/20 transition"
                  >
                    إلغاء
                  </button>

                  <div className="flex gap-[20px]">
                    {/* <button
                      className="px-2 py-1 border border-gray-300 text-gray-700 text-sm
                      rounded-md hover:bg-variable-collection-primary-color/20 transition"
                    >
                      حفظ كمسودة
                    </button> */}
                    <button
                      onClick={handleSubmit}
                      className="px-[15px] py-[10px] border border-variable-collection-primary-color bg-variable-collection-primary-color
                      text-white  rounded-md text-sm hover:bg-variable-collection-primary-color/20 transition"
                    >
                      إعتماد القضية
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Summary */}
          <div className="order-first lg:order-last">
            <CaseSummary formData={form} />
          </div>
        </div>
      </div>
    </div>
  );
}
