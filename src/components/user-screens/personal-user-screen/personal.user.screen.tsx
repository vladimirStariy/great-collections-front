import { useEffect, useState } from "react";
import { useGetUserCollectionsMutation } from "../../../store/services/collection.service";
import { ICollectionResponse } from "../../../store/models/collection";
import CollectionCard from "../../collection/collection.card";
import Button from "../../../UI/button/button";
import { Link } from "react-router-dom";

const PersonalUserScreen = () => {
    const [page, setPage] = useState<number>(1);
    const [collections, setCollections] = useState<ICollectionResponse[]>([]);
    const [getMyCollections] = useGetUserCollectionsMutation();
    
    const getCollections = async () => {
        const data = await getMyCollections({page: page, recordsCount: 10}).unwrap()
        setCollections(data)
    }

    useEffect(() => {
        getCollections();
    }, [])

    return <>
        <div className='flex w-full justify-center pt-4 px-4'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className="w-full bg-base-200 p-4 rounded-lg">
                    <Link to='/collection-creation' className="btn btn-ghost">Create new collection</Link>
                </div>
                <div className="w-full grid gap-4 
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-4
                    2xl:grid-cols-5
                ">
                    {collections && collections.map((item, index) => (
                        <CollectionCard 
                            isEditable
                            key={index} 
                            name={item.name} 
                            theme={item.theme} 
                            quantity={item.itemsQuantity}
                            imagePath={item.imagePath} 
                        />
                    ))}
                </div>    
            </div>
        </div>
    </>
}

export default PersonalUserScreen;