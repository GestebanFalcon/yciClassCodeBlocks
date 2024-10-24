"use client"
import { ReactNode, SetStateAction, useCallback, useEffect, useState, MouseEvent } from "react"
import { Application, Assets, Sprite } from "pixi.js";
import Level from "@/lib/game/level";
import { useSearchParams } from "next/navigation";
import Structure from "@/lib/game/structure/structure";
import Entity from "@/lib/game/entity";
import Tile, { TileType } from "@/lib/game/tile";
import { Dispatch } from "react";
import Tree from "@/lib/game/structure/tree/tree";
import defaultGrassLarge from "@/public/defaultGrassLarge.png"

export default function Display() {

    const [mode, setMode] = useState<"tile" | "structure" | "entity">("tile");

    const [textures, setTextures] = useState({
        tile: 0,
        structure: 0,
        entity: 0

    })


    const tiles = ["https://i.postimg.cc/hjLY9wMh/default-Grass-Large.png"]
    const structures = ["https://i.postimg.cc/rmXbRc1v/johnathmald.png"]
    const entities = ["https://i.postimg.cc/rmXbRc1v/johnathmald.png"]

    const searchParams = useSearchParams();
    const levelNumber = searchParams.get('levelNumber');
    let newNumber;

    if (!levelNumber) {
        newNumber = 999;
    } else {

        try {
            newNumber = +levelNumber
        } catch (err) {
            newNumber = 999
        }

    }

    const [isComplete, setIsComplete] = useState(false);
    const app = new Application();
    const [level, setLevel] = useState(new Level(newNumber, app, setIsComplete, [5, 5], "move02"));

    const handleClick = useCallback(async (e: MouseEvent) => {
        console.log(mode);
        const stage = document.getElementById("stageDiv");
        if (!stage) {
            return;
        }
        const stageX = stage.getBoundingClientRect().x
        const stageY = stage.getBoundingClientRect().y

        const tileX = e.clientX - stageX
        const tileY = e.clientY - stageY
        if (!(0 <= tileX && tileX <= level.getDimensions()[1] * 60 && 0 <= tileY && tileY <= level.getDimensions()[0] * 60)) {
            return;
        }

        const coords: [number, number] = [Math.floor(tileY / 60), Math.floor(tileX / 60)];
        const currentTile = level.board.board[coords[0]][coords[1]];
        if (mode === "tile") {

            const newTile = new Tile({ textureURL: tiles[textures.tile], structure: currentTile.structure, entities: currentTile.getEntities(), board: level.board, type: TileType.GROUND });
            level.board.insertTile(coords[0], coords[1], newTile);
            console.log(coords);
            console.log(`x: ${tileX}, y: ${tileY}`);
            await newTile.render(coords[1] * 60, coords[0] * 60, app);
            // console.log(newTile)
            // await Assets.load(tiles[textures.tile]);
            // const sprite = Sprite.from(tiles[textures.tile]);
            // sprite.x = tileX;
            // sprite.y = tileY;
            // app.stage.addChild(sprite);
            // await currentTile.reRender(coords[0] * 60, coords[1] * 60, app)
        }
        if (mode === "structure") {
            currentTile.structure?.deRender();
            currentTile.structure = new Tree({ texture: structures[textures.structure], type: "mango" });
            console.log(currentTile);
            await currentTile.reRender();

        }
        if (mode === "entity") {
            currentTile.addEntity(new Entity({ board: level.board, app: level.app, texture: entities[textures.entity], startingCoords: coords, maxHealth: 30, me: false }));

        }
    }, [mode]);

    useEffect(() => {

        const pixiInit = async () => {

            // await app.init({ width: 390, height: 390 })
            // document.getElementById("stageDiv")?.appendChild(app.canvas);


            await level.init();
            console.log(level.board.board);


        }

        pixiInit();


    }, [])


    const saveLevel = async () => {
        console.log(levelNumber);
        const levelJSON = level.toJSON();
        console.log(levelJSON);
        // await fetch("/api/createLevel", { method: "POST", body: JSON.stringify({ levelJSON }) });
    }

    return (
        <div className="w-full h-full px-10">
            <div className="w-full h-full flex items-center justify-center bg-slate-600" onClick={(e) => handleClick(e)}>
                <div className="bg-gray-800 mx-10 my-20 flex-grow flex p-4">
                    <div className=" bg-gray-400 p-8 mr-auto">
                        <div id="stageDiv" className=""></div>
                    </div>


                    <div className="flex flex-col gap-5 items-center justify-center bg-gray-400 min-w-1 px-24">
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <ModeButton tmode="tile" setMode={setMode}>Tile</ModeButton>
                            <ModeButton tmode="structure" setMode={setMode}>Structure</ModeButton>
                            <ModeButton tmode="entity" setMode={setMode}>Entity</ModeButton>
                        </div>
                        <button onClick={saveLevel} className="mt-12 text-lg rounded-lg bg-yellow-300 font-bold text-slate-900 p-4">
                            Save
                        </button>
                    </div>


                    <div className="flex items-center justify-center ml-auto px-16 bg-gray-400">
                        <div className="flex flex-col gap-4 justify-center items-center">
                            {mode === "tile" && tiles.map((textureURL, index) => (
                                <Option onClick={() => setTextures({ ...textures, tile: index })} textureURL={textureURL}></Option>
                            ))}
                            {mode === "structure" && structures.map((textureURL, index) => (
                                <Option onClick={() => setTextures({ ...textures, structure: index })} textureURL={textureURL}></Option>
                            ))}
                            {mode === "entity" && entities.map((textureURL, index) => (
                                <Option onClick={() => setTextures({ ...textures, entity: index })} textureURL={textureURL}></Option>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ModeButton({ tmode, children, setMode }: { tmode: "tile" | "structure" | "entity", children: ReactNode, setMode: Dispatch<SetStateAction<"tile" | "structure" | "entity">> }) {
    return (
        <button
            className=" rounded-sm bg-yellow-200 font-semibold p-2 text-gray-900 hover:bg-yellow-100"
            onClick={() => {
                console.log(tmode);
                setMode(tmode);
            }}>
            {children}
        </button>
    )
}

function Option({ textureURL, onClick }: { textureURL: string, onClick: Function }) {



    return (
        <button onClick={() => { onClick() }} className=" p-2 ">
            <img src={textureURL} />
        </button>
    )
}

