import { buildInvoicePayload } from "../helpers/buildInvoicePayload";
import { useCreateInvoice } from "./useInvoices";
import toast from "react-hot-toast";

export const useInvoiceSubmission = ({
  form,
  file,
  case_id,
  validate,
  navigate,
}) => {
  const { mutate, isPending } = useCreateInvoice();

  const submit = (event) => {
    try {
      event?.preventDefault?.();

      if (isPending) return;

      if (!case_id) {
        toast.error("رقم القضية مطلوب");
        return;
      }
      console.log(form);
      const isValid = validate(case_id);

      if (!isValid) {
        toast.error("يرجى تصحيح الأخطاء في الحقول");
        return;
      }

      const payload = buildInvoicePayload({
        form,
        file,
        case_id,
      });

      mutate(payload, {
        onSuccess: () => {
          navigate(`/cases/case_details/${case_id}`);
        },
      });
    } catch (error) {
      console.error("Invoice submission error:", error);
      toast.error("حدث خطأ غير متوقع");
    }
  };

  return {
    submit,
    isPending,
  };
};
