export async function apiGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API GET failed");
  return res.json();
}

export async function apiPost(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("API POST failed");
  return res.json();
}
