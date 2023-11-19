import { FC, useEffect, useState } from "react";

import GreatTable from "../../../UI/table/table";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import NextTable from "../../../UI/next-table/next.table";
import { useParams } from "react-router-dom";
import { useGetCollectionByIdQuery } from "../../../store/services/collection.service";
import { GetCollectionResponse } from "../../../store/models/collection";
import CollectionItemEditorModal from "../collection-item/collection.item.editor.modal";
import { Button } from "@nextui-org/react";

interface ICollectionPage {

}

const CollectionPage: FC = () => {
    const {id} = useParams();

    const [baseInfo, setBaseInfo] = useState<GetCollectionResponse>()

    const {data, isLoading, isFetching} = useGetCollectionByIdQuery(Number(id))

    const handleErrorLoadImage = (error: any) => {
        error.target.src = '/img_placeholder.jpg'
    }

    const dataConstruct = () => {
        

        if(baseInfo) {
            let newItemArr = baseInfo.collectionItems.map(item => {
                let newFieldValueArr = item.values.map(fieldValue => {
                    // прокидывается айди непосредственно айтема, а не массива
                    return {[baseInfo.collectionFields[Number(fieldValue.collectionFieldId)].name]: fieldValue.value};
                })
            })
            console.log(newItemArr)
        }
    }

    const checker = () => {
        console.log(baseInfo)
    }

    useEffect(() => {
        setBaseInfo(data);
        if(baseInfo) dataConstruct();
    }, [data])

    return <>
        <Button onClick={checker}>checker</Button>
        <Button onClick={dataConstruct}>clock</Button>
        <div className="w-full flex justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 p-8 rounded-lg">
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className="flex flex-row gap-4 w-full justify-start">
                    <div className="rounded-lg overflow-hidden">
                        <img 
                            className="max-w-md"
                            src=''
                            alt='asd'
                            onError={(e) => handleErrorLoadImage(e)}
                        />
                    </div>
                    <div className="flex flex-col text-white gap-4">
                        <div className="text-4xl font-black text-bold ">
                            {!isLoading && baseInfo && baseInfo.collection.name}
                        </div>
                        <div className="text-xl">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex w-full justify-center pt-4 px-4'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-start'>
                <div className="text-3xl font-black text-bold">
                    Collection items
                </div>
                
            </div>
        </div>
    </>
}

export default CollectionPage;