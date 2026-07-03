import { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import SharedField from "../../../../shared/components/SharedFeild";

export default function ArticlesSection({ form, setForm, errors }) {
  const [articleInput, setArticleInput] = useState({
    title: "",
    content: "",
  });

  const addArticle = () => {
    if (!articleInput.title.trim()) return;
    const newOpponent = { ...articleInput, title: articleInput.title.trim() };
    const updated = [...(form.articles || []), newOpponent];
    setForm("articles", updated);
    setArticleInput({
      title: "",
      content: "",
    });
  };

  const removeArtile = (index) => {
    const updated = form.articles.filter((_, i) => i !== index);
    setForm("articles", updated);
  };

  return (
    <div className="space-y-3 px-[25px] pt-3 pb-[18px] border-b">
      <div className="grid grid-cols-2 gap-3">
        <SharedField label="عنوان الفقرة" error={errors.articleTitle}>
          <input
            placeholder="مثال: البند الأول"
            value={articleInput.title}
            onChange={(e) =>
              setArticleInput({ ...articleInput, title: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 text-gray-700 text-sm outline-none"
          />
        </SharedField>

        <SharedField label="محتوى الفقرة" error={errors.addArticle}>
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 text-gray-700 text-sm outline-none"
            placeholder="مثال: العقد"
            value={articleInput.content}
            onChange={(e) =>
              setArticleInput({ ...articleInput, content: e.target.value })
            }
          />
        </SharedField>
      </div>

      <button
        onClick={addArticle}
        disabled={
          !articleInput.title.trim() || articleInput.content.length < 10
        }
        className="flex items-center gap-1 text-sm text-variable-collection-primary-color font-medium disabled:opacity-40"
      >
        <AddCircleOutlineOutlinedIcon fontSize="small" />
        إضافة الفقرة
      </button>

      {form.articles?.length > 0 && (
        <div className="space-y-2 pt-2 border-t">
          {form.articles.map((opp, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
            >
              <div>
                <p className="font-medium text-gray-700 text-sm">{opp.title}</p>
                <p className="text-xs text-gray-500">{opp.content}</p>
              </div>
              <button onClick={() => removeArtile(i)}>
                <RemoveCircleOutlineOutlinedIcon className="text-red-500 text-lg" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
