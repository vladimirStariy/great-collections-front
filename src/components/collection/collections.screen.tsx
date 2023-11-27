import { useState, useEffect, useMemo } from 'react'; 
import { useGetCollectionsQuery } from '../../store/services/collection.service';
import CollectionCard from './collection-card/collection.card';
import { ICollectionResponse } from '../../store/models/collection';
import CollectionCardShadow from './collection-card/collection.shadow.card';
import { Pagination } from '@nextui-org/pagination';
import { Input } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const CollectionsScreen = () => {
    const {data: collectionsData, isLoading, isSuccess} = useGetCollectionsQuery();
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<ICollectionResponse[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(12);

    const pages = Math.ceil(total / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return data.slice(start, end);
    }, [page, data, rowsPerPage]);

    useEffect(() => {
        if(isSuccess) {
            setData(collectionsData.collections);
            setTotal(collectionsData.total);
            setPage(page);
        }
    }, [collectionsData])

    return <>
        <div className='flex w-full justify-center pt-8'>
            <div className='flex flex-col w-full gap-4 justify-center items-center'>
                <div className='flex flex-row gap-4 w-full'>
                    <Input
                        isClearable
                        variant='bordered'
                        placeholder='Search...'
                    />
                </div>
                <div className="w-full grid gap-4 
                    sm:grid-cols-2
                    md:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                ">
                    {isLoading ? <>
                        <CollectionCardShadow />
                        <CollectionCardShadow />
                        <CollectionCardShadow />
                        <CollectionCardShadow />
                        <CollectionCardShadow />
                        <CollectionCardShadow />
                        <CollectionCardShadow />
                        <CollectionCardShadow />
                    </> : <>
                        {items.map((item, index) => (
                            <Link to={`/collection/${item.id}`}>
                            <CollectionCard 
                                key={index} 
                                name={item.name} 
                                theme={item.theme} 
                                quantity={item.itemsQuantity}
                                imagePath={item.imagePath}
                                isLoading={isLoading} 
                                />
                            </Link>
                        ))}
                    </>}
                </div>    
                <Pagination 
                    variant='bordered'
                    className='p-8' 
                    showShadow
                    showControls
                    total={pages} 
                    page={page}
                    onChange={setPage}
                />
            </div>
        </div>
    </>
}

export default CollectionsScreen;