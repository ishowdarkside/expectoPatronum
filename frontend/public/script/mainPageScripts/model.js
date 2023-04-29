export const likePost = async function (identifier) {
  const res = await fetch(`/api/postOperations/likePost/${identifier}`);
  const data = await res.json();
  return data;
};
