import { CircleHelp } from "lucide-react";

export default function FooterHelp() {
  return (
    <div className="flex items-center justify-center gap-2 text-[#7C8493] text-sm font-medium">
      <CircleHelp size={18} />

      <span>هل تواجه مشكلة في التحقق؟</span>

      <span className="font-semibold text-[#3B4F86]">
        راجع النقابة لمعرفة السبب
      </span>
    </div>
  );
}
