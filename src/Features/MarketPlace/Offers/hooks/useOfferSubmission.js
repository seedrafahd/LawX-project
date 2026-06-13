import { buildProposalPayload } from "../helpers/helpers";
import { useSendProposal } from "./useOffers";

export const useOfferSubmission = ({
  form,
  file,
  requestId,
  validate,
  navigate,
}) => {
  const { mutate, isPending } = useSendProposal();

  const submit = (event) => {
    event.preventDefault();

    if (isPending) return;

    const isValid = validate(requestId);

    if (!isValid) return;

    const payload = buildProposalPayload({
      form,
      file,
      requestId,
    });

    mutate(payload, {
      onSuccess: () => {
        navigate(`/marketplace/requests/request_details/${requestId}`);
      },
    });
  };

  return {
    submit,
    isPending,
  };
};
