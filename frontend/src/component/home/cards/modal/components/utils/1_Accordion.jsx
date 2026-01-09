import {useState, useId} from 'react'
import {fixImage, getStatusColor, titansImgCard} from "../../../../homeConfig"
import { TbPoint } from "react-icons/tb";
import { BiMoviePlay } from "react-icons/bi";

const Accordion = ({title, content, children, render="default", bullet=true}) => {
    const [isActive, setIsActive] = useState(true)
    return (
        <div className="px-3 py-3 rounded-xl backdrop-blur-md border border-white/20  text-white/90">
            <div className="flex justify-between" onClick={() => setIsActive(!isActive)}>
                <div className="text-gray-400 text-sm uppercase flex items-center gap-x-2">
                    <div>{children}</div> {/*react icon */}
                    {title}
                </div>
                <p className="font-[24px] cursor-pointer">{isActive? "-": "+"}</p>
            </div>

            {isActive &&
            <div>
                <hr className="border-white/20 my-2" />
                {render==="relative" && <Relative relatives={content}/>}
                {render==="groups" && <Groups groups={content}  bullet={true}/>}
                {render==="characters" && <Characters characters={content}/>}
                {render==="episode" && <Episode data={content}/>}
                {render==="current_inheritor" && <CurrentInheritors titans={content}/>}
                {render==="former_inheritors" && <FormerInheritors titans={content}/>}
                {render==="default"&& <Default content={content} bullet={bullet}/>}
            </div>
            }
        </div>
    )
}

const Default = ({content, bullet}) => {
    const data = Array.isArray(content)? content : [content]
    const key = useId()
    return (
        <>
            <ul>
            {data.map((data,i) => (
                <li key={`${key}-${i}`}>
                    {bullet && <TbPoint className="inline"/>}
                    {data}
                </li>
                ))}
            </ul>
        </>
    )
}

// use in CharacterModal
const Groups = ({groups}) => {
    const group = groups[0]
    return (
        <>
            <div className="mb-1 font-sans">
                {group["name"]}
            </div>
            {/* */}
            {group.sub_groups.length > 0 && (
                <Default content={group.sub_groups}  bullet={true}/>
            )}
        </>
    )
}


// use in Character Modal only
const AccordionEp = ({episodes}) => {
    const key = useId()
    return (<div className="overflow-hidden pt-3 pb-5 mt-4 lg:mt-0 rounded-lg backdrop-blur-md border border-white/20  text-white/90 min-h-[500px] lg:h-full lg:max-h-[80vh]">
        <div className="flex items-center mb-4 ml-3">
            <BiMoviePlay />
            <h2 className="text-gray-400 text-md uppercase font-semibold tracking-wide ml-2">
                Episodes - {episodes.length}
            </h2>
        </div>
        <div className="max-h-[650px] overflow-y-scroll px-4">
            {episodes.map((ep, i) => {
            return ( 
                <Episode data={ep} key={`${key}-${i}`}/>
                )
            })}
        </div>
    </div>)
}

// use in LocationModal, OrganizationModal
const Episode = ({data}) => {
    const {id, img, name, episode} = data
    if (typeof data === "string") return <div>{data}</div>
    return ( 
        <div className="overflow-hidden mb-6 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg md:w-[330px] ">
            <div className="relative">
                {/*image */}
                <img
                src={fixImage(img)}
                alt="Episode"
                className="w-full h-40 object-cover"
                />
                {/*episode */}
                <span className="absolute top-2 left-2 text-xs bg-black/40 px-2 py-1 rounded">{episode}</span>
            </div>
            
            {/*episode name */}
            <div className="p-4">
                <h3 className="font-medium text-sm">
                    {id}) {name}
                </h3>
            </div>
        </div>)
}

