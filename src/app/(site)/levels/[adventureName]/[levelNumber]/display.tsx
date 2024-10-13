"use client"

import Interpreter from "js-interpreter";
import { useBlocklyWorkspace } from "react-blockly";
import * as Blockly from "blockly"
import { javascriptGenerator } from "blockly/javascript";
import GameDisplay from "@/components/activityDisplay/gameDisplay/gameDisplay";
import { Workspace } from "@/components/activityDisplay/googleBlockly/workspace";
import { useEffect, useState, useRef } from "react";
import { Application } from "pixi.js";
import Level from "@/lib/game/level";
import { Direction } from "@/lib/game/entity";

export default function Display({ levelNumber, adventureName }: { levelNumber: number, adventureName: string }) {
    const [isComplete, setIsComplete] = useState(false);

    const workspaceRef = useRef(null);

    const app = new Application();
    const [level, setLevel] = useState(new Level(levelNumber, app, setIsComplete));

    Blockly.Blocks['move_right'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Move Right");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(160);
            this.setTooltip("This block runs a custom script.");
            this.setHelpUrl("");
        }
    }

    javascriptGenerator.forBlock['move_right'] = function (block: Blockly.Block, generator: Blockly.Generator) {
        const code = `moveRight();`;
        return code
    }


    const toolbox = {
        // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
        kind: 'flyoutToolbox',
        // The contents is the blocks and other items that exist in your toolbox.
        contents: [
            {
                kind: 'block',
                type: 'controls_if'
            },
            {
                kind: 'block',
                type: 'controls_whileUntil'
            },
            {
                kind: 'block',
                type: 'move_right'
            }
            // You can add more blocks to this array.
        ]
    };

    const { workspace, xml } = useBlocklyWorkspace({
        ref: workspaceRef,
        toolboxConfiguration: toolbox,
        workspaceConfiguration: {}
    });

    useEffect(() => {

        const pixiInit = async () => {

            await app.init({ width: 390, height: 390 })
            document.getElementById("stageDiv")?.appendChild(app.canvas);


            await level.init();


        }

        pixiInit();

    }, [])

    const initApi = (interpreter: any, globalObject: any) => {
        var wrapper = function moveRight() {
            return (level.mainCharacter.move("right"));
        }
        interpreter.setProperty(globalObject, 'moveRight',
            interpreter.createNativeFunction(wrapper));

    }

    const runCode = () => {
        const code = javascriptGenerator.workspaceToCode(workspace);
        const myInterpreter = new Interpreter(code, initApi);
        function nextStep() {
            if (myInterpreter.step()) {
                setTimeout(nextStep, 10);
            }
        }
        nextStep();

        // eval(code);


    }
    return (<div id="levelsContainer" className="flex flex-row h-full">
        <div id="displayContainerBig" className=" p-8 bg-gray-300">
            <div id="displayContainerLittle" className=" w-full h-full">
                <div id="stageDiv">

                </div>
                <button onClick={runCode}>Run</button> <button onClick={() => setIsComplete(!isComplete)}>Reload {isComplete && (<>true</>)} </button>
            </div>
        </div>

        <div id="blocklyContainer" className=" flex-grow bg-gray-400">
            <div className=' h-full w-full '>
                <div ref={workspaceRef} id='workspaceDiv' className=" h-full w-full">


                </div>
            </div>
        </div>

    </div>)
}