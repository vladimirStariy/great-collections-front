import { useState, useEffect } from 'react'; 
import { useGetCollectionsMutation } from '../../store/services/collection.service';
import CollectionCard from './collection.card';
import { ICollectionRequest, ICollectionResponse } from '../../store/models/collection';

const CollectionsScreen = () => {
    const [getCollections] = useGetCollectionsMutation();

    const [data, setData] = useState<ICollectionResponse[]>([]);

    const handleGetCollections = async () => {
        const response = await getCollections({page: 1, recordsCount: 10} as ICollectionRequest).unwrap();
        if(response) setData(response);
    }

    useEffect(() => {
        handleGetCollections();
    }, [])

    return <>
        <div className='flex w-full justify-center pt-4 px-4'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className="w-full grid gap-4 
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                ">
                    {data && data.map((item, index) => (
                        <CollectionCard 
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

export default CollectionsScreen;