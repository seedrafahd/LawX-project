export function prepareSignatureRequest(title, signers) {
  const formData = new FormData();

  formData.append("title", title);

  signers.forEach((signer, index) => {
    formData.append(`signers[${index}][user_id]`, signer.user_id);

    formData.append(`signers[${index}][role]`, signer.role);

    formData.append(`signers[${index}][is_seal]`, 0);

    formData.append(`signers[${index}][page_number]`, signer.page);

    formData.append(`signers[${index}][x_position]`, signer.x);

    formData.append(`signers[${index}][y_position]`, signer.y);

    formData.append(`signers[${index}][width]`, signer.width);

    formData.append(`signers[${index}][height]`, signer.height);
  });

  return formData;
}
