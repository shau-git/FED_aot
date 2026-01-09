import {fixImage, ReadMoreButton} from "../../../homeConfig"

const Organizations = ({data, handleClick}) => {
    const {id, name, img} = data
    return (
        <>
            <p className="text-start  text-lg leading-5 cursor-pointer text-white mb-1">{id}.{name}</p>
          
                <img 
                src={fixImage(img)} alt={name}      
                className={`${[3,4,10,15].includes(id) && "w-[134px]"}  h-[168px] rounded-lg mb-3`}/>
    
            <ReadMoreButton handleClick={handleClick} resource="organizations" i={id-1}/>
            
        </>
    )
}

export default Organizations