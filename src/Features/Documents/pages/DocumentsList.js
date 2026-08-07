import { useNavigate } from "react-router-dom";
import DocumentItem from "../Components/DocumentItem";
import LibraryHeader from "../Components/LibraryHeader";

export default function DocumentsList({
  tags,
  searchQuery,
  filteredFiles,
  setSelectedFile,
  onSearchChange,
  onTagClick,
  openModal,
}) {
  const navigate = useNavigate();
  return (
    <>
      <LibraryHeader
        tags={tags}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onTagClick={onTagClick}
        openModal={openModal}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredFiles.length ? (
          filteredFiles.map((file) => {
            return (
              <DocumentItem
                key={file.id}
                file={file}
                onViewClick={() =>
                  navigate(`/cases/document_details/${file.id}`, {
                    state: { file },
                  })
                }
                onDeleteClick={() => setSelectedFile(file)}
                onSignRequestClick={() =>
                  navigate(`/cases/document_details/${file.id}/sign_request`, {
                    state: { file },
                  })
                }
              />
            );
          })
        ) : (
          <p className="text-sm font-semibold text-gray-500">
            لا توجد مستندات بعد
          </p>
        )}
      </div>
    </>
  );
}
