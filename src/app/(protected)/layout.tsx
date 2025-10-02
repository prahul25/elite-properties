"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAccessToken, validateAccessToken, refreshAccessToken } from "@/utils/auth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      let token = getAccessToken();

      if (!token) {
        router.replace("/broker/login"); // not logged in
        return;
      }

      const valid = await validateAccessToken(token);
      if (!valid) {
        token = await refreshAccessToken();
        if (!token) {
          localStorage.clear();
          router.replace("/broker/login"); // invalid even after refresh
          return;
        }
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Checking authentication...
      </div>
    );
  }

  return <>{children}</>;
}
