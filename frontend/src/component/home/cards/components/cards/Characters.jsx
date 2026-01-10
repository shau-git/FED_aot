import {motion} from "framer-motion"
import {ReadMoreButton, fixImage, getStatusColor, addLike, deleteLike} from "../../../homeConfig"

const Characters = ({data, handleClick, token, setLikeAPI, liked}) => {
    let {id, name, img, age, residence, occupation, status} = data

    // to set the jaeger brothers to Deceased
    const nameParts = name.split(' ');
    if(nameParts[1] && nameParts[1].toLowerCase() === "jaeger") {
        status = 'Deceased'
    }

    const colors = getStatusColor(status)

   

    const handleClickLike = async() => {
        let latest; 
        if(liked[id]) {
            latest = await deleteLike(id, token)
        } else {
            latest = await addLike(id, token)
        }
        setLikeAPI({total: latest.total, results: latest.results})
    }
 
    return (
        <>
            {/*Status & name */}
            <div className="flex items-center justify-end">
                <div className={`bg-black/50 flex items-center justify-cneter gap-1 rounded-lg px-3 ${colors.text}`}>
                    <div className={`w-2 h-2 rounded-full ${colors.bg}`}></div>
                    <div>{status}</div>
                </div>
            </div>
            <h1 className="text-start text-white text-2xl py-3">{id}. {name}</h1>
            

            {/* 
                image section

                Note: if you use key={index} when rendering 
                <Container data={item} key={index} index={index} handleClick={handleClick}>
                    <Characters/>
                </Container>

                1)With key={index}: When you filter, the first item gets key=0, second gets key=1, etc.         
                    i)React thinks "Oh, key=0 still exists, just reuse that component"
                    ii)The old component's state (motion.img's initial filter) doesn't reset
                    iii)The image effect breaks because React didn't remount the component, did not assign the deceased char black white image


                2)With key={item.id}: Each character has a unique, stable ID
                    i)When you filter, key="character-5" is different from key="character-2"
                    i)React properly unmounts old components and mounts new ones
                    i)The motion.img's initial prop runs correctly each time
            */}
            <motion.img 
                src={fixImage(img)} alt={name}   
                className=" h-[250px] w-[250px] cursor-pointer rounded-lg"
                initial={{ 
                    filter: status !== "Deceased" ? "grayscale(0%)" : "grayscale(100%)"
                }}
                whileHover={{ 
                    filter: "grayscale(0%)",
                    transition: {
                        duration: 0.5,
                        ease: "easeInOut"
                    }
                }}

            />

            {/*show the age, residence and occupaton of that character */}
            <div className="flex items-center justify-between h-[40%] px-2.5 mt-3 gap-4">
                <div className="flex flex-col items-center space-y-3">
                    <p className="font-bold">Age</p>
                    <p>{age}</p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                    <p className="font-bold">residence</p>
                    <p>{residence}</p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                    <p className="font-bold">occupation</p>
                    <p>{occupation}</p>
                </div>
            </div>

            {/*Like Button   activateLike   true*/} 
            <div className={`${token && "flex items-center justify-between pl-2"} mt-5`}>
                {
                    token && <button 
                                className="group transition-all duration-300 hover:scale-110 cursor-pointer"
                                onClick={handleClickLike}
                            >
                        <svg 
                            className={`w-6 h-6 transition-all duration-300 ${
                                (liked[id]) ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500'
                            }`} 
                            fill={(liked[id]) ? 'currentColor' : 'none'} 
                            stroke="currentColor" 
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                }

                 <ReadMoreButton handleClick={handleClick} char={true}/>
            </div>
        </>
    )
}

export default Characters