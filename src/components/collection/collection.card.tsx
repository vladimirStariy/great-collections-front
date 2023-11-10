import { FC } from "react";
import Button from "../../UI/button/button";

interface ICollectionCard {

}

const CollectionCard: FC<ICollectionCard> = (props) => {

    return <>
        <div className="bg-base-200 rounded-lg w-full ">
            <div className="p-6 rounded-lg overflow-hidden">
                <img 
                    
                    src='/cats/2d527f21b65c5de1c8311153fe967670.jpeg'
                />
            </div>
            <div className="w-full flex flex-col items-center justify-center p-6">
                <div className="text-xl font-black">Collection name</div>
            </div>
            <Button 
                label='Watch'
                className="btn btn-primary w-full"
            />
        </div>
    </>
}

export default CollectionCard;