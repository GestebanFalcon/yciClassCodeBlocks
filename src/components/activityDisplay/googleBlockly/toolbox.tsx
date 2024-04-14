"use client"
// Import Blockly core.
import * as Blockly from 'blockly/core';
// Import the default blocks.
import * as libraryBlocks from 'blockly/blocks';
// Import a generator.
import {javascriptGenerator} from 'blockly/javascript';
// Import a message file.
import * as En from 'blockly/msg/en';
import { useEffect } from 'react';



export default function Toolbox() {

    // const toolbox = {
    //     // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
    //     kind: 'flyoutToolbox',
    //     // The contents is the blocks and other items that exist in your toolbox.
    //     contents: [
    //       {
    //         kind: 'block',
    //         type: 'controls_if'
    //       },
    //       {
    //         kind: 'block',
    //         type: 'controls_whileUntil'
    //       }
    //       // You can add more blocks to this array.
    //     ]
    //   };
      
    //   // The toolbox gets passed to the configuration struct during injection.
    //   useEffect(() => {
    //     const workspace = Blockly.inject('toolboxContent', {toolbox: toolbox});
    //   }, []);
      
      

    return (
    <div id="toolboxContent">

    </div>
    )
}