"use client";

import dynamic from "next/dynamic";
import { ModeTransition } from "@/components/rpg/ModeTransition";

// Le jeu est strictement client (canvas, RAF, clavier) : pas de SSR.
const GameCanvas = dynamic(() => import("@/components/rpg/GameCanvas").then((m) => m.GameCanvas), {
  ssr: false,
  loading: () => <p className="text-ink-soft">Chargement du monde…</p>,
});

export default function RpgPage() {
  return (
    <main className="bg-bg flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <ModeTransition />
      <GameCanvas />
    </main>
  );
}
