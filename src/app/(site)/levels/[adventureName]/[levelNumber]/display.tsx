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


    const workspaceRef = useRef(null);

    const [isComplete, setIsComplete] = useState(false);
    const app = new Application();
    const [level, setLevel] = useState(new Level(levelNumber, app, setIsComplete, [5, 5], "move02"));

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
    Blockly.Blocks['move_left'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Move Left");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(160);
            this.setTooltip("This block runs a custom script.");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks['move_up'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Move Up");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(160);
            this.setTooltip("This block runs a custom script.");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks['move_down'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Move Down");
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
    javascriptGenerator.forBlock['move_left'] = function (block: Blockly.Block, generator: Blockly.Generator) {
        const code = `moveLeft();`;
        return code
    }
    javascriptGenerator.forBlock['move_up'] = function (block: Blockly.Block, generator: Blockly.Generator) {
        const code = `moveUp();`;
        return code
    }
    javascriptGenerator.forBlock['move_down'] = function (block: Blockly.Block, generator: Blockly.Generator) {
        const code = `moveDown();`;
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
            },
            {
                kind: 'block',
                type: 'move_left',
            },
            {
                kind: 'block',
                type: 'move_up'
            },
            {
                kind: 'block',
                type: 'move_down'
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

            // await app.init({ width: 390, height: 390 })
            // document.getElementById("stageDiv")?.appendChild(app.canvas);

            const res = await fetch(`/api/getLevel/${levelNumber}`);
            const body = await res.json();
            const { levelJSON } = body;
            console.log(body);
            console.log(levelJSON);
            if (levelJSON) {
                const newLevel = Level.fromJSON({ ...levelJSON, setIsComplete });
                console.log(newLevel);
                setLevel(newLevel);
            }


            await level.init();
            await level.reset();


        }

        pixiInit();

    }, [])

    const initApi = (interpreter: any, globalObject: any) => {
        var wrapper = function moveRight() {
            return (level.move("right"));
        }
        interpreter.setProperty(globalObject, 'moveRight', interpreter.createNativeFunction(wrapper));

        wrapper = function moveLeft() {
            return (level.move("left"));
        }
        interpreter.setProperty(globalObject, 'moveLeft', interpreter.createNativeFunction(wrapper));

        wrapper = function moveUp() {
            return (level.move("up"));
        }
        interpreter.setProperty(globalObject, 'moveUp', interpreter.createNativeFunction(wrapper));

        wrapper = function moveDown() {
            return (level.move("down"));
        }
        interpreter.setProperty(globalObject, 'moveDown', interpreter.createNativeFunction(wrapper));
    }

    const runCode = () => {
        console.log(level);
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
        {isComplete && (
            <div className=" absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center text-white text-4xl font-bold">
                <div className=" bg-yellow-200 rounded-lg px-16 py-8 opacity-100 border-gray-900 border-2 flex flex-col items-middle justify-center">
                    Level 1 Complete!
                    <p>gold</p>
                    <div className=" w-12 h-2 bg-black"></div>

                </div>
            </div>
        )}
        <div id="displayContainerBig" className=" p-8 bg-gray-300">
            <div id="displayContainerLittle" className=" w-full h-full">
                <div id="stageDiv">

                </div>
                <button onClick={runCode}>Run</button> <button onClick={async () => {
                    await level.reset();
                }}>Reload {isComplete && (<>true</>)} </button>
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