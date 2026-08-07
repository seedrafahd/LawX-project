import { useEffect, useRef } from "react";

export default function SignersSidebar({
  signers,
  selectedSigner,
  setSelectedSigner,
  setIsPlacingSignature,
}) {
  const refs = useRef({});

  useEffect(() => {
    refs.current[selectedSigner]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [selectedSigner]);

  return (
    <div className="h-full bg-white">
      <div className="border-b p-4">
        <h2 className="font-bold text-lg">الموقعون</h2>
      </div>

      <div className="space-y-3 p-4">
        {signers.map((signer) => (
          <div
            key={signer.id}
            ref={(el) => (refs.current[signer.id] = el)}
            onClick={() => {
              setSelectedSigner(signer.id);

              if (!signer.completed) {
                setIsPlacingSignature(true);
              }
            }}
            className={`cursor-pointer rounded-xl border p-3 transition
            ${
              selectedSigner === signer.id
                ? signer.type === "seal"
                  ? "border-purple-600 bg-purple-100"
                  : "border-blue-500 bg-blue-50"
                : "hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-4 w-4 rounded-full"
                style={{ background: signer.color }}
              />

              <div>
                <div className="font-semibold">{signer.name}</div>

                <div className="text-xs text-gray-500">{signer.role}</div>
              </div>
            </div>

            <div className="mt-3 text-sm">
              {signer.completed ? (
                <span className="text-green-600"> ✓ الصفحة {signer.page}</span>
              ) : (
                <span className="text-red-500">لم يتم تحديد المكان</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
