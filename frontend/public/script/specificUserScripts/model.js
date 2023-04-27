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
