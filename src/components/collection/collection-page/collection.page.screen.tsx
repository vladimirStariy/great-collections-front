import { FC, useState } from "react";

import GreatTable from "../../../UI/table/table";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";

interface ICollectionPage {

}

const CollectionPage: FC = () => {
    const markdown = `# **Hello World**
    
    <u>Get out my way</u>
    
    **x**X**x**X**x**X**x**X**x**
    
    *NAH*`

    const handleErrorLoadImage = (error: any) => {
        error.target.src = '/img_placeholder.jpg'
    }

    const mockData = [
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        },  
        
    ]

    return <>
        <div className="w-full flex justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 pt-8 pb-8">
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
                        <div className="text-6xl font-black text-bold ">
                            Collection name
                        </div>
                        <div className="text-xl">
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {markdown}
                            </Markdown>
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
                <div className="w-full">
                    <div className="flex flex-row w-full">
                        <input className="input input-ghost" placeholder="search..."/>
                    </div>
                    <GreatTable 
                        data={mockData}
                    />
                </div>
            </div>
        </div>
    </>
}

export default CollectionPage;