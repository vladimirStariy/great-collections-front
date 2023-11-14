import { FC,useEffect,useState } from "react";
import { ICollectionData, ICollectionRequest, ICreateCollectionRequest } from "../../store/models/collection";

import '@mdxeditor/editor/style.css'

import { MDXEditor, 
         headingsPlugin, 
         thematicBreakPlugin, 
         toolbarPlugin, 
         UndoRedo, 
         BoldItalicUnderlineToggles } from '@mdxeditor/editor';
import CustomUploader from "../../UI/dropzone/custom.uploader";

interface IInfoTab {
    formDataState: ICreateCollectionRequest;
    image?: File | null;
    handleSetImage: (file: File) => void
    handleChangeCollectionData: ({target: {name,value}}: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeDescription: (value: string) => void;
}

const CollectionBaseInfoTab: FC<IInfoTab> = (props) => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    useEffect(() => {
        if(!props.image) return;
        setImgUrl(URL.createObjectURL(props.image))
    }, [props.image])

    return <>
        <div className='flex w-full justify-center'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className='flex flex-col shadow-md gap-4 w-full max-w-3xl p-6 rounded-lg bg-base-200'>
                    <div className='text-xl'>Collection details</div>
                    <div className="flex flex-row justify-between gap-4">
                        <div className="flex flex-col gap-4 w-full">
                            <div className='flex flex-col gap-1'>
                                <div className='text-base'>Name*</div>
                                <input 
                                    className='input input-bordered w-full'
                                    type='text'
                                    placeholder='type here'
                                    name="name"
                                    value={props.formDataState.name === null ? '' : props.formDataState.name}
                                    onChange={props.handleChangeCollectionData} 
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='text-base'>Theme*</div>
                                <input 
                                    className='input input-bordered w-full'
                                    type='text'
                                    placeholder='type here'
                                    name="theme"
                                    value={props.formDataState.theme === null ? '' : props.formDataState.theme}
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
                        <div className="flex flex-col w-full gap-4">
                            <div className="rounded-lg aspect-video bg-center" 
                                style={{
                                    backgroundImage: `url(${imgUrl ? imgUrl : '/img_placeholder.jpg'})`, 
                                    backgroundSize: 'cover',
                                }}
                            />
                            <CustomUploader 
                                buttonText="Upload image"
                                onSuccess={props.handleSetImage}
                            />                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CollectionBaseInfoTab;