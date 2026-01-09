import {fixImage, episodeSypnosis, Accordion} from "../../../homeConfig"
import { HiDocumentText } from "react-icons/hi";
import { GiCharacter } from "react-icons/gi";

const EpisodesModel = ({data}) => {
    const {id, name, img, episode, characters} = data
    
    return (
      	<>
			<div className="flex flex-col md:flex-row gap-4 items-start ">
				{/*Image */}
				<img
					src={fixImage(img)}
					alt="Episode Image"
					className="w-80 md:block object-cover rounded-lg shrink-0"
				/>

				<div className="flex-1">
					{/*episode and season */}
					<span className="inline-block text-xs bg-blue-500/30 px-2 py-1 rounded-md mb-2">
					{episode}
					</span>

					{/*episode namw */}
					<h1 className="text-lg md:text-2xl font-bold leading-tight">
					{name}
					</h1>

					{/*episode and season */}
					<div className="mt-3 space-y-1 text-sm text-white/80">
						<p><span className="text-white/60">Season:</span> {episode[1]}</p>
						<p><span className="text-white/60">Episode:</span> {id}</p>
					</div>
				</div>
			</div>

			{/*Sypnosis */}
			<div className="mt-6">
				<Accordion title="Sypnosis" content={episodeSypnosis[id-1].split('\n')} bullet={false}>
					<HiDocumentText/>
				</Accordion>
			</div>

			{/*characters */}
			<div className="mt-8">
				<Accordion title="Characters" content={characters} render="characters">
					<GiCharacter/>
				</Accordion>
			</div>
      </>
    )
}

export default EpisodesModel