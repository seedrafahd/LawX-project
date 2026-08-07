import React, { useState } from "react";
import StepNavigation from "./StepNavigation";
import { FileText } from "lucide-react";

// 2. Top Document Info Card Component
const DocumentCard = ({ file }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col lg:flex-row md:items-center justify-between gap-4">
      {/* Right section: Document Icon & Title Info */}
      <div className="flex items-start gap-4">
        <div className="w-11 h-12 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center shrink-0">
          <FileText color="red" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 leading-snug">
            {file?.name || "Document.pdf"}
          </h2>
          {/* <p className="text-sm text-gray-500 mt-1">
            القضية المرتبطة:{" "}
            <span className="text-[#008080] font-medium">
              نزاع ملكية العقار - جدة
            </span>
          </p> */}
        </div>
      </div>

      {/* Middle section: Document Metadata */}
      <div className="flex items-center gap-6 text-sm text-gray-500 md:border-r md:border-gray-100 md:pr-6">
        <div>
          تاريخ الإنشاء:{" "}
          <span className="text-gray-700 font-medium">12 أكتوبر 2023</span>
        </div>
        <div>
          حجم الملف: <span className="text-gray-700 font-medium">1.2 MB</span>
        </div>
      </div>

      {/* Left section: Action Button */}
      {/* <button className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors self-start md:self-center">
        معاينة المستند
      </button> */}
    </div>
  );
};

const ROLE_LABELS = {
  client: "موكل",
  lawyer: "محامي",
  bar: "نقابة",
};

// 3. Signer Item Component
const SignerListItem = ({ signer, isSelected, onToggle }) => {
  return (
    <label
      htmlFor={`signer-${signer.id}`}
      className={`w-full bg-white border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-sm ${
        isSelected
          ? "border-[#2B4C7E] ring-1 ring-[#2B4C7E]"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Right side: Avatar, Name, Role Tag, Email */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#2B4C7E] text-white font-bold text-base">
          {signer.name?.charAt(0) || "؟"}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-base">
              {signer.name}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-[#2B4C7E]">
              {ROLE_LABELS[signer.role] || signer.role}
            </span>
          </div>
          <span className="text-sm text-gray-400 block mt-0.5">
            {signer.email || signer.role}
          </span>
        </div>
      </div>

      {/* Left side: Checkbox */}
      <div className="flex items-center pr-4">
        <input
          type="checkbox"
          id={`signer-${signer.id}`}
          checked={isSelected}
          onChange={() => onToggle(signer.id)}
          className="w-5 h-5 accent-[#2B4C7E] border-gray-300 rounded focus:ring-[#2B4C7E]"
        />
      </div>
    </label>
  );
};

// --- Main Page Component ---
export default function SelectSigners({
  signers,
  file,
  onNext,
  onBack,
  initialSelectedIds = [],
}) {
  const [selectedIds, setSelectedIds] = useState(initialSelectedIds);

  const clients = signers.filter((s) => s.role === "client");
  const lawyers = signers.filter((s) => s.role !== "client");

  const toggleSigner = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const selectedSigners = signers.filter((s) => selectedIds.includes(s.id));

  const handleNext = () => {
    onNext(selectedSigners);
  };

  const renderSection = ({ title, items, emptyMessage }) => (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
        {title}
        <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full">
          {items.length}
        </span>
      </h2>

      {items.length ? (
        items.map((signer) => (
          <SignerListItem
            key={signer.id}
            signer={signer}
            isSelected={selectedIds.includes(signer.id)}
            onToggle={toggleSigner}
          />
        ))
      ) : (
        <p className="text-sm text-gray-400">{emptyMessage}</p>
      )}
    </div>
  );

  return (
    <div className="px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6">
      {/* Document Info Card */}
      <DocumentCard file={file} />

      {/* Signer Selection Section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          من سيقوم بتوقيع هذا المستند؟
        </h1>
        <p className="text-sm text-gray-500">
          اختر الموقّعين من القائمة، يمكنك اختيار أكثر من شخص.
        </p>
      </div>

      {/* Clients Section */}
      {renderSection({
        title: "العملاء",
        items: clients,
        emptyMessage: "لا يوجد عملاء",
      })}

      {/* Lawyers Section */}
      {renderSection({
        title: "المحاميين",
        items: lawyers,
        emptyMessage: "لا يوجد محاميين",
      })}

      <StepNavigation
        onNext={handleNext}
        onBack={onBack}
        disableNext={selectedIds.length === 0}
      />
    </div>
  );
}
