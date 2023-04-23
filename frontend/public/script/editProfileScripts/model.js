export const updateInfo = async (formData) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/users/me",
      data: formData,
    });

    //const data = await res.json();
    return res;
  } catch (err) {
    throw new Error(`${err.response.data.message}`);
  }
};

export const updatePassword = async (
  currentPassword,
  newPassword,
  newPasswordConfirm
) => {
  try {
    const res = await fetch("/api/users/changePassword", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        newPasswordConfirm,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
