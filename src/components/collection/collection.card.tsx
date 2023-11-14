import { FC } from "react";
import Button from "../../UI/button/button";
import { Link } from "react-router-dom";

interface ICollectionCard {
    name?: string;
    theme?: string;
    quantity?: number; 
    imagePath?: string;
}

const CollectionCard: FC<ICollectionCard> = (props) => {

    const handleErrorLoadImage = (error: any) => {
        error.target.src = '/img_placeholder.jpg'
    }

    return <>
        <div className="bg-base-200 shadow-md rounded-lg w-full ">
            <div className="rounded-lg flex flex-row justify-center overflow-hidden">
                <div className="w-full aspect-video bg-center" 
                    style={{
                        backgroundImage: `url(${props.imagePath ? props.imagePath : '/img_placeholder.jpg'})`, 
                        backgroundSize: 'cover',
                    }}
                />
            </div>
            <div className="w-full flex flex-col gap-2 items-start justify-start p-6">
                <div className="text-2xl font-black">{props.name}</div>
                <Link to='/' className="badge badge-neutral">{props.theme}</Link>
                <div className="text-md">{props.quantity} items</div>
            </div>
            <Button 
                label='Watch'
                className="btn btn-ghost w-full"
            />
        </div>
    </>
}

export default CollectionCard;