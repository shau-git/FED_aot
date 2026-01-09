import {episodeNumImg, fixImage} from "../../../homeConfig"

const Episodes = ({data, handleClick}) => {
    const {id, name, img, episode} = data
    return (
        <>
            {/*Image*/}
            <img 
                src={fixImage(img)} alt={name}      
                className="w-[300px] h-[168px] rounded-lg mb-3"
            />

            {/*Episode number image, Epsiode name, episode */}
            <div className="flex items-top gap-3">
                <img 
                    src={episodeNumImg[Number(id)-1]}
                    className="w-12 h-11 rounded-full shrink-0 object-cover"
                />
                <div>
                    <p className="text-start  text-lg leading-5 cursor-pointer hover:text-orange-500 active:text-orange-300" onClick={handleClick}>{name}</p>
                    <p className="text-gray-500">{episode}</p>
                </div>
            </div>    
        </>
    )
}

export default Episodes