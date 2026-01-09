import React from "react"
import {Characters} from "../../../homeConfig"

// container to wrap up each card component
const Container = ({w, h, data, children, handleClick, index, token=null, setLikeAPI=null, liked}) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-3 font-netflix ">
        <div 
            className={`relative flex flex-col items-cener justify-center backdrop-blur-[18px] rounded-3xl border border-white/25 shadow-[0_30px_60px_rgba(0,0,0,0.25)] p-8 ${w} ${h}`}
        >
            {React.Children.map(children, (child) => {
                const isCharacter = child.type === Characters;
                if(React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        data,
                        handleClick,
                        index,
                        // Append more props only if it is a Character component
                        ...(isCharacter && { token, setLikeAPI,  liked })
                    })
                }
            })}
        </div>
    </div>
    )
}

export default Container