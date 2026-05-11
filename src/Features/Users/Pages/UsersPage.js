import React from "react";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const filters = [
  "الكل",
  "3 الأكثر نشاطاً",
  "نشط الآن",
  "غير نشط",
  "تمت إزالته",
];

const clients = [
  {
    id: 1,
    name: "سارة القاضي",
    subtitle: "عميل نشط",
    active: true,
    selected: true,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "علي كوكش",
    subtitle: "استشارة جارية",
    active: true,
    selected: false,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "علي كوكش",
    subtitle: "عقد سنوي",
    active: false,
    selected: false,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "علي كوكش",
    subtitle: "قضية عقارية",
    active: false,
    selected: false,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
  },
];

const transactions = [
  { label: "دفعة مقدمة - قضية 8829", amount: "15,000", color: "bg-orange-600" },
  { label: "رسوم استشارة قانونية", amount: "2,500", color: "bg-slate-300" },
];

const documents = [
  { name: "عقد التوريد النهائي.pdf", type: "file" },
  { name: "صورة السجل التجاري.pdf", type: "pdf" },
];

const cases = [
  {
    code: "#CASE-8829",
    category: "قضية تجارية",
    title: "نزاع تعاقدي - شركة التوريد المتحدة",
    lawyer: "د. إبراهيم خالد",
    status: "جلسة غداً",
    statusClass: "text-orange-600",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
  },
  {
    code: "#CASE-7410",
    category: "تحكيم",
    title: "تصفية استثمارات عقارية - جدة",
    lawyer: "أ. منيرة السعد",
    status: "قيد الدراسة",
    statusClass: "text-slate-600",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-white">
      <path
        d="M5 10.3 8.3 13.5 15 6.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M4 20h4.2L19 9.2 14.8 5 4 15.8V20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m13.8 6.2 4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M6 7h12M10 11v6M14 11v6M9 7l.6-2h4.8L15 7M8 7l.7 14h6.6L16 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon({ pdf = false }) {
  return (
    <div className="grid h-8 w-8 place-items-center rounded-lg border border-blue-100 bg-white text-blue-600">
      {pdf ? (
        <span className="text-[9px] font-extrabold leading-none">PDF</span>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M7 3h7l5 5v13H7V3Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M14 3v6h6M10 13h7M10 17h5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

function ClientMiniCard({ client }) {
  return (
    <button
      type="button"
      className={`flex items-center px-4 py-[10px] gap-2 rounded-2xl text-right transition hover:-translate-y-0.5 hover:shadow-md ${
        client.selected
          ? "bg-variable-collection-primary-color/10 border border-variable-collection-primary-color"
          : "bg-white"
      }`}
    >
      <div className="relative shrink-0">
        <img
          src={client.image}
          alt={client.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
            client.active ? "bg-emerald-500" : "bg-orange-400"
          }`}
        />
      </div>
      <div className="min-w-0">
        <p className={`truncate text-base font-bold`}>{client.name}</p>
        <p className={`text-sm text-gray-500`}>{client.subtitle}</p>
      </div>
    </button>
  );
}

function StatItem({ label, value }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-slate-400">{label}</p>
      <p className="text-[17px] font-extrabold text-slate-950">{value}</p>
    </div>
  );
}

function CaseCard({ item }) {
  return (
    <article className="grid min-h-[184px] grid-cols-12 overflow-hidden rounded-[20px] bg-white border-r-4 border-blue-500">
      {/* Right part: case title and lawyer */}
      <div className="col-span-7 flex flex-col justify-between border-l border-slate-100 p-6">
        <div>
          <p className="mb-7 text-sm font-bold leading-7 text-slate-800">
            {item.title}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className={`text-xs font-extrabold ${item.statusClass}`}>
            {item.status}
          </p>
          <div className="flex items-center gap-3">
            <div className="text-left">
              <p className="text-xs font-bold text-slate-400">
                المحامي المسؤول
              </p>
              <p className="mt-1 text-sm font-extrabold text-slate-950">
                {item.lawyer}
              </p>
            </div>
            <img
              src={item.image}
              alt={item.lawyer}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
            />
          </div>
        </div>
      </div>

      {/* Left part: code and classification */}
      <div className="col-span-5 flex flex-col justify-between p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-extrabold text-blue-700">
            {item.category}
          </span>
          <span className="text-xs font-bold text-slate-400">{item.code}</span>
        </div>
        <div className="h-px w-full bg-slate-100" />
      </div>
    </article>
  );
}

function Sidebar() {
  return (
    <section className="p-6 space-y-6 rounded-xl bg-white">
      <h5 className="text-right text-sm font-bold text-gray-900">
        سجل العمليات والمالية
      </h5>

      {/* Total invoices card */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-[#F3F4F5]">
          <div className="text-right space-y-[2px]">
            <p className="text-[10px] text-gray-500">
              إجمالي الفواتير المستحقة
            </p>
            <p className="text-base font-extrabold text-blue-700">
              45,200 دينار
            </p>
          </div>
          <div className="p-2 place-items-center rounded-lg bg-blue-600 text-white">
            <ReceiptLongOutlinedIcon />
          </div>
        </div>

        {/* Latest transactions */}
        <div className="space-y-3">
          <h4 className="text-right text-[10px] font-bold text-gray-400">
            آخر المعاملات
          </h4>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 text-right">
                  <span
                    className={`h-2 w-2 rounded-full ${transaction.color}`}
                  />
                  <span className="text-xs text-gray-900">
                    {transaction.label}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div>
        <h4 className="mb-4 text-right text-xs font-extrabold tracking-wide text-slate-400">
          أحدث المستندات المرفوعة
        </h4>
        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
          {documents.map((document, index) => (
            <div
              key={document.name}
              className={`flex items-center justify-between px-4 py-3 ${index !== documents.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <button
                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-blue-600"
                type="button"
                aria-label="تحميل الملف"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M12 4v10M8 10l4 4 4-4M5 20h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <span className="max-w-[160px] truncate text-xs font-bold text-slate-700">
                  {document.name}
                </span>
                <DocumentIcon pdf={document.type === "pdf"} />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-5 h-12 w-full rounded-xl border-2 border-dashed border-blue-200 bg-white text-sm font-extrabold text-blue-700 transition hover:bg-blue-50"
        >
          + رفع مستند جديد
        </button>
      </div>
    </section>
  );
}

function ProfileCard() {
  return (
    <section className="p-8 rounded-xl bg-white border-t-4 border-blue-500">
      {/* Header and actions */}
      <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="text-right">
          <div className="mb-2 flex flex-wrap items-center justify-end gap-3">
            <h1 className="text-2xl font-extrabold text-slate-950">
              مجموعة الغانم التجارية
            </h1>
            <span className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold text-blue-300">
              عميل مميز
            </span>
          </div>
        </div>

        <div className="flex flex-row-reverse gap-3 md:flex-col">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-100 px-5 text-sm font-extrabold text-slate-700 transition hover:bg-slate-200"
          >
            <EditIcon />
            تعديل البيانات
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-50 px-5 text-sm font-extrabold text-red-600 transition hover:bg-red-100"
          >
            <TrashIcon />
            حذف العميل
          </button>
        </div>
      </div>

      {/* Client data grid */}
      <div className="grid grid-cols-1 gap-x-16 gap-y-6 md:grid-cols-2">
        <StatItem label="رقم الهوية / السجل" value="10103495822" />
        <StatItem label="مسؤول التواصل" value="سارة القاضي" />
        <StatItem label="البريد الإلكتروني" value="contact@alghanem.sa" />
        <StatItem label="رقم الجوال" value="+966 50 123 4567" />
      </div>
    </section>
  );
}

function MainContent() {
  return (
    <main className="col-span-12 space-y-6 xl:col-span-9">
      {/* Horizontal Client Selector */}
      <section className="rounded-[28px] p-5 space-y-[6px] shadow-sm ring-1 ring-slate-100">
        <div className="flex justify-between">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-variable-collection-GREY-textcolor">
              قائمة العملاء
            </h2>
            <div className="flex items-center gap-[10px]">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={`rounded-xl px-[20px] py-3 text-sm transition ${
                    index === 0
                      ? "bg-variable-collection-primary-color text-white shadow-sm"
                      : "bg-white text-variable-collection-GREY-textcolor shadow-sm hover:bg-slate-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          {/* Add Client button */}
          <button
            type="button"
            className="flex h-16 items-center px-4 py-3 gap-[6px] rounded-xl bg-variable-collection-primary-color text-xl font-semibold text-white transition hover:bg-[#2b3c70]"
          >
            <PlusIcon />
            إضافة عميل
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {clients.map((client) => (
            <ClientMiniCard key={client.id} client={client} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ClientManagementPage() {
  return (
    <div className="space-y-[22px] min-h-screen">
      {/* Optional top navigation to match the spacing of the reference frame */}
      {/* Tap */}
      <header className="px-1 py-[10px] space-y-[14px]">
        <div className="mx-auto flex max-w-[1180px] items-center justify-center gap-16 text-xl font-extrabold">
          <span className="text-slate-500">محامي</span>
          <span className="relative text-blue-500 after:absolute after:-bottom-4 after:right-0 after:h-0.5 after:w-full after:bg-blue-500">
            عميل
          </span>
          <span className="text-slate-500">متدرب</span>
          <span className="text-slate-500">محاسب</span>
        </div>
      </header>

      {/* <div className="mx-auto max-w-[1180px] px-4 pb-10"> */}
      <div>
        <MainContent />
      </div>

      {/* Main 3-column layout */}
      <div className="grid grid-cols-3 gap-5">
        {/* Right */}
        <div className="flex flex-col col-span-2 gap-4">
          {/* Client Profile */}
          <ProfileCard />

          {/* Active Cases */}
          <section className="space-y-[10px]">
            <h2 className="text-right text-base font-bold text-gray-900">
              ملخص القضايا النشطة
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cases.map((item) => (
                <CaseCard key={item.code} item={item} />
              ))}
            </div>
          </section>
        </div>
        {/* Left */}
        <Sidebar />
      </div>
      {/* </div> */}
    </div>
  );
}
