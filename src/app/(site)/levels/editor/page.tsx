"use client"
import { Suspense } from "react";
import Display from "./display";

export default function Editor() {




    return (
        <>
            <Suspense>
                <Display />
            </Suspense>
        </>
    )
}