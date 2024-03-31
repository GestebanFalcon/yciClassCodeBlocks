// 3 section view
"use client"
import { useEffect, useRef, useState } from 'react';
import { ResizableBox, ResizableProps } from 'react-resizable';

export default function Display() {
    const [toolWidth, setToolWidth] = useState(300);
    const toolBorderRef: any = useRef(null);
    const toolRef: any = useRef(null)
    
    

    const onMouseDown = (event: MouseEvent) => {
    };

    const onMouseMove = (event: MouseEvent) => {

    };

    const onMouseUp = (event: MouseEvent) => {
        
    };

    useEffect(() => {
        let xCord = 0;
        xCord = toolBorderRef.current.style.left;

        addEventListener('mousedown', onMouseDown);
    }, [])

    return(
        <div className=" flex h-full flex-row" id="activityDisplayContainer">
            <div className='absolute h-full bg-green-500' style={{width: toolWidth}}>
                <div id="toolboxContainer" className='absolute h-full w-full p-4'>
                    {/* <Toolbox/> */}
                    
                </div>
                  {/* border */}
                <div ref={toolBorderRef} className='absolute z-20 w-2 bg-black h-full hover:cursor-ew-resize' style={{ left: toolWidth - 4}}></div>
            </div>

            <div className="p-4 absolute w-1/3 h-full bg-red-500" style={{ left: toolWidth}}>
                <button>workspace</button>
            </div>

            {/* <div className="absolute w-1/3 h-full bg-blue-500">

            </div> */}
        </div>
    )

}