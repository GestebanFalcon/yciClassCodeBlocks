import Navbar from "@/components/navigation/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div id="infoLayoout" className=" flex flex-col h-screen bg-gradient-to-r from-cyan-300 to-blue-300">

            <Navbar />
            <main className="">
                {children}
            </main>
        </div>
    )
}