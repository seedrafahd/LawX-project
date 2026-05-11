export default function SharedField({ label, error, children }) {
  return (
    <div className="space-y-2 text-right">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
    </div>
  );
}
