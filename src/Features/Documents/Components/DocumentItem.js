import { BookOpenIcon, Download, FileText, Trash2 } from "lucide-react";
import IconActionButton from "../../../shared/components/IconActionButton";

export default function DocumentItem({ file, onDeleteClick, onViewClick }) {
  // console.log(file);

  return (
    <div className="bg-[#EFF1F8]/40 rounded-xl border border-[#EFF1F8] shadow-sm p-4 flex items-center justify-between gap-2">
      <div className="flex min-w-0 flex-1 gap-3 text-gray-400  overflow-hidden">
        <div className={`w-8 h-8 flex items-center justify-center rounded-xl`}>
          <FileText />
        </div>

        <div>
          <h5 className="truncate text-base text-black">{file.File_name}</h5>
          <div className="flex">
            <p className="text-xs">{file.file_size} • </p>
            <p className="text-xs">{file.uploaded_AT}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href={file.file_url}
          target="_blank"
          rel="noreferrer"
          aria-label="تحميل المستند"
          className="p-[10px] bg-variable-collection-primary-color/20 text-variable-collection-primary-color rounded-full"
        >
          <Download size={16} />
        </a>
        <IconActionButton
          icon={BookOpenIcon}
          variant="primary"
          onClick={() => onViewClick(file)}
        />
        <IconActionButton
          icon={Trash2}
          variant="danger"
          onClick={() => onDeleteClick(file)}
        />
      </div>
    </div>
  );
}
