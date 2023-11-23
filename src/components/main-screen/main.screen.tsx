import { useTranslation } from "react-i18next";
import CollectionCard from "../collection/collection-card/collection.card";

const MainScreen = () => {
    const { t } = useTranslation();

    return <>
        <div className='flex w-full justify-center mt-10 md:mt-16'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-10 md:gap-20 justify-center items-center'>
                <div className="flex flex-col gap-4">
                    <div className="text-2xl md:text-4xl font-bold">{t("lastCollectionItems")}</div>
                    <div className="w-full grid gap-4 
                        sm:grid-cols-2
                        md:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                    ">
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                    </div> 
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-2xl md:text-4xl font-bold">{t("theBiggestCollections")}</div>
                    <div className="w-full grid gap-4 
                        sm:grid-cols-2
                        md:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                    ">
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                        <CollectionCard />
                    </div> 
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-2xl md:text-4xl font-bold">{t("tagCloud")}</div>
                    <div className="p-2"></div>
                </div>
            </div>
        </div>
    </>
}

export default MainScreen;