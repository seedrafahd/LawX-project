import { AlertCircle, Mail, Phone, Building2, Star } from "lucide-react";

export default function CaseInfoCard({ caseData }) {
  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={
          index < count
            ? "fill-slate-700 text-slate-700"
            : "fill-slate-200 text-slate-200"
        }
      />
    ));
  };

  const InfoRow = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-500">{label}</span>

      <span className="text-sm font-medium text-gray-800">{value || "-"}</span>
    </div>
  );

  const ContactItem = ({ icon, value }) => (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      {icon}
      <span>{value}</span>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#f8f8f8] px-5 py-3">
        <div className="flex items-center gap-2">
          <AlertCircle size={16} className="text-gray-500" />

          <h2 className="text-base font-semibold text-gray-800">
            معلومات القضية
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Right Section */}
        <div className="p-6">
          <div className="space-y-4">
            <InfoRow
              label="اسم المحكمة"
              value={caseData?.court || "غير معروف"}
            />

            <InfoRow
              label="نوع القضية"
              value={caseData?.case_category || "غير معروف"}
            />

            <div className="flex flex-col gap-2">
              <span className="text-xs text-gray-500">مستوى الخطورة</span>

              <div className="flex items-center gap-1">
                {renderStars(caseData.importance_stars)}
              </div>
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className="border-t border-gray-200 lg:border-t-0 lg:border-r p-6 lg:col-span-2">
          <div className="space-y-5">
            {/* Attorney */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <InfoRow
                label="المحامي الموكل"
                value={caseData.Leader_lawyer_data?.full_name}
              />

              <ContactItem
                icon={<Mail size={16} />}
                value={caseData.Leader_lawyer_data?.email}
              />
            </div>

            {/* Clients */}
            <div className="space-y-4">
              <span className="text-xs text-gray-500">الموكلون</span>
              {caseData?.clients?.length > 0 ? (
                caseData.clients.map((client, i) => (
                  <div
                    key={client.id || i}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-gray-100 pb-3 last:border-0"
                  >
                    <InfoRow
                      label={`اسم الموكل ${caseData.clients.length > 1 ? i + 1 : ""}`}
                      value={client.name || client.client_name || "------"}
                    />
                    <ContactItem
                      icon={<Phone size={16} />}
                      value={client.phone || "-"}
                    />
                    <ContactItem
                      icon={<Mail size={16} />}
                      value={client.email || "-"}
                    />
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <InfoRow label="اسم الموكل" value="------" />
                  <ContactItem icon={<Phone size={16} />} value="-" />
                  <ContactItem icon={<Mail size={16} />} value="-" />
                </div>
              )}
            </div>

            {/* Opponents */}
            <div className="space-y-4">
              <span className="text-xs text-gray-500">الخصوم</span>
              {caseData?.opponents?.length > 0 ? (
                caseData.opponents.map((opponent, i) => (
                  <div
                    key={opponent.id || i}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-gray-100 pb-3 last:border-0"
                  >
                    <InfoRow
                      label={`اسم الخصم ${caseData.opponents.length > 1 ? i + 1 : ""}`}
                      value={opponent.name || "------"}
                    />
                    <ContactItem
                      icon={<Phone size={16} />}
                      value={opponent.phone || "-"}
                    />
                    <ContactItem
                      icon={<Building2 size={16} />}
                      value={opponent.email || "-"}
                    />
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <InfoRow label="اسم الخصم" value="------" />
                  <ContactItem icon={<Phone size={16} />} value="-" />
                  <ContactItem icon={<Building2 size={16} />} value="-" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
