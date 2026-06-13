export function SectionCard({ title, icon, children }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 border-b-2 border-gray-200 pb-2">
        <div className="flex items-center gap-2 text-blue-700">
          {icon}
          <h2 className="font-bold text-gray-900">{title}</h2>
        </div>
      </div>

      {children}
    </section>
  );
}
