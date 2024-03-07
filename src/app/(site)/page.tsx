"use client"
import ClassBar from "@/components/maker/classBar/classBar";
import { useState } from "react";

export default function Home() {
  //test
  const [jawn, setJawn] = useState({name: 'person', attributes: [{name: 'height', value: 'short'}, {name: 'hair', value: 'brown'}], methods: []});

  return (
    <>
      <ClassBar gameClass={jawn} setGameClass={setJawn}/>
    </>
  );
}