// use in CharacterModal
const Relative = ({relatives}) => {
    return (
        <>
            {/*family name */}
            <div className="mb-6 font-sans">{relatives[0]["family"]}</div>
            {relatives[0]["members"].map((relative, i) => {

                let {img, name, status} = relative
                const key = useId()

                {/*setting the color for the status */}
                let colors;
                if(typeof relative === "object") {
                    const nameParts = name.split(' ');
                    if(nameParts[1] && nameParts[1].toLowerCase() === "jaeger") {
                        status = 'Deceased'
                    }
                    colors = getStatusColor(status)
                }
                
                {/*name for each family member */}
                return (
                    <div key={`${key}-${i}`} className="flex items-center gap-3 mb-3">
                        <TbPoint className="mt-2" />
                        <div className="flex items-center gap-3 p-3 rounded-xl backdrop-blur-md border border-white/20 w-full">
                            {typeof relative === 'object' ? (
                                <>
                                    {/*image */}
                                    <img
                                        src={fixImage(img)}
                                        alt={name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className=" flex items-center justify-between w-full">
                                        {/*relative name */}
                                        <p className="text-sm font-medium truncate">{name}</p>
                                        {/*relative status */}
                                        <div className="flex items-center justify-end">
                                            <div className={`bg-black/50 flex items-center justify-cneter gap-1 rounded-lg px-3 ${colors.text}`}>
                                                <div className={`w-2 h-2 rounded-full ${colors.bg}`}></div>
                                                <div>{status}</div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-sm">{relative}</div>
                            )}
                        </div>
                    </div>
                )}
            )}
        </>
    )
}

// use in LocationModal, OrganizationModal
const Characters = ({characters}) => {
    const key = useId()
    return (
        <div className="flex gap-4  flex-wrap">
        {
            characters.map((c,i) => {
                const {img, name=c} = c
                return (
                <div className="shrink-0 w-20 text-center" key={`${key}-${i}`}>
                    {/*image */}
                    <img
                        src={fixImage(img)}
                        className="w-20 h-20 rounded-full object-cover border border-white/30"
                    />
                    {/*name */}
                    <p className="text-xs mt-2">{name}</p>
                </div>)
            })
        }
    </div>
    )
}



const CurrentInheritors = ({titans}) => {

   const titan = titans[0]
    let {id, img, name} = titan

    // human form image
    img = fixImage(img)

    // get the image url
    let titanFormImg = fixImage(titans[1])

    // change the titan form image
    if(id === 89 || titans[2]) {
        titanFormImg = `./src/assets/images/titans/profile/${titansImgCard[id]}`
    } 

    return (
        <Titans {...{img, titanFormImg, name}}/>
    )

}

// use in TitanModal
const FormerInheritors = ({titans}) => {
    // get the image url
    const titanUrlImg = titans[titans.length-1]

    // remove the image url
    const updatedTitan = titans.filter(titan => (
        typeof titan !== "string"
    ))

    const key = useId()

    return (
        <div className="flex gap-6 flex-wrap">
        {
            updatedTitan.map((titan,i) => {
                let {id, img, name} = titan

                img = fixImage(img)
                let titanFormImg = `./src/assets/images/titans/profile/${titansImgCard[id]}`

                if([1, 91,118].includes(id)) {
                    titanFormImg = fixImage(titanUrlImg)
                } 

                return (
                    <Titans {...{img, titanFormImg, name}} key={`${key}-${i}`}/>
                )
            })
        }
    </div>
    )
}


const Titans = ({img, titanFormImg, name}) => {
    return (
        <div className="shrink-0 w-55 h-40 text-center relative" >
            {/*human image */}
            <img
                src={img}
                className="w-35 h-35 rounded-full object-cover border border-amber-300"
            />

            {/*titan form image */}
            <img 
                src={titanFormImg}
                className='w-27 h-27 object-cover absolute top-6 right-0 rounded-full border border-amber-300'
            />
            {/*human name */}
            <p className="mt-2 text-xs font-medium">
                {name}
            </p>
        </div>
    )
}
export {Accordion, AccordionEp}