import {useState, useRef, useEffect} from 'react'
import {motion} from "framer-motion"
import { RxCross2 } from 'react-icons/rx';
import { FaPlay, FaStepForward, FaStepBackward, FaVolumeUp } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { songData, WaveringVisualizer } from './song_config';
import {useIsMobile} from "../homeConfig"

const SongModal = ({closeSongModal, openSongModal, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex, duration,  audioRef, currentSong}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoverFooter, setHoverFooter] = useState(false)
    const [localVolume, setLocalVolume] = useState(audioRef.current.volume);
    const [localTime, setLocalTime] = useState(audioRef.current.currentTime);

    useEffect(() => {
        const audio = audioRef.current;
        const syncTime = () => setLocalTime(audio.currentTime);

        audio.addEventListener('timeupdate', syncTime);
        return () => audio.removeEventListener('timeupdate', syncTime);
    }, [audioRef]);


    const isMobile = useIsMobile()
    
    
    useEffect(() => {
        if (openSongModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openSongModal]);

    // Handle Play/Pause toggle
    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    /*Function that updates the audio.currentTime based on the slider's value 
    to let the user skip to a specific part of the song by dragging the slider 
    */
    const handleProgressChange = (e) => {
        const val = Number(e.target.value);
        setLocalTime(val); // Update local UI
        audioRef.current.currentTime = val; // Update actual music
    };

    // Helper function to format seconds into MM:SS
    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Calculate progress percentage for the green fill
    const progressPercentage = (localTime / duration) * 100 || 0;


    return (
        <motion.div
            className={`${openSongModal?"z-100": "-z-100"} fixed inset-0 bg-[url(./src/assets/images/wallpapers/Song.jpg)]  md:overflow-x-hidden
            min-h-screen bg-no-repeat bg-center bg-cover overflow-hidden flex items-center justify-center w-full
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ cursor: "url('./src/assets/images/cursor/Mikasa__cursor.png'), auto" }}
        >
            <motion.div
                className={`
                    bg-black/70  border 
                    border-white/25  mx-auto  max-w-6xl rounded-3xl  
                    w-full ${isMobile?"h-screen p-1": "max-h-[90vh] p-10"}  text-white  
                    relative flex justify-center items-center `}
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    className="absolute top-2 left-3 text-white hover:text-[#22c55e] transition-colors z-10 cursor-pointer"
                    onClick={closeSongModal}
                >
                    <RxCross2 className="w-8 h-8" />
                </button>

                <div className="relative flex flex-col h-[80vh] w-full">
                        
                    {/* CENTER: Playlist Content */}
                    <main className="flex-1 overflow-y-auto p-6 md:p-12 pb-32">
                        <header className="mb-8">
                            <h1 className={`text-2xl font-black tracking-tighter uppercase italic`}>Attack on Titan OST</h1>
                            <p className="text-white/50 text-s">Playlist • {songData.length} Songs</p>
                        </header>

                        <div className="text-xs">
                            {songData.map((song,i) => {
                                const {id, song_name, artist, length, thumbnail} = song
                                const isCurrentSong = currentSongIndex === i;
                                
                                const renderIcon = (i) => {
                                    const isThisSongSelected = currentSongIndex === i;
                                    
                                    if (hoveredIndex === i) {
                                        if (isThisSongSelected) {
                                            if(isPlaying) {
                                                return <FaPause className="text-green-500" />;
                                            }
                                            return <FaPlay className="text-green-500" />;
                                        }

                                        return <FaPlay className={isThisSongSelected ? "text-green-500" : "text-white"} />;
                                    } else if (isPlaying && isThisSongSelected) {
                                        return <WaveringVisualizer/>
                                    }
                                    return <span className={isThisSongSelected ? "text-green-500" : "text-white/40"}>{i + 1}</span>;
                                };

                                return (
                                    <motion.div 
                                        key={i}
                                        whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                                        className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer group relative text-[13px]"
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        onClick={() => {
                                            if (isCurrentSong) {
                                                togglePlay(); // Play/Pause if clicking current song
                                            } else {
                                                setCurrentSongIndex(i);
                                                setIsPlaying(true); // Switch to new song and play
                                            }
                                        }}
                                    >
                                        <span 
                                            className="text-white/40 w-5 flex justify-center "
                                            >
                                            {renderIcon(i)}   
                                        </span>
                                        <img 
                                            src={`./src/assets/images/songs/${thumbnail}`}
                                            className="w-11 h-11 rounded shadow-lg object-cover"
                                            />
                                        <div className="flex-1">
                                        <p className={`font-bold ${(currentSongIndex===i) && "text-[#22c55e]"} text-[14px]`}>{song_name}</p>
                                        <p className="text-white/50">{artist}</p>
                                        </div>
                                        <span className="text-white/40">{length}</span>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </main>
                </div>
            </motion.div>
            {currentSong && 
                <footer 
                    className={`
                        shrink-0 h-24 bg-black/80 backdrop-blur-xl border-t
                        border-white/10 px-4 flex items-center justify-between z-50 
                        absolute left-0 right-0 bottom-0 
                        `}
                >
                    {/* BOTTOM: Player Bar */}
                    {/* Currently Playing Info */}
                    
                    <div className={`flex items-center gap-4 ${isMobile?"w-2/3" :"w-1/3"} overflow-hidden`}>
                        <img src={`./src/assets/images/songs/${currentSong.thumbnail}`} className="w-14 h-14 rounded shadow-lg object-cover" alt="Cover" />
                        <div className=''>
                            {hoverFooter &&
                                <div className="text-[16px] text-white absolute -top-2 bg-gray-700 rounded-md p-1 flex items-center justify-center">
                                    <p>{currentSong.song_name}</p>
                                </div>
                            }
                            <p 
                                className="font-bold text-[16px] truncate cursor-pointer text-[#22c55e]"
                                onMouseEnter={() => setHoverFooter(true)}
                                onMouseLeave={() => setHoverFooter(false)}
                            >
                                {   isMobile ?
                                    (currentSong.song_name.length <= 13? 
                                        currentSong.song_name 
                                    :   currentSong.song_name.slice(0,13).trimEnd() + '...')
                                    : currentSong.song_name
                                }
                                
                            </p>
                            <p className="text-[14px] text-white/50">{currentSong.artist}</p>
                        </div>
                    </div>

                    {/* Controls & Progress */}
                    <div className="flex flex-col items-center w-1/3 gap-2">
                        <div className="flex items-center gap-6 text-xl cursor-pointer">
                            <button 
                                className="text-white/60 hover:text-white transition-colors"
                                onClick={() => setCurrentSongIndex((prev) => (prev > 0 ? prev - 1 : songData.length - 1))}
                                >
                                <FaStepBackward />
                            </button>
                            <button 
                                className="bg-white text-black p-3 rounded-full hover:scale-105 transition-transform"
                                onClick={togglePlay}
                                >
                                {isPlaying  ? <FaPause /> : <FaPlay />}
                                </button>
                            <button 
                                className="text-white/60 hover:text-white transition-colors"
                                onClick={() => setCurrentSongIndex((prev) => (prev + 1) % songData.length)}
                                >
                                <FaStepForward />
                            </button>
                        </div>
                        
                        {/* Song Range Slider*/}
                        <div className={`${isMobile && "absolute left-2 right-2 bottom-1"}`}>
                            <div className={`flex items-center gap-2 w-full max-w-md `}>
                                <span className="text-[11px] text-white/40">{formatTime(localTime)}</span>
                                <input 
                                    type="range" 
                                    min="0"
                                    max={duration || 0}
                                    value={localTime}
                                    onChange={handleProgressChange}
                                    style={{
                                        background: `linear-gradient(to right, #22c55e ${progressPercentage}%, rgba(255, 255, 255, 0.2) ${progressPercentage}%)`,
                                    }}
                                    className="cursor-pointer flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white" 
                                />
                                <span className="text-[11px] text-white/40">{currentSong.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Volume Control */}
                    {!isMobile && <div className="flex items-center justify-end gap-3 w-1/3">
                        <FaVolumeUp className="text-white/40" />
                        <input 
                            type="range" 
                            className="w-24 h-1 accent-white appearance-none cursor-pointer rounded-lg" 
                            min="0"
                            max="1"
                            step="0.01"
                            value={localVolume}
                            onChange={(e) => {
                                console.log(e)
                                const val = Number(e.target.value);
                                setLocalVolume(val);
                                audioRef.current.volume = val; // Updates the sound in real-time
                            }}
                            style={{
                                background: `linear-gradient(to right, #22c55e ${localVolume * 100}%, rgba(255, 255, 255, 0.2) ${localVolume * 100}%)`,
                            }}/>
                    </div>
                    }
                </footer>
            }
        </motion.div>
    )
}

export default SongModal