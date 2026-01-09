import {useState, useRef, useEffect} from 'react'
import { AnimatePresence } from 'framer-motion';
import {Hero, Alert, Cards, Modal, PullDown} from "./homeConfig"
import {FloatingBubble} from "./song/song_config"

const Home = ({setOpenSongModal, setCurrentPage}) => {
    
    // Scroll to top every time Home mounts
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []); // Empty deps = runs once on mount

    
    const [selectedItem, setSelectedItem] = useState(null)  // data for the individual card
    const [selectedResource, setSelectedResource] = useState(null) // titans, characters, locations, organizations

    const [alert, setAlert] = useState({show: false, called: false})
    const alertTimeoutRef = useRef(null) 

    const showAlert = () => {
        if(!alert.called) {
            setAlert({show: true, called: false})
            
            // Clear existing timeout
            if(alertTimeoutRef.current) {
                clearTimeout(alertTimeoutRef.current)
            }
            
            // Set new timeout
            alertTimeoutRef.current = setTimeout(() => {
                setAlert({show: false, called: true})
            }, 3000)
        }
    }

    const closeAlert = () => {
        // Clear timeout when manually closed
        if(alertTimeoutRef.current) {
            clearTimeout(alertTimeoutRef.current)
        }
        setAlert({show: false, called: true})
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if(alertTimeoutRef.current) {
                clearTimeout(alertTimeoutRef.current)
            }
        }
    }, [])

    
    const openModal = (data, resource) => {
        setSelectedItem(data)
        setSelectedResource(resource)
    }

    const closeModal = () => {
        setSelectedItem(null)
        setSelectedResource(null)
    }
    
    return (
        <div 
            className="relative  bg-black text-white overflow-hidden"
            initial={{ scale: 0.8, y: 50 }}
				animate={{ scale: 1, y: 0 }}
				exit={{ scale: 0.8, y: 50 }}
                transition={{ duration: 0.5 }}
        >
            
            {/* Pull-down handle */}
           <PullDown {...{setCurrentPage}}/>

            <div onDoubleClick={() => setOpenSongModal(true)}>
                <FloatingBubble />
            </div> 
            
            {/*alert bar*/}
            <AnimatePresence mode="wait">
                {alert.show && <Alert closeAlert={closeAlert}/>}
            </AnimatePresence>

            {/* Hero Section */}
            <Hero showAlert={showAlert}/>


            {/* Cards Scction */}
            <Cards openModal={openModal}/>

            {/* Model Scction, to show the detail of the card */}
            <Modal 
                isOpen={!!selectedItem} 
                onClose={closeModal} 
                data={selectedItem}
                resource={selectedResource}
            />
        </div>
    )
}

export default Home
