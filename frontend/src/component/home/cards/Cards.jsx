import {useState, useRef, memo, useEffect} from "react"
import {
    useResourceFetcher, 
    CardButtons, 
    ResourceContent, 
    InputBar, 
    DropDownButton,
    Titans,
} from "../homeConfig"

const Cards = ({openModal}) => {
    const { 
            dataMap, 
            loading, 
            error, 
            activeResource, 
            handleResourceClick,
            setActiveResource,
            API_LINKS // Links used to map the buttons
    } = useResourceFetcher();

    
    let filteredData = {...dataMap}

    const [query, setQuery] = useState('')
    const [dropdownValue, setDropdownValue] = useState("")
    const inputRef = useRef(null)
    const contentRef = useRef(null)
    const scrollPositions = useRef({}) // Store scroll positions for each resource

    const [token, setToken] = useState(localStorage.getItem('token'))


    // get the query value
    const handleInput = event => {
        setQuery(event.target.value)
    }

    // get the dropdown button value
    const handleDropDown = (e) => {
        setDropdownValue(e.target.value)
    }

    // for filtering the name for ( characters, locations, organizations)
    if (query && filteredData[activeResource]) {
        filteredData[activeResource] = filteredData[activeResource].filter(data => (
                data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
            )
        )
    }

    // use for filter the dropdown input for episodes only
    if (dropdownValue && filteredData["episodes"]) {
        filteredData["episodes"] = filteredData["episodes"].filter(data => {
            return data["episode"].toUpperCase().indexOf(dropdownValue.toUpperCase()) !== -1
        })
    }


    
    // when clicking the CiSearch icon, focus the input bar
    const focusInput = () => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
    } 

    // to clear input query when clicking RxCross2 icon
    const clearQuery = () =>  setQuery('')

    // Add scroll to top function
    const scrollToTop = () => {
        if(contentRef.current) {
            contentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            // Update stored position for current resource
            scrollPositions.current[activeResource] = 0
        }
    }

    // Save scroll position when scrolling
    const handleScroll = () => {
        if(contentRef.current) {
            scrollPositions.current[activeResource] = contentRef.current.scrollTop
        }
    }

    // Restore scroll position when activeResource changes
    useEffect(() => {
        if(contentRef.current) {
            const savedPosition = scrollPositions.current[activeResource] || 0
            contentRef.current.scrollTop = savedPosition
        }
    }, [activeResource])


    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };



    return (
        <main className="font-netflix relative mt-40" style={{ cursor: "url('./src/assets/images/cursor/Levi__cursor.png'), auto" }}>  
            {/* Titans Card */}
            <Titans {...{ dataMap, loading, error, openModal }}/>
           
            {/* Included Stories Section */}
            <section className="bg-black z-50 sticky top-0  py-6 border-t border-b border-gray-800 mt-5 ">
                <div className="max-w-7xl mx-auto px-8 md:px-12">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">
                        INCLUDED STORIES
                    </p>
                    {/* <CardButtons {...{ loading , activeResource, handleResourceClick, API_LINKS, clearQuery, scrollToTop}}/> */}
                    <CardButtons {...{ loading , activeResource, handleResourceClick, API_LINKS, clearQuery, scrollToTop, setActiveResource}}/>
                </div>
            </section>

            {/* Compatible Hardware Section (Placeholder) */}
            <section 
                ref={contentRef}
                onScroll={handleScroll}
                className="bg-black py-4 l z-10 h-[calc(100vh-128px)] overflow-y-scroll">

                <div className="max-w-7xl mx-auto px-8 md:px-12 text-white">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 ml-3">
                        {activeResource} :
                    </p>

                    <div className="relative inline-block">
                        {/* activeResource.toLowerCase() !== "episodes" ? 
                            (
                                <InputBar 
                                    query={query} 
                                    handleInput={handleInput} 
                                    inputRef={inputRef} 
                                    focusInput={focusInput} 
                                    clearQuery={clearQuery}
                                />
                           ) : (
                                <DropDownButton handleDropDown={handleDropDown}/>
                            )
                        */}

                       {activeResource.toLowerCase() === "episodes" ? (
                            <DropDownButton handleDropDown={handleDropDown} />
                        ) : activeResource.toLowerCase() === "likes" ? (
                            token && <button 
                                        onClick={() => handleLogout()} 
                                        className="h-10 py-2 px-4 flex items-center transition-all cursor-pointer text-gray-200
                                                bg-purple-500/50 
                                                hover:bg-purple-300/50 active:bg-[rgba(255,255,255,0.25)]"
                                    >
                                        Log out
                                    </button>
                        ) : (
                            <InputBar
                                query={query}
                                handleInput={handleInput}
                                inputRef={inputRef}
                                focusInput={focusInput}
                                clearQuery={clearQuery}
                            />
                        )}
                    </div>
                </div>
                {/* <ResourceContent {...{filteredData, loading, error, activeResource, openModal}}/> */}
                <ResourceContent {...{filteredData, loading, error, activeResource, openModal, token, setToken, dataMap}}/>
            </section>

        </main>
    )
}

export default memo(Cards)