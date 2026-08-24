"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <main className="grid min-h-[60vh] place-items-center px-5 text-center">
      <div>
        <p className="font-display text-4xl text-leaf-dark">Mode accès direct</p>
        <p className="mt-2 text-sm text-muted">La gestion des mots de passe est désactivée.</p>
      </div>
    </main>
  );
}
