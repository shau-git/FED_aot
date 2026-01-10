import {useState, useEffect} from 'react'
import {motion} from "framer-motion"
import Quote from "./components/Quote"

const RandomQuote = () => {
    const [shouldFetch, setShouldFetch] = useState(true)
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true)
            setError(null); // Clear previous errors
            const response = await fetch("https://aot-api.vercel.app/quote")
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData({...result});
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
        
    }


    if(shouldFetch) {
        fetchData()
        setShouldFetch(prev => !prev);
    }

    //<Quote data={data}/>
    return (
        <div className="absolute -bottom-50 sm:-bottom-30 md:-bottom-16">
            <div className="relative z-10 py-9 px-8 w-full max-w-7xl mx-auto">
                {isLoading? 
                    (<p>Loading ...</p>

                        ) : (
                            error? (
                                <p className="text-red-500 mt-4">{error}!</p> 
                        )  : (<Quote data={data}/>

                        )
                    )}

                <button 
                    onClick={() => setShouldFetch(prev => !prev)}
                    className="h-10 py-2 px-4 flex items-center transition-all cursor-pointer
                bg-black/40 border border-amber-500/50 
                hover:bg-amber-400/20 hover:shadow-xl hover:shadow-amber-500/70 active:bg-[rgba(255,255,255,0.25)]">Random Quote</button>
            </div>
        </div>
        
    )
}

export default RandomQuote