export async function fetchRegisterData() {
  const res = await fetch("http://localhost:8080/api/auth/register_data");

  if (!res.ok) {
    throw new Error("Failed to load register data");
  }

  return res.json();
}
