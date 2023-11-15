import { FC } from "react";
import Button from "../../UI/button/button";
import { Link } from "react-router-dom";
import { TrashIcon, WhiteTrashIcon } from "../icons/icons";

interface ICollectionCard {
    name?: string;
    theme?: string;
    quantity?: number; 
    imagePath?: string;
    isEditable?: boolean;
}

const CollectionCard: FC<ICollectionCard> = (props) => {
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
            {props.isEditable ? <>
                <div className="flex flex-row join join-horizontal">
                    <Button 
                        label='Edit'
                        className="btn btn-warning w-2/4 join-item"
                    />
                    <Button className="btn btn-error w-2/4 join-item" label="">
                        <WhiteTrashIcon />
                    </Button>
                </div>
            </> : <>
                <Button 
                    label='Watch'
                    className="btn btn-ghost w-full"
                />
            </>}
        </div>
    </>
}

export default CollectionCard;