import { ArrowLeft } from "lucide-react";
import GppGoodIcon from "@mui/icons-material/GppGood";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import { Typography } from "@mui/material";

export default function VerifyCard({ form, setForm, error, isSubmitDisabled }) {
  return (
    <div className="rounded-lg border border-[#D9DEE8] bg-white shadow-sm p-6 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 p-2 rounded-lg bg-[#EAF1F8] flex items-center justify-center">
            <GppGoodIcon className="text-[#5F6E7E]" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            التحقق من بيانات المحامي
          </h2>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-6">
        <AuthInput
          label="الاسم والكنية *"
          placeholder="أحمد أحمد"
          type="text"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
        <AuthInput
          label="اسم الأب *"
          placeholder="محمد"
          type="text"
          value={form.father_name}
          onChange={(e) => setForm({ ...form, father_name: e.target.value })}
        />
        <AuthInput
          label="اسم الأم *"
          placeholder="فاطمة"
          type="text"
          value={form.mother_name}
          onChange={(e) => setForm({ ...form, mother_name: e.target.value })}
        />
        <AuthInput
          label="كنية الأم *"
          placeholder="أحمد"
          type="text"
          value={form.mother_family_name}
          onChange={(e) =>
            setForm({ ...form, mother_family_name: e.target.value })
          }
        />
        <AuthInput
          label="مكان الولادة *"
          placeholder="دمشق"
          type="text"
          value={form.birth_place}
          onChange={(e) => setForm({ ...form, birth_place: e.target.value })}
        />
        <AuthInput
          label="تاريخ الولادة *"
          placeholder="YYYY-MM-DD"
          type="date"
          value={form.birth_date}
          onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
        />
        <AuthInput
          label="رقم السجل المدني *"
          placeholder="123456789"
          type="text"
          value={form.civil_registry_number}
          onChange={(e) =>
            setForm({ ...form, civil_registry_number: e.target.value })
          }
        />
        <AuthInput
          label="فرع النقابة *"
          placeholder="دمشق"
          type="text"
          value={form.syndicate_branch}
          onChange={(e) =>
            setForm({ ...form, syndicate_branch: e.target.value })
          }
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            حالة المحامي *
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, lawyer_state: "licensed" })}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                form.lawyer_state === "licensed"
                  ? "bg-variable-collection-primary-color text-white border-variable-collection-primary-color"
                  : "bg-white text-gray-600 border-[#D9DEE8] hover:border-variable-collection-primary-color"
              }`}
            >
              محامي
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, lawyer_state: "trainee" })}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                form.lawyer_state === "trainee"
                  ? "bg-variable-collection-primary-color text-white border-variable-collection-primary-color"
                  : "bg-white text-gray-600 border-[#D9DEE8] hover:border-variable-collection-primary-color"
              }`}
            >
              متدرب
            </button>
          </div>
        </div>
        <AuthInput
          label="رقم الهوية الوطنية *"
          placeholder="1XXXXXXXXX"
          type="id"
          value={form.national_id}
          onChange={(e) => setForm({ ...form, national_id: e.target.value })}
        />

        <AuthInput
          label="رقم المحامي / رقم النقابة *"
          placeholder="L-000000"
          type="lawyer"
          value={form.syndicate_card_number}
          onChange={(e) =>
            setForm({ ...form, syndicate_card_number: e.target.value })
          }
        />
      </div>

      {/* Button */}
      <div className="mt-10">
        <AuthButton
          disabled={isSubmitDisabled}
          type="submit"
          variant="gradient"
          icon={
            <ArrowLeft
              size={22}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
          }
        >
          <span className="text-base font-bold text-white sm:text-lg">
            تحقق
          </span>
        </AuthButton>
      </div>

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
}
