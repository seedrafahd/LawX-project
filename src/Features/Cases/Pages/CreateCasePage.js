import { useState } from "react";
import Stepper from "../Components/CreateCase/Stepper";
import CaseDetailsStep from "../Components/CreateCase/CaseDetailsStep";
import WorkflowStep from "../Components/CreateCase/WorkflowStep";
import PaymentPlanStep from "../Components/CreateCase/PaymentPlanStep";
import AssignLawyerStep from "../Components/CreateCase/AssignLawyerStep";
import ClientStep from "../Components/CreateCase/ClientStep";
import CaseSummary from "../Components/CreateCase/CaseSummary";
import CaseHeader from "../Components/CaseHeader";
import { useNavigate } from "react-router-dom";
import { useCreateCase } from "../Hooks/useCases";
import Loader from "../../../shared/Components/Loading";
import toast from "react-hot-toast";

export default function CreateCasePage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateCase();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "qwerty ertyukv",
    client_id: null,
    type: "",
    workflow: "",
    payment_plan: "",
    lawyer: "",
  });

  const handleSubmit = () => {
    mutate(formData, {
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleCancle = () => {
    navigate("/cases");
    setFormData({
      title: "",
      description: "",
      client_id: null,
      type: "",
      workflow: "",
      payment_plan: "",
      lawyer: "",
    });
  };
  return (
    <div className="flex-1 flex flex-col">
      {isPending && <Loader />}
      <CaseHeader />

      <div className="p-6">
        <Stepper currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <ClientStep
                formData={formData}
                setFormData={setFormData}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <CaseDetailsStep
                formData={formData}
                setFormData={setFormData}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <WorkflowStep
                formData={formData}
                setFormData={setFormData}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <PaymentPlanStep
                formData={formData}
                setFormData={setFormData}
                onNext={() => setStep(5)}
                onBack={() => setStep(3)}
              />
            )}

            {step === 5 && (
              <>
                <AssignLawyerStep
                  formData={formData}
                  setFormData={setFormData}
                  onBack={() => setStep(4)}
                />

                <div className="flex justify-between mt-16">
                  <button
                    onClick={handleCancle}
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
            <CaseSummary formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}
