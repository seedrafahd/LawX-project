import { FolderOpen, PenSquare, Users } from "lucide-react";

import FeatureCard from "./FeatureCard";

const cards = [
  {
    icon: <FolderOpen size={28} />,
    title: "إدارة قضايا متكاملة",
    description:
      "تتبع سير القضايا، المواعيد النهائية، والجلسات بذكاء ودقة عالية.",
  },
  {
    icon: <PenSquare size={28} />,
    title: "توقيعات إلكترونية",
    description: "وقّع العقود والوثائق الرسمية رقمياً بكل سهولة وأمان تام.",
  },
  {
    icon: <Users size={28} />,
    title: "تواصل فعال",
    description:
      "نظام تنبيهات ذكي للموكلين وتنسيق المواعيد بأعلى درجات الإنتاجية.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <FeatureCard key={card.title} {...card} />
      ))}
    </section>
  );
}
