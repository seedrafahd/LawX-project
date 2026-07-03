import { useEffect, useRef, useState } from "react";
import { Download, Eye, FileText, Loader } from "lucide-react";
import SharedButton from "../../../../shared/components/SharedButton";
import { renderAsync } from "docx-preview";
import Cookies from "universal-cookie";

const cookie = new Cookies();

function getFileExtension(filePath) {
  if (!filePath) return "";
  const noQuery = filePath.split("?")[0];
  return noQuery.split(".").pop()?.toLowerCase() || "";
}

function getFileName(filePath) {
  if (!filePath) return "ملف غير معروف";
  const noQuery = filePath.split("?")[0];
  return noQuery.split("/").pop() || filePath;
}

function getAuthToken() {
  const auth =
    cookie.get("auth") || JSON.parse(sessionStorage.getItem("auth") || "null");
  return auth?.token || null;
}

function getProxiedUrl(url) {
  if (!url) return url;
  try {
    const u = new URL(url);
    return u.pathname + u.search;
  } catch {
    return url;
  }
}

export default function DocumentPreview({ file }) {
  const fileUrl = file || null;
  const ext = getFileExtension(fileUrl);
  const fileName = getFileName(fileUrl);
  const isPdf = ext === "pdf";
  const isDocx = ext === "docx" || ext === "doc";
  const docxContainerRef = useRef(null);
  const [isDocxLoading, setIsDocxLoading] = useState(false);
  const [docxError, setDocxError] = useState(null);

  useEffect(() => {
    if (!isDocx || !fileUrl || !docxContainerRef.current) return;

    setIsDocxLoading(true);
    setDocxError(null);

    const headers = { "Content-Type": "application/zip" };
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    fetch(getProxiedUrl(fileUrl), { headers })
      .then((res) => {
        if (!res.ok) throw new Error("فشل تحميل الملف");
        return res.blob();
      })
      .then((blob) => renderAsync(blob, docxContainerRef.current))
      .then(() => setIsDocxLoading(false))
      .catch((err) => {
        console.error(err);
        setDocxError(err.message);
        setIsDocxLoading(false);
      });
  }, [isDocx, fileUrl]);

  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="rounded-t-lg flex flex-col gap-3 border-b border-gray-300 bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Eye size={18} />
          <div>
            <h2 className="text-sm font-bold text-[#0B2D5B]">معاينة المستند</h2>
            <p className="text-sm text-gray-500">{fileName}</p>
          </div>
        </div>

        {fileUrl && (
          <a href={fileUrl} download>
            <SharedButton
              icon={<Download size={16} />}
              colors="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              تحميل
            </SharedButton>
          </a>
        )}
      </div>

      {/* Preview Area */}
      <div className="flex justify-center overflow-auto bg-white p-6">
        <div className="text-center shadow-sm">
          {!fileUrl ? (
            <div className=" text-gray-400">لا يوجد ملف للمعاينة</div>
          ) : isPdf ? (
            <iframe
              className="h-full w-full"
              src={fileUrl}
              title="pdf-preview"
            />
          ) : isDocx ? (
            <div className="h-[900px] w-full overflow-hidden">
              {isDocxLoading && (
                <div className="flex items-center justify-center py-16">
                  <Loader className="animate-spin text-[#0B2D5B]" size={32} />
                </div>
              )}
              {docxError && (
                <div className="space-y-6 py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#0B2D5B] shadow-sm">
                    <FileText size={28} />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      تعذرت المعاينة
                    </p>
                    <p className="mt-2 text-sm text-gray-600">{docxError}</p>
                  </div>
                </div>
              )}
              <div
                ref={docxContainerRef}
                className={`h-full w-full overflow-auto bg-white p-4 text-right [&_*]:max-w-full ${isDocxLoading || docxError ? "hidden" : ""}`}
              />
            </div>
          ) : (
            <div className="space-y-6 py-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#0B2D5B] shadow-sm">
                <FileText size={28} />
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">
                  لا يمكن معاينة هذا النوع مباشرةً
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  هذا الملف من نوع <span className="font-medium">.{ext}</span>.
                  يمكنك فتحه أو تحميله من الأزرار أعلاه.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
