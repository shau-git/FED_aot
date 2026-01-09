import {Container, Characters, Episodes, Location, Organizations, LocationAdd, Likes, getLikes} from "../../../homeConfig"
import {useId, useState, useEffect} from "react"

const ResourceContent = ({ 
    filteredData, 
    loading, 
    error, 
    activeResource, 
    openModal, 
    token, setToken, dataMap
}) => {
    
    const key = useId()

    // the like_data got from the API
    const [likeAPI, setLikeAPI] = useState(null)
    //get the characters data if the char was liked by the user
    const [likedData, setLikedData] = useState(null)
    const [liked, setLiked] = useState({})


    const fetchLike = async () => {
        const data = await getLikes(token);
        setLikeAPI(data)
    };

    const saveLike = () => {
        if (likeAPI && likeAPI.total > 0) {
            const storageData = JSON.parse(localStorage.getItem("AOT_DATA_CACHE"))
            const likedObj = {}
            const likedCard = storageData["characters"]?.filter(char => {
                if (likeAPI.results.some(like => like.character_id === char.id)) {
                    likedObj[String(char.id)] = char
                    return true
                }
                return false
            })
            setLikedData(likedCard)
            setLiked(likedObj)
        }
    }


    useEffect(() => {
        if(token) {
           fetchLike()
        } else {
            setLikedData(null)
            setLikeAPI(null)
            setLiked({})
        }
    }, [token])


    useEffect(() => {
        if(!dataMap) {
            handleResourceClick("characters");
        } 

        saveLike()

    }, [likeAPI])

    
    if (loading) return <p className="text-amber-400">Loading {activeResource} data...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    
    
    const data = filteredData[activeResource];

    const handleClick = (item) => {
        openModal(item, activeResource) // Pass data and resource type
    }


    if (data && data.length > 0 && activeResource!=="likes") {
        return (
            <div className="flex flex-col items-center justify-start">
                {/*Display the total number of fetched data */}
                <div className="">
                    <h3 className="text-2xl font-bold uppercase text-red-700">{activeResource} Data ({data.length} total)</h3>
                </div>
                <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-6 px-4 py-15">
                    {/*additinal information for location */}
                    {activeResource === "locations" && <LocationAdd />}
                    {data.map((item, i) => {
                        if(activeResource === "characters") {
                            return (
                                // characters container will be using the size default by the browser
                                <Container data={item} key={item.id}  handleClick={() => handleClick(item)} token={token} liked={liked} setLikeAPI={setLikeAPI}>
                                    <Characters/>
                                </Container>
                            )
                        } else if (activeResource === "episodes") {
                            return (
                                <Container w="w-[370px]" h="h-[310px]"  data={item} key={`${key}-${i}`} handleClick={() => handleClick(item)}>
                                    <Episodes/>
                                </Container>
                            )
                        } else if (activeResource === "locations"){
                            return (
                                <Container w="w-[370px]" h="h-[320px]" data={item} key={`${key}-${i}`} handleClick={() => handleClick(item)}>
                                    <Location/>
                                </Container>
                            )
                        } else if (activeResource === "organizations") {
                            return (
                                <Container w="w-[340px]" h="h-[310px]" data={item} key={`${key}-${i}`} handleClick={() => handleClick(item)}>
                                    <Organizations />
                                </Container>
                            )
                        } else if(activeResource === "titans") {
                            return null
                        }
                    })}
                </div>
            </div>
        );
    } else if (activeResource === "likes") {
        // console.log(likeAPI)
        return <Likes {...{token, setToken,  openModal, dataMap, likedData, setLikeAPI,  liked}}/>
    }
    return <p className="text-gray-500">No data found for {activeResource}.</p>;
};

export default ResourceContent