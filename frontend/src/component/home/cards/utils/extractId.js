const extractIdFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    
    // "https://api.attackontitanapi.com/episodes/1" => 1
    let id = parts[parts.length - 1]
    if (parseInt(id)) {
        return parseInt(id);
    }
    return url
};



export default extractIdFromUrl

