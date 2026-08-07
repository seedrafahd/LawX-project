import { Axios } from "../../../App/Axios";

export const getInvitationsRequest = async () => {
  const res = await Axios.get("/lawyer/Manage_Offices/my_sended_invitations");
  return res.data;
};

export const getReceivedInvitationsRequest = async () => {
  const res = await Axios.get("/lawyer/Manage_Offices/my_received_invitations");
  return res.data;
};

export const inviteLawyerRequest = async ({
  lawyer_profile_id,
  salary_expected,
}) => {
  const res = await Axios.post(
    `/lawyer/Manage_Offices/invite_lawer_to_office`,
    {
      invited_lawyer_profile_id: lawyer_profile_id,
      salary_expected,
    },
  );
  return res.data;
};

export const removeInvitationRequest = async (invitation_id) => {
  const res = await Axios.post(`/lawyer/Manage_Offices/remove_invitation`, {
    invitation_id: invitation_id,
  });
  console.log(res);
  return res.data;
};

export const acceptInvitationRequest = async (invitation_id) => {
  const res = await Axios.post(`/lawyer/Manage_Offices/accept_invitation`, {
    invitation_id: invitation_id,
  });
  console.log(res);
  return res.data;
};

export const rejectInvitationRequest = async (invitation_id) => {
  const res = await Axios.post(`/lawyer/Manage_Offices/reject_invitation`, {
    invitation_id: invitation_id,
  });
  console.log(res);
  return res.data;
};

export const removeMemberRequest = async (lawyer_profile_id) => {
  const res = await Axios.post(
    `/lawyer/Manage_Offices/remove_lawer_from_office`,
    { lawer_profile_id: lawyer_profile_id },
  );
  console.log(res);
  return res.data;
};
