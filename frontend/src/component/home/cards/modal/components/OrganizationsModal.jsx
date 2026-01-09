import {fixImage, Accordion} from "../../../homeConfig"
import { FaBriefcase } from "react-icons/fa";
import { GiCharacter } from "react-icons/gi";
import { BiMoviePlay } from "react-icons/bi";

const OrganizationsModal = ({data}) => {
  const {id, name, img, occupations, notable_members, affiliation, debut} = data
  return (
    <>
      	<div className="flex flex-col md:flex-row gap-4 items-start ">
			{/*organization image */}
			<img
				src={fixImage(img)}
				alt="Episode Image"
				className={`${[3,4,10,15].includes(id)?"h-[175px]":"w-80"} md:block object-cover rounded-lg shrink-0`}
			/>

			<div className="flex-1">
				{/*organization name */}
				<h1 className="text-lg md:text-2xl font-bold leading-tight">
				{name}
				</h1>
				
				{/*Affiliation */}
				<div className="mt-3 space-y-1 text-sm text-white">
					<p><span className="text-white/60 mr-2">Affiliation:</span> {affiliation}</p>
				</div>
			</div>
		</div>

		{/*occupations */}
		{	
			occupations?.length > 0 && 
			<div className="mt-6">
				<Accordion title={"occupation"} content={occupations}>
					<FaBriefcase />
				</Accordion>
			</div>
		}

		{/*notable_members */}
		{
			notable_members?.length > 0 &&
				<div className="mt-6">
				<Accordion title="Notable Members" content={notable_members} render="characters">
					<GiCharacter/>
				</Accordion>
			</div>
		}

		{/*debut */}
		<div className="mt-6">
			<Accordion title={"debut"} content={debut} render="episode">
				<BiMoviePlay />
			</Accordion>
		</div>
		
    </>
  )
}

export default OrganizationsModal