export const likePost = async function (identifier) {
  const res = await fetch(`/api/postOperations/likePost/${identifier}`);
  const data = await res.json();
  return data;
};

export const followUser = async function (identifier) {
  const res = await fetch(`/api/users/followUser/${identifier}`);
  const data = await res.json();
  return data;
};
