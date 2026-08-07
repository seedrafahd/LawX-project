import SharedButton from "../../../../shared/components/SharedButton";

export default function Header({ onSignRequestClick }) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          طلبات التوقيع
        </h1>
        <p className="text-gray-500">
          يمكنك متابعة جميع المستندات التي أرسلتها للتوقيع الإلكتروني.
        </p>
      </div>

      <SharedButton onClick={onSignRequestClick}>
        ارسال طلب توقيع جديد
      </SharedButton>
    </header>
  );
}
