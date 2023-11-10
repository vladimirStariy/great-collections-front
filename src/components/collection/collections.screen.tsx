import Button from '../../UI/button/button';
import CollectionCard from './collection.card';

const CollectionsScreen = () => {
    return <>
        <div className='flex w-full justify-center pt-4'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className="w-full grid grid-cols-6 gap-4">
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                </div>    
            </div>
        </div>
    </>
}

export default CollectionsScreen;