import SharedButton from "../../../../shared/components/SharedButton";

export default function Header({ full_name, handleEditLawyer }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
      {/* Banner */}
      <div className="h-36 bg-gradient-to-r from-[#D9E6F7] via-[#ECECEC] to-[#F4F4F4]" />

      {/* Content */}
      <div className="relative px-8 pb-8">
        {/* Profile Image */}
        <div className="absolute -top-16 right-8">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
            alt=""
            className="w-40 h-40 rounded-3xl object-cover border-4 border-white shadow-lg"
          />
        </div>

        {/* Name */}
        <div className="pr-52 pt-10 flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{full_name}</h1>

            <div className="inline-flex mt-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
              12 سنة خبرة
            </div>
          </div>

          <SharedButton
            onClick={handleEditLawyer}
            colors="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
            children=" تعديل البيانات"
          />
        </div>
      </div>
    </div>
  );
}
