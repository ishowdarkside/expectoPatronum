export const acceptRequest = async function (identifier) {
  try {
    const res = await fetch(`/api/users/acceptRequest/${identifier}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const declineRequest = async function (identifier) {
  try {
    const res = await fetch(`/api/users/declineRequest/${identifier}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
