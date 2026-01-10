import { FaMusic } from "react-icons/fa";
import {useState, useRef, useEffect} from "react"

const Audio = ({data}) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const audioRef = useRef(null);

    const selectTrack = (index) => {
        setCurrentTrackIndex(index);
        // Use a small timeout to ensure the src has changed before playing
        setTimeout(() => {
            audioRef.current.play();
        }, 50);
    };

    return (
        <>
            {/* TRACK SELECTION MENU */}
            <div className="w-full mb-8 ">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-sans font-bold mb-4">Select audio</p>
                <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
                    {data.audio.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {selectTrack(idx);}}
                            className={`flex items-center gap-4 p-3 rounded-lg border transition-all cursor-pointer ${
                                currentTrackIndex === idx 
                                ? 'bg-white/10 border-white/40 translate-x-2' 
                                : 'bg-transparent border-white/5 hover:border-white/20'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentTrackIndex === idx ? 'bg-amber-600' : 'bg-white/5'}`}>
                                <FaMusic  size={14} />
                            </div>
                            <span className={`text-xs uppercase tracking-widest ${currentTrackIndex === idx ? 'text-white' : 'text-neutral-500'}`}>
                                {`SPEECH ${idx + 1}`}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Hidden Audio Element */}
            <audio 
                ref={audioRef} 
                src={`./src/assets/audio/GetStarted/${data.audio[currentTrackIndex]}`} 
                    
            />
        </>
    )
}

export default Audio