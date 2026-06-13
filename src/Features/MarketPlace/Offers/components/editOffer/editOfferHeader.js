export default function EditOfferHeader({ offer }) {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold text-blue-500">
          {offer.title_request}
        </h3>

        <span className="px-3 py-1 rounded-full bg-[#EFF6FF] text-blue-500 text-sm font-medium whitespace-nowrap">
          {offer.status}
        </span>
      </div>
      <p className="text-gray-500 text-base md:text-lg">
        {offer.title_description}
      </p>
    </section>
  );
}
