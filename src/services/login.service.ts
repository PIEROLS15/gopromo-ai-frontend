type LoginPayload = {
  email: string;
  password: string;
};

export async function loginService(payload: LoginPayload) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 👈 MUY IMPORTANTE
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    // devolvemos exactamente el error del backend
    throw data;
  }

  return data;
}
