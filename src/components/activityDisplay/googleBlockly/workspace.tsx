"use client";
// // Import Blockly core.
// import * as Blockly from 'blockly/core';
// // Import the default blocks.
// import * as libraryBlocks from 'blockly/blocks';
// // Import a generator.
// import {javascriptGenerator} from 'blockly/javascript';
// // Import a message file.
// import * as En from 'blockly/msg/en';

import { useBlocklyWorkspace } from "react-blockly";
import { useEffect, useRef } from "react";
import { toolbox } from "./toolbox";

export function Workspace() {
  const workspaceRef = useRef(null);

  const { workspace, xml } = useBlocklyWorkspace({
    ref: workspaceRef,
    toolboxConfiguration: toolbox,
    workspaceConfiguration: {},
  });

  return (
    <div ref={workspaceRef} id="workspaceDiv" className=" h-full w-3/4"></div>
  );
}
