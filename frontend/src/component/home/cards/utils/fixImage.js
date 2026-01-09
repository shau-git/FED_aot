const fixImage = (img) => {
    if (!img) {
        return "/fallback.png"
    } else if (img.split('.png').length > 1) {

        return img.split('.png')[0] + '.png'

    } else if(img.split('.jpg').length > 1) {

        return img.split('.jpg')[0] + '.jpg'

    } else if(img.split('.jpeg').length > 1) {

        return img.split('.jpeg')[0] + '.jpeg'
    }
}

export default fixImage 