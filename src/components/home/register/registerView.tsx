"use client";

import RegisterTabs from "@/components/home/register/registerTabs";

export default function RegisterView() {
  return (
    <section
      className="
        w-full
        max-w-lg
        bg-card
        border
        border-border
        rounded-2xl
        shadow-lg
        p-8
      "
    >
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">Únete a GoPromo AI</h1>
        <p className="text-muted-foreground text-sm">
          Elige tu tipo de cuenta y comienza tu experiencia
        </p>
      </header>

      <RegisterTabs />
    </section>
  );
}
