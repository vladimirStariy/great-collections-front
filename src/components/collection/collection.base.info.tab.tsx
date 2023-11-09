import { FC } from "react";
import { ICollectionData } from "../../store/models/collection";

import '@mdxeditor/editor/style.css'

import { MDXEditor, 
         headingsPlugin, 
         thematicBreakPlugin, 
         toolbarPlugin, 
         UndoRedo, 
         BoldItalicUnderlineToggles } from '@mdxeditor/editor';

interface IInfoTab {
    collectionData: ICollectionData;
    handleChangeCollectionData: ({target: {name,value}}: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeDescription: (value: string) => void;
}

const CollectionBaseInfoTab: FC<IInfoTab> = (props) => {
    return <>
        <div className='flex w-full justify-center'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className='flex flex-col gap-4 w-full max-w-3xl p-6 rounded-lg bg-base-200'>
                    <div className='text-xl'>Collection</div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-base'>Name</div>
                        <input 
                            className='input input-bordered w-full'
                            type='text'
                            placeholder='type here'
                            value={props.collectionData.name === null ? '' : props.collectionData.name}
                            onChange={props.handleChangeCollectionData} 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-base'>Theme</div>
                        <input 
                            className='input input-bordered w-full'
                            type='text'
                            placeholder='type here'
                            value={props.collectionData.theme === null ? '' : props.collectionData.theme}
                            onChange={props.handleChangeCollectionData} 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-base'>Description</div>
                        <MDXEditor
                            className='flex flex-col'
                            markdown='# Hello World'
                            plugins={[
                                headingsPlugin(), 
                                thematicBreakPlugin(),
                                toolbarPlugin({
                                    toolbarContents: () => ( 
                                        <><UndoRedo /><BoldItalicUnderlineToggles /></>
                                    )
                                })
                            ]}
                            onChange={(markdown) => props.handleChangeDescription(markdown)}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CollectionBaseInfoTab;