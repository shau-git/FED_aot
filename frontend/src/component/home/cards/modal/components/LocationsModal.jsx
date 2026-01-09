import {fixImage, Accordion} from "../../../homeConfig"
import { BiMoviePlay } from "react-icons/bi";
import { GiCharacter } from "react-icons/gi";

const LocationsModal = ({data}) => {
    const {
        name, 
        img, 
        territory, 
        region, 
        notable_inhabitants, 
        debut} = data
        
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 items-start ">
				{/*location image */}
                <img
					src={fixImage(img)}
					alt="Episode Image"
					className="w-80 md:block object-cover rounded-lg shrink-0"
				/>

				<div className="flex-1">
                    {/*location name */}
					<h1 className="text-lg md:text-2xl font-bold leading-tight">
					{name}
					</h1>

                    {/*Territory,  Region*/}
					<div className="mt-3 space-y-1 text-sm text-white">
						<p><span className="text-white/60 mr-2">Territory:</span> {territory}</p>
						<p><span className="text-white/60 mr-2">Region:</span>  {region}</p>
                    </div>
				</div>
			</div>

            {/*debut */}
            <div className="mt-6">
				<Accordion title={"debut"} content={debut} render="episode">
                    <BiMoviePlay />
                </Accordion>
			</div>

            {/*notable_inhabitants */}
            {
                notable_inhabitants && notable_inhabitants.length > 0 &&
                 <div className="mt-6">
                    <Accordion title="Notable Inhabitants" content={notable_inhabitants} render="characters">
                        <GiCharacter/>
                    </Accordion>
                </div>
            }
           

        </>
    )
}

export default LocationsModal