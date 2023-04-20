export const registerData = async function (
  fullName,
  email,
  pass,
  passConfirm
) {
  const res = await fetch("/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: fullName,
      email,
      password: pass,
      passwordConfirm: passConfirm,
    }),
  });

  const data = await res.json();
  return data;
};
