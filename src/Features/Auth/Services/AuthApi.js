export const loginRequest = async (credentials) => {
  //   const response = await fetch("/api/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(credentials),
  //   });

  //   if (!response.ok) {
  //     throw new Error("فشل تسجيل الدخول");
  //   }

  return {
    token: "dtryghuj",
    user: {
      id: 1,
      name: "Ahmad",
      role: "office_admin",
      office_id: 5,
    },
  };
};
