import React from "react";
import { BookOpen } from "lucide-react";
import LawHeaderCard from "../components/lawDetails/HeaderCard";
import LawDetailsSidebar from "../components/lawDetails/LawDetailsSidebar";
import { useLawDetails } from "../hooks/useLaws";
import { useParams } from "react-router-dom";
import Loader from "../../../shared/components/Loading";
import { useAuth } from "../../Auth/hooks/useAuth";

export default function LawDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data, isPending } = useLawDetails(id, user.role);
  const law = data?.data || [];
  console.log(law);

  if (isPending) return <Loader />;
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">تفاصيل القانون</h1>
      </div>

      {/* HEADER CARD */}
      <LawHeaderCard law={law} />

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* MAIN CONTENT */}
        <LawContent content={law.content} articles={law.articles} />

        {/* SIDEBAR */}
        <LawDetailsSidebar relatedLaws={law.related_legislations} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              LAW TEXT CONTENT                              */
/* -------------------------------------------------------------------------- */

function LawContent({ content, articles }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2 p-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2">
          <BookOpen size={24} className="text-blue-600" />

          <h2 className="text-xl font-bold text-gray-900">النص القانوني</h2>
        </div>
      </div>

      {/* Articles */}
      <div className="space-y-6 px-6 md:px-8 mt-6">
        <h1 className="font-bold text-gray-700">{content}</h1>
        {articles?.map((article, i) => (
          <ArticleItem key={i} article={article} />
        ))}
      </div>
    </section>
  );
}

function ArticleItem({ article }) {
  return (
    <article className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-1 w-8 rounded-full bg-blue-600" />

        <h3 className="text-lg font-bold text-blue-600">{article.title}</h3>
      </div>

      <p className="text-right text-lg leading-[1.8] text-gray-800">
        {article.content}
      </p>
    </article>
  );
}
