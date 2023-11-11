import { FC } from "react";
import Button from "../../UI/button/button";
import { Link } from "react-router-dom";

interface ICollectionCard {
    name?: string;
    theme?: string;
    quantity?: number; 
}

const CollectionCard: FC<ICollectionCard> = (props) => {

    const handleErrorLoadImage = (error: any) => {
        error.target.src = '/img_placeholder.jpg'
    }

    return <>
        <div className="bg-base-200 shadow-md rounded-lg w-full ">
            <div className="rounded-lg overflow-hidden">
                <img 
                    src=''
                    alt='asd'
                    onError={(e) => handleErrorLoadImage(e)}
                />
            </div>
            <div className="w-full flex flex-col gap-2 items-start justify-start p-6">
                <div className="text-2xl font-black">Cats</div>
                <Link to='/' className="badge badge-neutral">Animals</Link>
                <div className="text-md">20 items</div>
            </div>
            <Button 
                label='Watch'
                className="btn btn-ghost w-full"
            />
        </div>
    </>
}

export default CollectionCard;