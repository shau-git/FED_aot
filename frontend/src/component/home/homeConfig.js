// Home page
import Home from "./Home";

// import from Hero section
import Hero from "./hero/Hero";
import MoreButton from "./hero/components/utils/MoreButton";
import Arrow from "./hero/components/utils/Arrow";
import Alert from "./hero/components/utils/Alert";
import ProgressBar from "./hero/components/utils/ProgressBar";
import DisplayImage from "./hero/components/image/DisplayImage";
import heroImages from "./hero/components/image/heroImages";
import RandomQuote from "./hero/RandomQuote/RandomQuote";


// import from Card section
import Cards from "./cards/Cards";
import Container from "./cards/components/utils/1_Container";
import Characters from "./cards/components/cards/Characters";
import Episodes from "./cards/components/cards/Episodes";
import Location from "./cards/components/cards/Location";
import Organizations from "./cards/components/cards/Organizations";
import Titans from "./cards/components/cards/Titans";
import TitanComponent from "./cards/components/cards/titans/TitanComponent";

import Likes from "./cards/components/cards/likes/Likes";   /////
import RenderLike from "./cards/components/cards/likes/RenderLike"
import { getLikes, addLike, deleteLike } from "./cards/components/utils/handleLikes";
import Form from "./cards/components/cards/likes/Form";

import { useIsMobile } from "./cards/components/utils/useIsMobile";
import { titansImg, titansImgCard } from "./cards/components/cards/titans/titansImg";
import locationImg from "./cards/components/utils/locationImg";
import LocationAdd from "./cards/components/utils/2_LocationAdd";
import ReadMoreButton from "./cards/utils/ReadMoreButton";
import {episodeNumImg, episodeSypnosis} from "./cards/utils/episodeData";
import InputBar from "./cards/utils/InputBar";
import DropDownButton from "./cards/utils/DropDownButton";
import fixImage from "./cards/utils/fixImage";
import extractIdFromUrl from "./cards/utils/extractId";
import { getStatusColor } from "./cards/utils/getStatusColor";

import { API_LINKS, CACHE_KEY } from "./cards/components/resource/constants"
import useResourceFetcher from "./cards/components/resource/useResourceFetcher";
import CardButtons from "./cards/components/utils/CardsButton";
import LikesCardButton from "./cards/components/utils/LikesCardButton";
import ResourceContent from "./cards/components/resource/ResourceContent";

// Modal
import Modal from "./cards/modal/Modal";
import CharacterModel from "./cards/modal/components/CharacterModel"
import EpisodesModel from "./cards/modal/components/EpisodesModel";
import LocationsModal from "./cards/modal/components/LocationsModal";
import OrganizationsModal from "./cards/modal/components/OrganizationsModal";
import TitansModel from "./cards/modal/components/TitansModel";

import OpenModal from "./cards/modal/components/utils/OpenModal";
import {Accordion, AccordionEp} from "./cards/modal/components/utils/1_Accordion";
import getObj from "./cards/modal/components/utils/getObj";

// Pull Down
import PullDown from "./pulldown/PullDown";


export {
    Home,


    Alert,

    Hero,
    Arrow,
    MoreButton,
    RandomQuote,
    ProgressBar,
    DisplayImage,
    heroImages,

    Cards,
    Container,
    Characters,
    Episodes,
    Location,
    Organizations,
    Titans,

    TitanComponent, 

    Likes,
    getLikes,
    addLike, 
    deleteLike,
    RenderLike,
    Form, 


    useIsMobile,
    titansImg,
    titansImgCard,
    locationImg,
    LocationAdd,
    ReadMoreButton,
    episodeNumImg,
    episodeSypnosis,
    InputBar,
    DropDownButton,

    useResourceFetcher,
    ResourceContent,
    CardButtons,
    LikesCardButton,
    API_LINKS,
    CACHE_KEY,

    Modal,
    CharacterModel,
    EpisodesModel,
    LocationsModal,
    OrganizationsModal,
    TitansModel,

    OpenModal,
    Accordion,
    AccordionEp,
    getObj,

    fixImage,
    extractIdFromUrl,
    getStatusColor,

    PullDown
}