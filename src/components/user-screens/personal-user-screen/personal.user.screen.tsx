import { useEffect, useState } from "react";
import { useGetUserCollectionsMutation } from "../../../store/services/collection.service";
import { ICollectionResponse } from "../../../store/models/collection";
import CollectionCard from "../../collection/collection-card/collection.card";
import { Link, useNavigate } from "react-router-dom";
import { useGetMyCollectionsQuery } from "../../../store/services/profile.service";
import { Button } from "@nextui-org/react";

const PersonalUserScreen = () => {
    const [page, setPage] = useState<number>(1);
    const [collections, setCollections] = useState<ICollectionResponse[]>([]);
    const {data: myCollections, refetch, isLoading, isError, isSuccess} = useGetMyCollectionsQuery();
    const navigate = useNavigate();
    
    const handleCreateCollection = () => {
        navigate('/collection-creation')
    }

    useEffect(() => {
        if(isSuccess && myCollections) {
            setCollections(myCollections);
        }
    }, [myCollections])

    return <>
        <div className='flex w-full justify-center pt-4 px-4'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className="w-full bg-base-200 py-4 rounded-lg">
                    <Button variant="bordered" onClick={handleCreateCollection}>
                        Create new collection
                    </Button>
                </div>
                <div className="w-full grid gap-4 
                    sm:grid-cols-2
                    md:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                ">
                    {!isError && collections && collections.map((item, index) => (
                        <Link to={`/collection/${item.id}`}>
                            <CollectionCard 
                                isEditable
                                key={index} 
                                name={item.name} 
                                theme={item.theme} 
                                quantity={item.itemsQuantity}
                                imagePath={item.imagePath} 
                            />
                        </Link>
                    ))}
                </div>    
            </div>
        </div>
    </>
}

export default PersonalUserScreen;