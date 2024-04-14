"use client";
import ClassBar from "@/components/maker/classBar/classBar";
import Display from "@/components/activityDisplay/display";
import { useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col h-screen">
        <header className="content-center bg-gray-100 p-4 flex items-center justify-between">
          <h1 className="text-center text-xl font-bold">{user}'s Projects:</h1>
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
    </div>
  );
}
