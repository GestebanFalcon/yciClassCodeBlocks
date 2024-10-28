"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Review() {

    const [message, setMessage] = useState("")
    const router = useRouter();

    const handleReview = async () => {
        const review = await fetch("/api/createReview", {
            method: "POST",
            body: JSON.stringify({ message })
        });
        console.log(review);
        router.push("/info");
    }
    return (
        <div className="w-full p-12">
            <div className="bg-yellow-100 flex">
                <form onSubmit={handleReview}>
                    <h2>Leave a review:</h2>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
                    <button className="bg-gray-200 font-semibold text-slate-900" type="submit"></button>
                </form>
            </div>
        </div>
    )
}