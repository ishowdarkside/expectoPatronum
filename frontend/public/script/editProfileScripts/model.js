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
    console.log(err);
    throw new Error(`${err.response.data.message}`);
  }
};

/*
export const updateInfo = async (name, email) => {
  const res = await fetch("/api/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      name,
    }),
  });

  const data = await res.json();
  return data;
};
*/
