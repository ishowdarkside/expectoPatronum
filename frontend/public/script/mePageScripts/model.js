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
