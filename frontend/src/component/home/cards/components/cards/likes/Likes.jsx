import {useState, useEffect} from 'react'
import {Form, RenderLike} from "../../../../homeConfig"

const Likes = ({token, setToken, openModal, likedData, setLikeAPI, likeAPI, liked}) => {

    return (
        <>
            {!token? 
                <Form {...{setToken}}/> 
                : <RenderLike {...{likedData, openModal, setLikeAPI, token, likeAPI, liked}}/>
            }
        </>
    )
}

export default Likes