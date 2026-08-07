import { Check } from "lucide-react";

export default function BenefitItem({ title, description }) {
  return (
    <div className="flex items-start gap-4">
      <Check className="mt-2 h-5 w-5 text-[#3B3B3B]" strokeWidth={3} />

      <div>
        <h4 className="font-bold text-gray-900">{title}</h4>

        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
