import {useIsMobile, TitanComponent} from "../../../homeConfig"
import {useId} from "react"

//dataMap, loading, error, openModal
const Titans = ({ dataMap, loading, error, openModal }) => {

    const key= useId()

    // Move useIsMobile to the top level here to avoid the hook error
    const isMobile = useIsMobile();

    if (loading) return <p className="text-amber-400">Loading titans data...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    const handleClick = (item) => {
        openModal(item, "titans") // Pass data and resource type
    }

    const data = dataMap['titans']

    return (
        <div className="mt-10 font-netflix">
            {data.map((item, index) => (
                <TitanComponent 
                    key={`${key}-${index}-titans`} 
                    data={item} 
                    index={index} 
                    handleClick={() => handleClick(item)} 
                    isMobile={isMobile}
                />
            ))}
        </div>
    );
};

export default Titans