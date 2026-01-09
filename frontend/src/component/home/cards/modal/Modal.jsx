import { useEffect, memo } from 'react';
import { 
    CharacterModel, 
    EpisodesModel, 
    LocationsModal, 
    OrganizationsModal, 
    TitansModel,
    useResourceFetcher, 
    getObj, 
    OpenModal
} from '../../homeConfig';

const Modal = ({ isOpen, onClose, data, resource}) => {
    // console.log("Modal", data.name, data.episodes)
    const {dataMap} = useResourceFetcher()
 
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if ( !data) return null;

    const renderContent = () => {
        if (resource === "characters") {
            const episodes = data['episodes']
            const relativeMember = data['relatives']?.[0]?.['members'];

            // get the data from each episode url
            data['episodes'] = getObj(episodes, dataMap, "episodes")

            // get the data from each relative url
            if(data['relatives'].length > 0 && relativeMember) {
                data['relatives'][0]['members'] = getObj(relativeMember, dataMap, "characters")
            }
            return (
                <CharacterModel data={data}/>
            );

        } else if (resource === "episodes") {
            // get the data from each characters url
            data['characters'] = getObj(data['characters'], dataMap, "characters")
            return (
                <EpisodesModel data={data}/>
            );

        } else if (resource === "locations") {
            // get the data from each url
            data['notable_inhabitants'] = getObj(data['notable_inhabitants'], dataMap, "characters")
            data['notable_former_inhabitants'] = getObj(data['notable_former_inhabitants'], dataMap, "characters")
            data['debut'] = getObj([data['debut']], dataMap, "episodes")[0]
            return (
                <LocationsModal data={data}/>
            );

        } else if (resource === "organizations") {
            // get the data from each url
            data['notable_members'] = getObj(data['notable_members'], dataMap, "characters")
            data['debut'] = getObj([data['debut']], dataMap, "episodes")[0]
            return (
                <OrganizationsModal data={data}/>
            );
        } else if (resource === "titans") {
            // get the data from each url
            data['current_inheritor'] = getObj([data['current_inheritor']], dataMap, "characters")[0]
            data['former_inheritors'] = getObj(data['former_inheritors'], dataMap, "characters")
            
            return (
                <TitansModel data={data}/>
            );
        }

        // Default fallback
        return (
            <div className="text-white">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    };

    return (
        <>
        <OpenModal p={{isOpen, renderContent, onClose}}/>
    </>
    );
};

export default memo(Modal);