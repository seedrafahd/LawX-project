export const validateLawyerForm = (form) => {
  const errors = {};

  if (form.national_id?.length < 10) {
    errors.national_id = "يجب أن يكون الرقم الوطني 10 أرقام على الأقل";
  }

  if (form.full_name?.length < 6) {
    errors.full_name = "يجب أن يكون الاسم الكامل 6 محارف على الأقل";
  }

  if (form.father_name?.length < 3) {
    errors.father_name = "يجب أن يكون اسم الأب 3 محارف على الأقل";
  }

  if (form.mother_name?.length < 3) {
    errors.mother_name = "يجب أن يكون اسم الأم 3 محارف على الأقل";
  }

  if (form.mother_family_name?.length < 3) {
    errors.mother_family_name = "جب أن يكون اسم عائلة الأم 3 محارف على الأقل";
  }

  if (form.birth_place?.length < 3) {
    errors.birth_place = "جب أن يكون مكان الميلاد 3 محارف على الأقل";
  }

  if (!form.birth_date) {
    errors.birth_date = "قم بتحديد تاريخ الميلاد";
  } else {
    const age = Math.floor(
      (new Date() - new Date(form.birth_date)) / (365.25 * 24 * 60 * 60 * 1000),
    );
    if (age < 21) {
      errors.birth_date = "يجب ألا يقل عمر المحامي عن 21 سنة";
    }
  }

  if (form.civil_registry_number?.length < 3) {
    errors.civil_registry_number =
      "يجب أن يكون رقم السجل المدني 3 محارف على الأقل";
  }

  if (form.syndicate_card_number?.length < 5) {
    errors.syndicate_card_number =
      "يجب أن يكون رقم بطاقة النقابة 5 محارف على الأقل";
  }

  if (form.syndicate_branch?.length < 3) {
    errors.syndicate_branch = "يجب أن يكون فرع النقابة 3 محارف على الأقل";
  }

  if (!form.lawyer_state?.trim()) {
    errors.lawyer_state = "حدد نوع المحامي";
  }

  return errors;
};
