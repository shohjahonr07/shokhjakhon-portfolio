"use client";

import * as React from "react";

export function ObsidianBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(900px_circle_at_20%_10%,rgba(16,185,129,0.22),transparent_45%),radial-gradient(700px_circle_at_90%_30%,rgba(16,185,129,0.16),transparent_50%),radial-gradient(800px_circle_at_30%_90%,rgba(16,185,129,0.10),transparent_45%)]" />

      <div className="absolute left-1/2 top-[-18rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-glow/20 blur-3xl" />
      <div className="absolute right-[-10rem] top-[6rem] h-[26rem] w-[26rem] rounded-full bg-glow/10 blur-2xl" />

      {/* Subtle grid to feel "tooling/obsidian" */}
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(16,185,129,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Grain (fast CSS dots instead of heavy SVG data URL) */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(16,185,129,0.55)_1px,transparent_1px)] [background-size:4px_4px] mix-blend-overlay" />
    </div>
  );
}

