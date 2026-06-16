import SharedField from "../../../../shared/components/SharedFeild";
import { SectionCard } from "../SectionCard";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

export default function InvoiceDetailsSection({ form, setForm, errors }) {
  return (
    <SectionCard
      icon={<PaymentsOutlinedIcon className="h-5 w-5" />}
      title="معلومات أساسية"
    >
      {/* Due Date */}
      <SharedField label="تاريخ الاستحقاق النهائي" error={errors.due_date}>
        <input
          type="date"
          lang="en-CA"
          value={form.due_date}
          onChange={(event) => setForm("due_date", event.target.value)}
          className="hearing-date-input h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-center text-sm text-gray-700 outline-none transition placeholder:text-gray-400"
        />
      </SharedField>
    </SectionCard>
  );
}
