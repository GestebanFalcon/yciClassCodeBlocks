"use client"
import ClassBar from "@/components/maker/classBar/classBar";
import { useState } from "react";

export default function Home() {
  const [jawn, setJawn] = useState({name: 'goonGaming', attributes: [{name: 'girth', value: 'wide'}, {name: 'length', value: 'short'}], methods: []});

  return (
    <>
      <ClassBar gameClass={jawn} setGameClass={setJawn}/>
    </>
  );
}
