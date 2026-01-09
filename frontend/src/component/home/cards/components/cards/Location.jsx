import {ReadMoreButton, fixImage} from "../../../homeConfig"

const Location = ({data, handleClick}) => {
    const {id, name, img, territory, region} = data
    return (
        <>
            {/*show the location name */}
            <p className="text-start  text-lg leading-5 cursor-pointer text-white mb-1">{id}.{name}</p>

            {/*image */}
            <img 
                src={fixImage(img)} alt={name}      
                className="w-[300px] h-[168px] rounded-lg mb-3"
            />

            {/*territory, region */}
            <div className="flex items-center justify-between gap-3">
                <div className="text-start  text-lg leading-5 cursor-pointer text-white flex flex-wrap max-w-[190px]">{territory} -  {region}</div>
                <ReadMoreButton handleClick={handleClick} resource="locations" i={id-1}/>
            </div>        
        </>
    )
}

export default Location