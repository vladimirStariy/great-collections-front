import { useTranslation } from "react-i18next";
import CollectionCard from "../collection/collection-card/collection.card";
import { useGetTagsQuery } from "../../store/services/tag.service";
import { useEffect } from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useGetBiggestCollectionsQuery, useGetLastCollectionItemsQuery } from "../../store/services/collection.service";
import CollectionItemCard from "../collection/collection-card/collection.item.card";

const MainScreen = () => {
    const { t } = useTranslation();
    const {data: tags, refetch: tagsRefetch} = useGetTagsQuery();
    const {data: biggestCollections, isLoading, refetch: collectionsRefetch} = useGetBiggestCollectionsQuery(3);
    const {data: lastItems, refetch: itemRefetch} = useGetLastCollectionItemsQuery(4);

    useEffect(() => {
        tagsRefetch();
        collectionsRefetch();
        itemRefetch();
    }, [])

    return <>
        <div className='flex w-full justify-center mt-10 md:mt-16'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-10 md:gap-20 justify-center items-center'>
                <div className="flex flex-col w-full gap-4">
                    <div className="text-2xl md:text-4xl font-bold">{t("lastCollectionItems")}</div>
                    <div className="w-full grid gap-4 
                        sm:grid-cols-2
                        md:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                    ">
                        {lastItems && lastItems.itemCards.map((item, index) => (
                            <Link to={`/collection-item/${item.id}`}>
                                <CollectionItemCard 
                                    key={index}
                                    name={item.name}
                                    tags={item.tags}
                                    createdAt={item.created}
                                />
                            </Link>
                        ))}
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
                        {biggestCollections && biggestCollections.map((item, index) => (
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
                    </div> 
                </div> 
                <div className="flex flex-col w-full gap-4 pb-16">
                    <div className="text-2xl md:text-4xl font-bold">{t("tagCloud")}</div>
                    <Card className="w-full">
                        <CardBody className="p-4 text-small text-default-400">
                            <div className="grid gap-4 
                            grid-cols-3
                            sm:grid-cols-3
                            md:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-12">
                                {tags?.tags && tags.tags.map((item, index) => (
                                    <Link className="w-auto" to='/'><Chip>{item.name}</Chip></Link>
                                ))}
                                {tags?.tags && tags.tags.length <= 0 ? <>Theres no tags</> : <></>}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    </>
}

export default MainScreen;