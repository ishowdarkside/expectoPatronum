export const uploadPost = async (formData) => {
  const res = await axios({
    method: "POST",
    url: "/api/posts",
    data: formData,
  });

  return res;
};

export const followUser = async function (identifier) {
  const res = await fetch(`/api/users/followUser/${identifier}`);
  const data = await res.json();
  return data;
};
