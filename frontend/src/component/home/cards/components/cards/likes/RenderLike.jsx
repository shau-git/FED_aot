import {useRef} from 'react'
import { Container, Characters } from "../../../../homeConfig"


// token, likedCard, openModal, handleResourceClick, dataMap
const RenderLike = ({likedData, openModal, setLikeAPI, token, likeAPI, liked}) => {

    const key = useRef()
  
    return (
        <div className="flex flex-col items-center justify-start">
            <div className="">
                <h3 className="text-2xl font-bold uppercase text-red-700">{likedData ? `Likes Data (${likedData.length} total)`: "No Likes"}</h3>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-6 px-4 py-15">
                { 
                    likedData ? 
                        (likedData.map((item, i) => (
                            <Container data={item} key={`${key}-${i}`}  handleClick={() => openModal(item, "characters")} token={token} setLikeAPI={setLikeAPI}  liked={liked}>
                                <Characters/>
                            </Container>
                        ))) : null
                }
            </div>
        </div>
    )
}

export default RenderLike