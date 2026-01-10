import React from 'react'

const SelectImage = ({characterImages,imageIndex,setImageIndex}) => {
    return (
        <div className="flex flex-col md:flex-row items-end justify-between gap-4 mt-5">
            <div className="flex gap-4 overflow-x-auto pb-4 w-full md:w-auto">
                {characterImages.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setImageIndex(i)}
                        className={`cursor-pointer relative min-w-[80px] h-24 md:w-20 md:h-28 rounded-lg overflow-hidden  ${
                        imageIndex === i ? 'bg-neutral-600 ' : "hover:bg-neutral-800"}`}
                    >
                        <img 
                            src={`/assets/images/eren/${img}`}
                            alt="selection"
                            className="w-full h-full object-contain"
                        />
                    </button>
                
                ))}
            </div>
            
        </div>
    )
}

export default SelectImage