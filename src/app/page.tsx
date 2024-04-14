"use client";
import ClassBar from "@/components/maker/classBar/classBar";
import Display from "@/components/activityDisplay/display";
import { useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  const [jawn, setJawn] = useState({
    name: "goonGaming",
    attributes: [
      { name: "girth", value: "wide" },
      { name: "length", value: "short" },
    ],
    methods: [],
  });

  return (
    <>
      <ClassBar gameClass={jawn} setGameClass={setJawn} />
    </>
  );
}
