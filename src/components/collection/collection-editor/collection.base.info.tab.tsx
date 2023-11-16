import { FC,useEffect,useState } from "react";
import { ICollectionData, ICollectionRequest, ICreateCollectionRequest } from "../../../store/models/collection";

import '@mdxeditor/editor/style.css'

import { MDXEditor, 
         headingsPlugin, 
         thematicBreakPlugin, 
         toolbarPlugin, 
         UndoRedo, 
         BoldItalicUnderlineToggles } from '@mdxeditor/editor';

import CustomUploader from "../../../UI/dropzone/custom.uploader";

import { Input, Tabs, Tab, Card, CardHeader, CardBody } from "@nextui-org/react";

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

                <Card className='flex flex-col gap-4 w-full max-w-3xl p-4 rounded-lg bg-base-200'>
                    <CardHeader className="pb-2 pt-2 flex-col items-start">
                        <p className="text-xl uppercase font-bold">Collection info</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <div className="flex flex-row justify-between gap-4">
                            <div className="flex flex-col gap-4 w-full">
                                <Input 
                                    type="text" 
                                    variant={"bordered"} 
                                    label="Name"
                                />
                                <Input 
                                    type="text" 
                                    variant={"bordered"} 
                                    label="Theme"
                                />
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
                    </CardBody>
                </Card>
            </div>
        </div>
    </>
}

export default CollectionBaseInfoTab;