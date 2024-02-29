interface attribute {
    name: string,
    value: string
}

export default function classBar({gameClass, setGameClass}: {gameClass: any, setGameClass: any}) {
    
    const updateAttributes = (e: React.ChangeEvent<HTMLInputElement>, attribute: attribute) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        setGameClass((prev: any) => {
            const otherAttributes = prev.attributes.filter((eachAttribute: any) => eachAttribute.name !== attribute); 
            return ({...prev, attributes: [otherAttributes, ]})
        })
    }


    return(
        <div className="min-h-screen w-1/6 flex flex-col bg-slate-600 border-2 border-slate-400 p-4">
            <h1>{`Class name: ${gameClass.name}`}</h1>
            <ul className=" bg-slate-500 w-full ">
                {gameClass.attributes.map((attribute: attribute) => (
                    <li><span>{`${attribute.name}:`}<input name={attribute.name} value={attribute.value} onChange={(e) => updateAttributes(e, attribute)}></input></span></li>
                ))}
            </ul>
        </div>
    )
}