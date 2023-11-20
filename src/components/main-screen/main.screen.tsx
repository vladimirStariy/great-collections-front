import CollectionCard from "../collection/collection-card/collection.card";

const MainScreen = () => {
    return <>
        <div className='flex w-full justify-center mt-12'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-20 justify-center items-center'>
                <div className="flex flex-col gap-4">
                    <div className="text-4xl font-bold">The last collection items</div>
                    <div className="w-full grid grid-cols-4 gap-4">
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                    </div> 
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-4xl font-bold">The biggest collections</div>
                    <div className="w-full grid grid-cols-4 gap-4">
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                    </div> 
                </div>
                <div className="flex flex-row gap-2">
                    <div className="p-2">1</div>
                </div>
            </div>
        </div>
    </>
}

export default MainScreen;