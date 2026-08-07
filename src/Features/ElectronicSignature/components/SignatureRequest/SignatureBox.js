import { Rnd } from "react-rnd";

export default function SignatureBox({
  signer,
  active,
  updateSigner,
  setSelectedSigner,
}) {
  return (
    <Rnd
      position={{
        x: signer.x,
        y: signer.y,
      }}
      size={{
        width: signer.width,
        height: signer.height,
      }}
      style={{ zIndex: 50 }}
      bounds="parent"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedSigner(signer.id);
      }}
      onDragStop={(e, d) => {
        updateSigner(signer.id, {
          x: d.x,
          y: d.y,
        });
      }}
      onResizeStop={(e, dir, ref, delta, position) => {
        updateSigner(signer.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          x: position.x,
          y: position.y,
        });
      }}
    >
      <div
        className={`flex h-full w-full items-center justify-center rounded-lg border-2 text-xs font-semibold transition
        ${active ? "border-blue-600 bg-blue-100" : "border-gray-400 bg-white"}`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2">
          <div className="font-semibold">
            {signer.type === "signature" ? "✍ توقيع" : "🏢 ختم"}
          </div>

          <div className="text-xs">{signer.name}</div>
        </div>
      </div>
    </Rnd>
  );
}
