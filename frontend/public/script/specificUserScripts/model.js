export const getPosts = async function () {
  //const res = await fetch('/api/posts/')
  const specificUser = window.location.pathname.substring(1).split("/")[1];
  const res = await fetch(`/api/posts/user/${specificUser}`);
  const data = await res.json();
  return data;
};

export const getSinglePost = async function (identifier) {
  const res = await fetch(`/api/posts/${identifier}`);
  const data = await res.json();
  return data;
};

export const followUser = async function () {
  try {
    const specificUser = window.location.pathname.substring(1).split("/")[1];
    const res = await fetch(`/api/users/followUser/${specificUser}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const likePost = async function (identifier) {
  const res = await fetch(`/api/postOperations/likePost/${identifier}`);
  const data = await res.json();
  return data;
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
