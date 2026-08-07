import { UserPlus, Users, Mail, Zap } from "lucide-react";

const actions = [
  {
    id: 1,
    title: "دعوة محام",
    description: "أرسل دعوة لانضمام محام جديد",
    icon: UserPlus,
    action: "invite",
  },
  {
    id: 2,
    title: "أعضاء المكتب",
    description: "إدارة سجلات وصلاحيات الفريق",
    icon: Users,
    action: "members",
  },
  {
    id: 3,
    title: "الدعوات المرسلة",
    description: "تتبع حالات القبول والانتظار",
    icon: Mail,
    action: "invitations",
  },
];

export default function QuickActions({ handleAction }) {
  return (
    <section>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-800">
          <Zap size={16} />

          <h2 className="text-xl font-simebold">الإجراءات السريعة</h2>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleAction(item.action)}
              className="rounded-lg border border-gray-200 bg-white p-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-[#D6E4F0] transition">
                <Icon size={26} className="text-gray-500 transition" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-variable-collection-primary-color">
                {item.title}
              </h3>

              <p className="mt-2 text-xs text-gray-500">{item.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
