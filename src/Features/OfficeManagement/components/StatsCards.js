import { Scale, GraduationCap, Mail, Package } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "متدربين",
    value: "5",
    icon: Package,
  },
  {
    id: 2,
    title: "محام مسجل",
    value: "12",
    icon: Scale,
  },
  {
    id: 3,
    title: "الدعوات المرسلة",
    value: "12",
    icon: Mail,
  },
  {
    id: 4,
    title: "دعوات قيد الانتظار",
    value: "5",
    icon: GraduationCap,
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-6 lg:p-8 shadow-sm"
          >
            <div className="flex justify-center">
              <Icon size={28} className="text-gray-600" />
            </div>

            <h3 className="mt-4 text-center text-4xl font-bold text-gray-900">
              {item.value}
            </h3>

            <p className="text-center text-sm text-gray-500">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}
