import { FC,useEffect,useState } from "react";
import { ICollectionData, ICollectionRequest, ICreateCollectionRequest, Theme } from "../../../store/models/collection";

import '@mdxeditor/editor/style.css'

import { MDXEditor, 
         headingsPlugin, 
         thematicBreakPlugin, 
         toolbarPlugin, 
         UndoRedo, 
         BoldItalicUnderlineToggles } from '@mdxeditor/editor';

import CustomUploader from "../../../UI/dropzone/custom.uploader";

import { Input, Tabs, Tab, Card, CardHeader, CardBody, Select, SelectItem } from "@nextui-org/react";

interface IInfoTab {
    themes: Theme[];
    register: any;
    formData: any;
    handleSetValue: any;
    errors: any;
    isLoading: boolean;
}

const CollectionBaseInfoTab: FC<IInfoTab> = (props) => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    const handleChangeName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        props.handleSetValue('name', value);
    }

    const handleChangeTheme = (value: string) => {
        if(value) {
            props.handleSetValue('theme', value)
        }
    }

    const handleSetImage = (file: File) => {
        props.handleSetValue('file', file);
    }

    useEffect(() => {
        if(!props.formData('file')) return;
        setImgUrl(URL.createObjectURL(props.formData('file')))
    }, [props.formData('file')])

    return <>
        <div className='flex w-full justify-center'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <Card className='flex flex-col gap-4 w-full max-w-3xl p-4 rounded-lg bg-base-200'>
                    <CardHeader className="pb-2 pt-2 flex-col items-start">
                        <p className="text-xl uppercase font-bold">Collection info</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <div className="flex flex-row w-full justify-between gap-4">
                            <div className="flex flex-col w-2/3 gap-4 w-full">
                                <div className="w-full text-center">
                                    <Input 
                                        color={props.errors.name ? 'danger' : 'default'}
                                        type="text" 
                                        label="Name*"
                                        disabled={props.isLoading}
                                        value={props.formData('name')}
                                        onChange={(e) => handleChangeName(e)}
                                    />
                                    {props.errors.name ? <p className='text-danger'>{props.errors.name.message}</p> : <></>}
                                </div>
                                <div className="w-full text-center">
                                    <Select 
                                        color={props.errors.theme ? 'danger' : 'default'}
                                        disabled={props.isLoading}
                                        label="Select an theme*"
                                        value={props.formData('data_type') ? props.formData('data_type') : undefined} 
                                        selectedKeys={props.formData('data_type') ? [`${props.formData('data_type')}`] : undefined}
                                        onSelectionChange={(e) => handleChangeTheme(Object.entries(e)[0][1])} 
                                    >
                                        {props.themes ? props.themes.map((option) => (
                                                <SelectItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </SelectItem>
                                            ))
                                            :
                                            <></>
                                        }
                                    </Select>
                                    {props.errors.theme ? <p className='text-danger'>{props.errors.theme.message}</p> : <></>}
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
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col w-1/3 gap-4">
                                <div className="rounded-lg aspect-video bg-center" 
                                    style={{
                                        backgroundImage: `url(${imgUrl ? imgUrl : '/img_placeholder.jpg'})`, 
                                        backgroundSize: 'cover',
                                    }}
                                />
                                <CustomUploader 
                                    buttonText="Upload image"
                                    onSuccess={handleSetImage}
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