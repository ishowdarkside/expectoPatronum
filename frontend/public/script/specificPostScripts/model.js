export const postComment = async function (formData) {
  const identifier = `${window.location.href}`.split("/").at(-1);
  const res = await fetch(`/api/postOperations/createComment/${identifier}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: formData.get("writeComment"),
    }),
  });

  const data = await res.json();
  return data;
};

export const deleteComment = async function (commentId, postId) {
  try {
    const res = await fetch(`/api/postOperations/${postId}/${commentId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (err) {}
};

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
