import { CiLocationOn } from "react-icons/ci";
import { GiFamilyHouse } from "react-icons/gi";
import { FaUser ,FaTag} from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { fixImage, getStatusColor, Accordion, AccordionEp } from '../../../homeConfig'
import {useId} from "react"

const CharacterModel = ({data}) => {
    let { 
        id,
        name, 
        img, 
        alias,
        species,
        gender,
        age, 
        height,
        relatives,
        birthplace,
        residence,
        status, 
        occupation,
        groups,
        roles,
        episodes
    } = data
    
    const key = useId()

    const nameParts = name.split(' ');
    if(nameParts[1] && nameParts[1].toLowerCase() === "jaeger") {
        status = 'Deceased'
    }

    const colors = getStatusColor(status)

    const infoCards = [
        { label: 'Height', value: height },
        { label: 'Occupation', value: occupation },
    ].filter(item => item.value); // Only show items that have values

    return (
        <>
            {/*Hero Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <img 
                    src={fixImage(img)} 
                    alt={name}
                    className="w-auto h-50 object-cover rounded-lg"
                />
                {/*Character Info*/}
                <div className="w-full">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-2">{name}</h1>
                    <p className="mt-1 text-sm text-white/80">
                        <span className={`${colors.text}`}>· {status}</span> 
                        {" · "}{gender.toLowerCase() !== "unknown" ? gender :"Unknown Gender"}
                        {" · "}{age !== "unknown"? age : "Unkown Age"}
                    </p>

                    {/*Tags */}
                    <div className="mt-2 flex flex-wrap gap-2 ">
                        {species.map((species, i) => {
                            return <span className="px-3 py-1 rounded-full backdrop-blur-md border border-white/20 text-sm text-white/90" key={`${key}-${i}-${species}`}>{species}</span>
                        })}
                    </div>
                    {/*height, occupation */}
                    <div className="flex items-center gap-x-2 mt-5">
                        {infoCards.map((item,i) => {
                            return (
                                <div 
                                    key={`${key}-${i}-${item}`}
                                    className="rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 px-2 py-2 w-[100px] h-[100px]"
                                >
                                    <p className="text-xs uppercase tracking-wide text-white/60">
                                        {item.label}
                                    </p>
                                    <p className="mt-1 text-sm">
                                        {Array.isArray(item.value) ? item.value.join(', ') : item.value}
                                    </p>
                                </div>)
                            })
                        }
                    </div>
                    
                </div>
            </div>
            
            {/*Birthplace Residence, roles, relative, episodes*/}
            <div className="mt-10 flex justify-between flex-wrap">
                <div className="space-y-4 w-full lg:w-[60%]">
                
                    {/*Alias*/}
                    {
                        alias && alias.length > 0 &&
                            <Accordion title={"Alias"} content={alias}>
                                <FaTag />
                            </Accordion>
                    }
                    

                    {/*Birthplace*/}
                    <Accordion title={"Birthplace"} content={birthplace}>
                        <CiLocationOn/>
                    </Accordion>

                    {/*Residence*/}
                    <Accordion title={"Residence"} content={residence}>
                        <GiFamilyHouse/>
                    </Accordion>

                    {/*Roles */}
                    <Accordion title={"Roles"} content={roles}>
                        <FaUser/>
                    </Accordion>

                    {/*groups */}
                    {groups && groups.length > 0 &&
                        (<Accordion title={"Groups"} content={groups} render="groups">
                            <HiOutlineUserGroup/>
                        </Accordion>)
                    }
                    
                    {/*relatives */}
                    {relatives && relatives.length > 0 && (
                        <Accordion title={"Relatives"} content={relatives} render="relative">
                            <MdFamilyRestroom />
                        </Accordion>
                    )}
                </div>

                {/*episodes*/}
                {
                    (episodes && episodes.length > 0) && 
                    <AccordionEp episodes={episodes}/>
                }
            </div>
        </> 
    )
}

export default CharacterModel