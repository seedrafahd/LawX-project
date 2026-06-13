import {
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  Phone,
  Search,
  User,
} from "lucide-react";
import { SectionCard } from "../SectionCard";
import InfoBox from "./InfoBox";

export default function InvoiceCaseSection() {
  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <SectionCard
      icon={<BriefcaseBusiness className="h-5 w-5" />}
      title="تفاصيل القضية"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="ابحث باسم القضية أو الموكل"
              className={`${inputClass} pr-12`}
            />
          </div>

          {/* Selected Case */}
          <button className="flex w-full items-center justify-between rounded-2xl border border-blue-300 bg-blue-50 px-5 py-5 transition hover:border-blue-500">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2F4277] text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div className="text-right">
                <h3 className="font-extrabold text-slate-900">
                  قضية نزاع عقاري - أحمد الحسن
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  رقم الملف : CAS-2024-089#
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Client Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 rounded-[6px] border border-gray-300 bg-gray-100 px-5 py-2">
          <InfoBox
            icon={<User className="h-4 w-4" />}
            title="اسم الموكل"
            value="أحمد الحسن"
          />

          <InfoBox
            icon={<Phone className="h-4 w-4" />}
            title="رقم الهاتف"
            value="+966 50 123 4567"
          />

          <InfoBox
            icon={<Mail className="h-4 w-4" />}
            title="البريد الإلكتروني"
            value="a.hassan@example.com"
          />
        </div>
      </div>
    </SectionCard>
  );
}
