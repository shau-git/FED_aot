const statusColorMap = {
    "Alive": { text: "text-green-500", bg: "bg-green-500" },
    "Deceased": { text: "text-red-700", bg: "bg-red-700" },
    "Unknown": { text: "text-gray-500", bg: "" }
}

const getStatusColor = (status) => {
    return statusColorMap[status] || statusColorMap["default"]
}

export {getStatusColor}