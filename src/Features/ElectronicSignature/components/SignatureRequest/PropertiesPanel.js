export default function PropertiesPanel({
  signers,
  selectedSigner,
  updateSigner,
}) {
  const signer = signers.find((s) => s.id === selectedSigner);

  if (!signer) return null;

  return (
    <div className="mt-5 rounded-xl border bg-white p-5">
      <h2 className="mb-5 text-lg font-bold">خصائص التوقيع</h2>

      <div className="grid grid-cols-5 gap-4">
        <div>
          <label className="mb-2 block text-sm">الصفحة</label>

          <input
            type="number"
            value={signer.page ?? ""}
            onChange={(e) =>
              updateSigner(signer.id, {
                page: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">X</label>

          <input
            type="number"
            value={signer.x ?? ""}
            onChange={(e) =>
              updateSigner(signer.id, {
                x: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Y</label>

          <input
            type="number"
            value={signer.y ?? ""}
            onChange={(e) =>
              updateSigner(signer.id, {
                y: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Width</label>

          <input
            type="number"
            value={signer.width ?? ""}
            onChange={(e) =>
              updateSigner(signer.id, {
                width: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">Height</label>

          <input
            type="number"
            value={signer.height ?? ""}
            onChange={(e) =>
              updateSigner(signer.id, {
                height: Number(e.target.value),
              })
            }
            className="w-full rounded-lg border p-2"
          />
        </div>
        <div>
          <label className="mb-2 block">نوع الحقل</label>

          <select
            value={signer.type}
            onChange={(e) =>
              updateSigner(
                signer.id,

                {
                  type: e.target.value,
                },
              )
            }
            className="w-full rounded border p-2"
          >
            <option value="signature">توقيع</option>

            <option value="seal">ختم</option>
          </select>
        </div>
      </div>
    </div>
  );
}
