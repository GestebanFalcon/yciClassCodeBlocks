// 3 section view
"use client";
import { useEffect, useRef, useState } from "react";
import { Workspace } from "./googleBlockly/workspace";
import Toolbox from "./googleBlockly/toolbox";

export default function Display() {
  const [toolWidth, setToolWidth] = useState(300);
  const toolBorderRef: any = useRef(null);
  const toolRef: any = useRef(null);

  const onMouseDown = (event: MouseEvent) => {};

  const onMouseMove = (event: MouseEvent) => {};

  const onMouseUp = (event: MouseEvent) => {};

  useEffect(() => {
    // let xCord = 0;
    // xCord = toolBorderRef.current.style.left;
    // addEventListener('mousedown', onMouseDown);
  }, []);

  return (
    <div className=" flex h-full flex-row" id="activityDisplayContainer">
      <div className="p-4 absolute w-2/3 h-full" style={{ left: 0 }}>
        <Workspace />
      </div>

      {/* <div className="absolute w-1/3 h-full bg-blue-500">

            </div> */}
    </div>
  );
}
