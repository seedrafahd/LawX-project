import StarIcon from "@mui/icons-material/Star";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StepNavigation from "./StepNavigation";
import StepHeader from "./StepHeader";
import SharedField from "../../../../shared/Components/SharedFeild";

export default function CaseDetailsStep({
  formData,
  setFormData,
  errors,
  onNext,
  onBack,
}) {
  return (
    <div className="bg-white rounded-xl">
      {/* Header */}
      <StepHeader icon={<DescriptionOutlinedIcon />} title=" تفاصيل القضية" />
      {/* card */}
      <div className="border-b">
        <div className="grid gap-6 sm:grid-cols-2 px-[25px] pt-3 pb-[18px]">
          {/* Title */}
          <div>
            <SharedField label="عنوان القضية">
              <input
                type="text"
                placeholder="مثال: نزاع عقاري-حصر إرث..."
                value={formData.title}
                onChange={(e) => setFormData("title", e.target.value)}
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
              />
              {formData.title && formData.title.trim().length < 5 && (
                <span className="text-variable-collection-error-color text-xs">
                  يجب أن يكون العنوان 5 أحرف على الأقل
                </span>
              )}
            </SharedField>
          </div>
          {/* Case Number */}
          <SharedField label="رقم القضية">
            <input
              type="number"
              min={0}
              placeholder="مثال: 6879148..."
              value={formData.case_number}
              onChange={(e) => setFormData("case_number", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
            />
            {formData.case_number && formData.case_number.trim().length < 3 && (
              <span className="text-variable-collection-error-color text-xs">
                يجب أن يكون رقم القضية 3 أرقام على الأقل
              </span>
            )}
          </SharedField>
        </div>

        {/* Type And Price */}
        <div className="grid gap-6 sm:grid-cols-2 border-t px-[25px] pt-3 pb-[18px]">
          <SharedField label="نوع القضية">
            <select
              value={formData.case_category}
              onChange={(e) => setFormData("case_category", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
            >
              <option value="">اختر</option>
              <option value="عقارية">عقارية</option>
              <option value="تجارية">تجارية</option>
            </select>
          </SharedField>

          <SharedField label="سعر القضية">
            <input
              type="number"
              min={0}
              placeholder="00.0"
              value={formData.price}
              onChange={(e) => setFormData("price", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
            />
            {formData.price && formData.price < 0 && (
              <span className="text-variable-collection-error-color text-xs">
                يجب أن يكون السعر صحيح أكبر من الصفر
              </span>
            )}
          </SharedField>
        </div>

        {/* Description */}
        <div className="px-[25px] pt-3 pb-[18px] border-t">
          <SharedField label="وصف القضية">
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData("description", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pl-11 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#40558C]"
              placeholder="أدخل وصف للقضية.."
            />
          </SharedField>
          {formData.description && formData.description.trim().length < 10 && (
            <span className="text-variable-collection-error-color text-xs">
              يجب أن يكون الوصف 10 أحرف على الأقل
            </span>
          )}
        </div>

        {/* Star Rating */}
        <div className="flex justify-center flex-col gap-[10px] pr-6 pb-4">
          <label className="block text-sm text-gray-700">مستوى الصعوبة</label>
          <div className="flex  gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                onClick={() => setFormData("importance_stars", star)}
                className={`w-6 h-6 cursor-pointer transition ${
                  star <= formData.importance_stars
                    ? "text-blue-900"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <StepNavigation
        onNext={onNext}
        onBack={onBack}
        disableNext={
          !formData.title ||
          formData.title.trim().length < 5 ||
          !formData.case_number ||
          formData.case_number < 3 ||
          !formData.price ||
          formData.price < 0 ||
          !formData.case_category ||
          formData.description.trim().length < 10
        }
      />
    </div>
  );
}
