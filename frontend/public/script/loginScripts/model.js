export const loginUser = async function (email, password) {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();
  return data;
};
