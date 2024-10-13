"use client"
// // Import Blockly core.
import * as Blockly from 'blockly';
// // Import the default blocks.
// import * as libraryBlocks from 'blockly/blocks';
// // Import a generator.
// import {javascriptGenerator} from 'blockly/javascript';
// // Import a message file.
// import * as En from 'blockly/msg/en';

import { ToolboxDefinition, useBlocklyWorkspace } from "react-blockly";
import { useEffect, useRef } from "react";


export function Workspace({ toolbox }: { toolbox: ToolboxDefinition }) {

  const workspaceRef = useRef(null)

  const { workspace, xml } = useBlocklyWorkspace({
    ref: workspaceRef,
    toolboxConfiguration: toolbox,
    workspaceConfiguration: {}
  })

  return (
    <div className=' h-full w-full '>
      <div ref={workspaceRef} id='workspaceDiv' className=" h-full w-full">


      </div>
    </div>
  )
}