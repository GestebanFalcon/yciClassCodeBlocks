export default function CardHolder({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center w-full p-8">
            {children}
        </div>
    )
}