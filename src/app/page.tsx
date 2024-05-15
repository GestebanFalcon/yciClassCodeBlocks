"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  const user = "pull from auth";

  return (
    <main className="flex flex-col h-screen">
      <header className="">
        <h1 className="text-8xl mt-40 text-white text-center text-xl font-bold">
          Welcome to CodeYCI
        </h1>
      </header>

      <div id="button containers" className="flex flex-row gap-x-10 mt-5">
        <Link
          key="Get Started"
          href="/blocklydoc"
          className="bg-emerald-400 px-9 py-2 rounded-xl"
        >
          + Create New Project
        </Link>
      </div>
    </main>
  );
}
