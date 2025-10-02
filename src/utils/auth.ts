// utils/auth.ts
export function getAccessToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;
}

export async function validateAccessToken(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate-access-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function refreshAccessToken() {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include", // ✅ send cookies automatically
    });

    if (!res.ok) return null;
    const data = await res.json();

    // only accessToken is returned in JSON
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch {
    return null;
  }
}
