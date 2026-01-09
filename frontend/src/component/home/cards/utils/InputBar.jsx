import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const InputBar = ({inputRef, query, handleInput, focusInput, clearQuery}) => {
    return (
        <>
            <input className="bg-[rgba(0,0,0,0.5)] rounded-4xl border-2 border-white p-2 placeholder-white" placeholder='Search A Name' value={query} onChange={handleInput} ref={inputRef}/>
            <span className="absolute top-3 right-4 cursor-pointer hover:text-red-500 transition-colors">
                {query? 
                    <RxCross2 
                        onClick={clearQuery} 
                    /> 
                        : 
                    <CiSearch onClick={focusInput}/>
                }
            </span>
        </>
    )
}

export default InputBar
