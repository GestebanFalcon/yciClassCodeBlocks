"use client";
import ClassBar from "@/components/maker/classBar/classBar";
import Display from "@/components/activityDisplay/display";
import { useState } from "react";

// Import Blockly core.
import * as Blockly from "blockly/core";
// Import the default blocks.
import * as libraryBlocks from "blockly/blocks";
// Import a generator.
import { javascriptGenerator } from "blockly/javascript";
// Import a message file.
import * as En from "blockly/msg/en";

export default function Home() {
  //test
  // const [jawn, setJawn] = useState({name: 'person', attributes: [{name: 'height', value: 'short'}, {name: 'hair', value: 'brown'}], methods: []});

  return (
    <>
      {/* <ClassBar gameClass={jawn} setGameClass={setJawn}/> */}
      <Display />
    </>
  );
}
