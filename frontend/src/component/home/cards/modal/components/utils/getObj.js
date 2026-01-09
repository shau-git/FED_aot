import {extractIdFromUrl} from "../../../../homeConfig"

const getObj = (data, dataMap, resource) => {

    return ( data.map(d => {
        // 1. Check if it's already an object (already processed)
        if(typeof d !== 'string') return d

        let updatedData = d
        // 2. Process the URL string

        const id = extractIdFromUrl(d)
        if(Number.isInteger(id)) {
            updatedData = dataMap[resource]?.[id - 1];
        }

        // 3. Return the found data, OR the original string as a fallback
        return updatedData;

    }).filter(Boolean))
}

export default getObj