import { GiLightningDissipation } from "react-icons/gi";
import { FaSitemap, FaUser  } from "react-icons/fa";
import {fixImage, Accordion} from "../../../homeConfig"
import {useId} from "react"

const TitansModel = ({data}) => {
    let {
        id, 
        name,
        img,
        height,
        abilities,
        current_inheritor, 
        former_inheritors,
        allegiance
    } = data

    const key = useId()

    const infoCards = [
        { label: 'Height', value: height },
        { label: 'Allegiance', value: allegiance },
    ].filter(item => item.value);

    // if use push here the value will be pushed twice, because every time the component renders. React re-renders components, so each render pushes img again.
    // push image url
    former_inheritors = [...former_inheritors, img]
    current_inheritor = [current_inheritor, img]
    if(id === 3) {
        current_inheritor = [...current_inheritor, "WarHammer"]
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/*Titans img */}
                <img 
                    src={fixImage(img)} 
                    alt={name}
                    className="w-auto h-50 object-cover rounded-lg"
                />
                
                {/*Titans Info*/}
                <div className="w-full">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-2">{name}</h1>
        
                    {/*height, occupation */}
                    <div className="flex items-center gap-x-2 mt-5">
                        {infoCards.map((item, i) => { 
                            return (
                                <div 
                                    key={`${key}-${i}`}
                                    className="flex flex-col justify-between rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 px-2 py-2 w-[100px] h-[70px]"
                                >
                                    <p className="text-xs uppercase tracking-wide text-white/60">
                                        {item.label}
                                    </p>
                                    <p className="mt-1 text-sm">
                                        {Array.isArray(item.value) ? item.value.join(', ') : item.value}
                                    </p>
                                </div>
                                )
                            })
                        }
                    </div>
                    
                </div>
            </div>

            <div className="mt-10 flex justify-between flex-wrap">
                <div className="space-y-4 w-full lg:w-[60%]">

                    {/*titans abilities */}
                    <Accordion title={"Abilities"} content={abilities}>
                        <GiLightningDissipation />
                    </Accordion>

                    {/*former_inheritors */}
                    <Accordion title={"Current Inheritors"} content={current_inheritor} render="current_inheritor">
                        <FaUser/>
                    </Accordion>

                    {/*former_inheritors */}
                    {former_inheritors.length > 1 && 
                        <Accordion title={"Former Inheritors"} content={former_inheritors} render="former_inheritors">
                            <FaSitemap />
                        </Accordion>
                    }
                    
                </div>
            </div>
        </>
        
    )
}

export default TitansModel