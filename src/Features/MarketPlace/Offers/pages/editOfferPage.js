import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOfferForm } from "../hooks/useOfferForm";
import { useFileUpload } from "../../../../shared/hooks/useFileUpload";
import { useOfferDetails, useUpdateOffer } from "../hooks/useOffers";
import { buildUpdateOfferPayload } from "../helpers/helpers";
import OfferDescriptionCard from "../components/editOffer/offerDescriptionCard";
import OfferAttachmentsCard from "../components/editOffer/offerAttachmentsCard";
import OfferSidebar from "../components/editOffer/offerSidebar";
import EditOfferHeader from "../components/editOffer/editOfferHeader";
import Loader from "../../../../shared/components/Loading";
import toast from "react-hot-toast";

export default function EditOfferPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending } = useOfferDetails(id);
  const selectedOffer = useMemo(() => data?.data.data || {}, [data]);
  const { form, errors, file, setFile, updateField } = useOfferForm();
  const { fileInputRef, chooseFile, handleFileChange, handleDrop } =
    useFileUpload(setFile);
  console.log(selectedOffer);
  const { mutate: updateOffer, isPending: isUpdating } = useUpdateOffer();

  useEffect(() => {
    if (selectedOffer) {
      if (selectedOffer.price) updateField("price", selectedOffer.price);
      if (selectedOffer.estimated_days)
        updateField("estimated_days", selectedOffer.estimated_days);
      if (selectedOffer.price_currency)
        updateField("price_currency", selectedOffer.price_currency);
      if (selectedOffer.message_for_client)
        updateField("message_for_client", selectedOffer.message_for_client);
      if (selectedOffer.valid_until)
        updateField("valid_until", selectedOffer.valid_until);
      if (selectedOffer.payment_terms)
        updateField("payment_terms", selectedOffer.payment_terms);
      if (selectedOffer.documents)
        updateField("documents", selectedOffer.documents);
    }
  }, [selectedOffer, updateField]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (isPending) return;

    if (!id) {
      toast.error("لم يتم العثور على العرض");
      return;
    }

    const payload = buildUpdateOfferPayload({ id, form, file });

    updateOffer(payload, {
      onSuccess: () => {
        navigate(`/marketplace/my_offers/offer_details/${id}`, {
          state: { offer: { ...selectedOffer, ...form } },
        });
      },
    });
  };

  if (isPending || isUpdating) return <Loader />;
  return (
    <div className="mx-auto max-w-7xl">
      <form onSubmit={handleSubmit}>
        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          {/* ================= Main Content ================= */}
          <main className="space-y-8">
            {/* Case Header */}
            <EditOfferHeader offer={selectedOffer} />

            {/* Offer Description */}
            <OfferDescriptionCard
              form={form}
              errors={errors}
              updateField={updateField}
            />

            {/* Attachments */}
            <OfferAttachmentsCard
              attachments={form.documents}
              file={file}
              errors={errors}
              setFile={setFile}
              chooseFile={chooseFile}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
          </main>

          {/* ================= Sidebar ================= */}
          <OfferSidebar form={form} errors={errors} updateField={updateField} />
        </div>
      </form>
    </div>
  );
}
