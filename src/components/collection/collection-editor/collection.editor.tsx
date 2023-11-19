import { FC, useState } from "react";

import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import NextTable from "../../../UI/next-table/next.table";

interface ICollectionPage {

}

const CollectionEditor = () => {
    
    
    const markdown = `# **Hello World**
    
    <u>Get out my way</u>
    
    **x**X**x**X**x**X**x**X**x**
    **x**X**x**X**x**X**x**X**x**
    **x**X**x**X**x**X**x**X**x**
    **x**X**x**X**x**X**x**X**x**`

    const handleErrorLoadImage = (error: any) => {
        error.target.src = '/img_placeholder.jpg'
    }

    const mockData = [
        {
            id: 1,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 2,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 3,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 4,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 5,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 6,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 7,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 8,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 9,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 10,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        }, 
        {
            id: 11,
            name: 'name',
            field1: 'field1',
            field2: 'field2',
            field3: 'field3',
        },  
    ]

    return <>
        <div className="w-full flex justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 p-8 rounded-lg shadow-lg">
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className="flex flex-row gap-4 w-full justify-start">
                    <div className="rounded-lg w-full overflow-hidden">
                        <img 
                            className="max-w-xs rounded-lg"
                            src=''
                            alt='asd'
                            onError={(e) => handleErrorLoadImage(e)}
                        />
                    </div>
                    <div className="w-full flex flex-col text-white w-full gap-4">
                        <div className="text-4xl font-black text-bold ">
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
        <div className='flex w-full justify-center pt-4'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-start'>
                <div className="w-full">
                    <NextTable 
                        isCreateable
                        isEditable
                        isDeleteable
                        isSelectable
                        data={mockData}
                    />
                </div>
            </div>
        </div>
    </>
}

export default CollectionEditor;