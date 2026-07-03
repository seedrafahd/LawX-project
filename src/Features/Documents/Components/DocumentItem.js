import { Eye, FileText, MoreVertical, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export default function DocumentItem({ file, onDeleteClick, onViewClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-8 py-4 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      {/* Right Side & Middle: Content Block */}
      <div className="flex items-center gap-4 flex-1 w-full justify-end">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center relative bg-red-50 text-red-500 text-blue-500">
          <FileText size={28} strokeWidth={1.5} />
        </div>

        {/* Text Details & Tags */}
        <div className="flex flex-col flex-1">
          {/* Main Title */}
          <h3 className="text-gray-800 font-semibold leading-tight">
            {file.File_name}
          </h3>

          {/* Metadata String */}
          <div className="flex text-sm text-gray-400 font-semibold">
            <p>{file.file_size} • </p>
            <p>{file.uploaded_AT}</p>
          </div>

          {/* Tags */}
          <div className="flex gap-2 pt-1 mt-3">
            {file.ai_tags &&
              file.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-900/70 text-xs px-4 py-2.5 rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-500 hover:text-gray-600 transition-colors"
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute left-0 bottom-full mb-1 z-20 min-w-36 rounded-lg bg-white shadow-lg border border-gray-200 py-1">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onViewClick(file);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Eye size={14} /> عرض
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDeleteClick(file);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} /> حذف
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    // <div className="bg-[#EFF1F8]/40 rounded-xl border border-[#EFF1F8] shadow-sm p-4 flex items-center justify-between gap-2">
    //   <div className="flex min-w-0 flex-1 gap-3 text-gray-400  overflow-hidden">
    //     <div className={`w-8 h-8 flex items-center justify-center rounded-xl`}>
    //       <FileText />
    //     </div>

    //     <div>
    //       <h5 className="truncate text-base text-black">{file.File_name}</h5>
    //       <div className="flex">
    //         <p className="text-xs">{file.file_size} • </p>
    //         <p className="text-xs">{file.uploaded_AT}</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="flex gap-4">
    //     <a
    //       href={file.file_url}
    //       target="_blank"
    //       rel="noreferrer"
    //       aria-label="تحميل المستند"
    //       className="p-[10px] bg-variable-collection-primary-color/20 text-variable-collection-primary-color rounded-full"
    //     >
    //       <Download size={16} />
    //     </a>
    //     <IconActionButton
    //       icon={BookOpenIcon}
    //       variant="primary"
    //       onClick={() => onViewClick(file)}
    //     />
    //     <IconActionButton
    //       icon={Trash2}
    //       variant="danger"
    //       onClick={() => onDeleteClick(file)}
    //     />
    //   </div>
    // </div>
  );
}
