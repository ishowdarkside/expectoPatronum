export const uploadPost = async (formData) => {
  const res = await axios({
    method: "POST",
    url: "/api/posts",
    data: formData,
  });

  return res;
};
