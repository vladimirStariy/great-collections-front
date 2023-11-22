import { BreadcrumbItem, Breadcrumbs, Button, Textarea } from "@nextui-org/react";
import { useGetCollectionItemQuery } from "../../../store/services/collection.service";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetCollectionItemResponse } from "../../../store/models/collection";

const CollectionItemPage = () => {
    const {id} = useParams();

    const {data: itemData, isSuccess} = useGetCollectionItemQuery(Number(id));

    const [collectionItemData, setCollectionItemData] = useState<GetCollectionItemResponse>();

    useEffect(() => {
        if(isSuccess) setCollectionItemData(itemData)
        console.log(itemData)
    }, [itemData])

    return <>
        <Breadcrumbs size='lg' className="px-4 pb-4" underline='hover'>
            <BreadcrumbItem href="/collections">Collections</BreadcrumbItem>
            <BreadcrumbItem href={`/collection/${collectionItemData?.collection_id}`}>{collectionItemData?.collection.name}</BreadcrumbItem>
            <BreadcrumbItem>{collectionItemData?.name}</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex flex-col w-full gap-4">
            <div className="w-full flex justify-center bg-gradient-to-r from-fuchsia-500 to-violet-500 p-8 rounded-xl">
                <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-start items-start'>
                    <div className="flex flex-col text-white gap-4">
                        <div className="text-3xl font-black text-bold ">
                            {collectionItemData?.name.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full justify-start px-4'>
                {collectionItemData ? <>
                    {collectionItemData.collectionFields.map((item, index) => {
                        return <div>{item.name}:{item.value}</div>
                    })}
                </> : <>
                
                </>}
            </div>
            <div className="w-full flex flex-col gap-4">
                <Textarea
                    variant="bordered"
                    maxRows={10}
                    maxLength={600}
                    label="Comment"
                    placeholder="Put your comment here..."
                />
                <div className="flex flex-row w-full justify-end gap-4">
                    <Button variant='bordered'>Send</Button>
                </div>
            </div>
        </div>
    </>
}

export default CollectionItemPage;