'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Jaise hi login page khulega, seedha admin portal par bhej do
    router.push("/admin-portal");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold">Redirecting to Admin Portal...</h2>
    </div>
  );
}
