export const getCurrUserPosts = async function () {
  const res = await fetch("/api/posts");
  const data = await res.json();
  return data;
};

export const getSinglePost = async function (identifier) {
  const res = await fetch(`/api/posts/${identifier}`);
  const data = await res.json();
  return data;
};

export const deleteSinglePost = async function (identifier) {
  try {
    const res = await fetch(`/api/posts/${identifier}`, {
      method: "DELETE",
    });

    return "Post deleted successfully!";
  } catch (err) {
    throw new Error(err);
  }
};

//commenting
export const postComment = async function (inputData, identifier) {
  const res = await fetch(`/api/postOperations/createComment/${identifier}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: inputData,
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
