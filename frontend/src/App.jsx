import { useState , useRef, useEffect} from 'react'
import {Home} from "./component/home/homeConfig"
import { SongModal, songData } from './component/home/song/song_config';
import {GetStarted} from './component/get_started/get_started_config';

function App() {

    const [currentPage, setCurrentPage] = useState(() => {
        // Load from localStorage on first render
        try {
        return localStorage.getItem('currentPage') || "GetStarted";
        } catch {
        return "GetStarted";
        }
    })

    // Save to localStorage whenever currentPage changes
    useEffect(() => {
        try {
        localStorage.setItem('currentPage', currentPage);
        } catch (e) {
        console.log('localStorage not available');
        }
    }, [currentPage]);

    const [openSongModal, setOpenSongModal] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(new Audio()); // Creates the audio object
    const currentSong = currentSongIndex !== null ? songData[currentSongIndex] : null;

    
    useEffect(() => {
        audioRef.current.volume = 0.2; // Set default volume once on load
    }, []);


    // Update audio source only when a valid index is selected
    useEffect(() => {
        if (currentSongIndex === null) return; // Exit if no song is selected
        const audio = audioRef.current;
        audio.pause();
        audio.src = `./src/assets/audio/songs/${currentSong.file_name}`;
        audio.load();
        
        if (isPlaying) {
            audio.play().catch(error => console.log("Playback failed:", error));
        }
    }, [currentSongIndex]);

    // To sync the progress bar (input range) with current playing song
    useEffect(() => {
        const audio = audioRef.current;

        //const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        //audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        // If the song ends, move to the next one 
        const handleNextSong = () => {
            setCurrentSongIndex((prevIndex) => {
                // If it's the last song, return 0 to loop back to the first
                if (prevIndex === songData.length - 1) {
                    return 0;
                }
                // Otherwise, move to the next index
                return prevIndex + 1;
            });
        };
        audio.addEventListener('ended', handleNextSong);

        return () => {
            //audio.pause();
            //audio.src = ""; // This completely kills the current audio stream
            //audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleNextSong);
        };
    }, []);

    const closeSongModal = () => {
        setOpenSongModal(false)
    }
    
    return (
        <main >
            {currentPage === "GetStarted" && <GetStarted {...{setCurrentPage}}/>}

            {currentPage === "Home" && <Home {...{setOpenSongModal,setCurrentPage }}/>}

            {
                openSongModal && <SongModal {...{closeSongModal, openSongModal, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex, duration, setDuration,  audioRef, currentSong}}/>
            } 
        </main>
	);
}


export default App
