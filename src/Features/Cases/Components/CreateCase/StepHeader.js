export default function StepHeader({ icon, title }) {
  return (
    <div className="px-4 py-[18px] text-variable-collection-GREY-textcolor">
      <div className="flex items-center gap-2 ">
        <div className="text-variable-collection-primary-color">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </div>
  );
}
