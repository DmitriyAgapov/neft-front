import {queryWrapper} from "@/utils/queryWrapper";
import {pageEvents} from "@/utils/gql/pageTools";
import GalleryEvents from "@/Components/Gallery/GalleryEvents";

const Events = async () => {
    const {events} = await queryWrapper(pageEvents);

    return <div data-content="section_gallery">
        <GalleryEvents cards={events}/>
    </div>
}
export default Events