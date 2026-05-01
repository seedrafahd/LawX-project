import StarIcon from "@mui/icons-material/Star";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StepNavigation from "./StepNavigation";
import { useState } from "react";

export default function CaseDetailsStep({
  formData,
  setFormData,
  onNext,
  onBack,
}) {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-white rounded-xl">
      {/* Header */}
      <div className="px-4 py-[18px]">
        <div className="flex items-center gap-2 ">
          <DescriptionOutlinedIcon className="text-lg" />
          <h2 className="font-semibold text-lg font-bold">تفاصيل القضية</h2>
        </div>
      </div>
      {/* card */}
      <div className="border-b">
        <div className="px-[25px] pt-3 pb-[18px]">
          <div className="flex flex-col gap-2">
            <label className="block text-sm text-gray-700">عنوان القضية</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-[10px] py-2"
              placeholder="مثال: نزاع عقاري-حصر إرث..."
            />
          </div>
        </div>

        <div className="border-t px-[25px] pt-3 pb-[18px]">
          <div className="flex gap-[162px]">
            <div className="flex flex-col w-[350px] gap-2">
              <label className="block mb-1 text-gray-700 text-sm">
                نوع القضية
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full border border-gray-300 text-gray-500 rounded-lg px-4 py-2"
              >
                <option value="">اختر</option>
                <option value="عقارية">عقارية</option>
                <option value="تجارية">تجارية</option>
              </select>
            </div>

            {/* Star Rating */}
            <div className="flex flex-col gap-[10px]">
              <label className="block text-sm text-gray-700">
                مستوى الصعوبة
              </label>
              <div className="flex  gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-6 h-6 cursor-pointer transition ${
                      star <= rating ? "text-blue-900" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <StepNavigation
        onNext={onNext}
        onBack={onBack}
        disableNext={!formData.title || !formData.type}
      />
    </div>
  );
}
