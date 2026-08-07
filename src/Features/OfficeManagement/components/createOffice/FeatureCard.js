export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#2D4C8C]">
        {icon}
      </div>

      <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}
