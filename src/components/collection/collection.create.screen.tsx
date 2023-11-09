import { useState } from 'react' 
import { ICollectionData, ICollectionField } from '../../store/models/collection';

import '@mdxeditor/editor/style.css'

import { MDXEditor, 
         headingsPlugin, 
         thematicBreakPlugin, 
         toolbarPlugin, 
         UndoRedo, 
         BoldItalicUnderlineToggles } from '@mdxeditor/editor';
import Button from '../../UI/button/button';
import { TrashIcon } from '../icons/icons';
import Select from 'react-select';

const CollectionCreationScreen = () => {
    const [collectionData, setCollectionData] = useState<ICollectionData>({
        name: null, description: null, theme: null
    })
    const [customFields, setCustomFields] = useState<ICollectionField[]>([])

    const handleChangeCollectionData = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setCollectionData((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeDescription = (value: string) => {
        setCollectionData((prev) => ({ ...prev, description: value }))
    }

    const createDataField = () => {
        setCustomFields((prev) => [...prev, {name: '', data_type: '', collectionId: 0}]);
    }

    const removeDataField = (removeableIndex: number) => {
        setCustomFields(oldArray => oldArray.filter((value, i) => i !== removeableIndex));
    }

    const handleSelectType = (dataIndex: number, selectedOption: any) => {
        let arr: ICollectionField[] = [];
        customFields.map((item, index) => {
            if(item === customFields[dataIndex]) {
                item.data_type = selectedOption.value;
                arr.push(item)
            } else arr.push(item)
        })
        setCustomFields(arr);
    }

    const handleChangeFieldData = (dataIndex: number, { target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        let arr: ICollectionField[] = [];
        customFields.map((item, index) => {
            if(item === customFields[dataIndex]) {
                item.name = value;
                arr.push(item)
            } else arr.push(item)
        })
        setCustomFields(arr);
    }

    const handleFieldValue = (index: number) => {
        let str = customFields[index].name;
        if (!str) return '';
        return str;
    }

    const values = [
        {value: 'INTEGER', label: 'Number'},
        {value: 'VARCHAR', label: 'String'},
        {value: 'BOOLEAN', label: 'Logical'},
        {value: 'DECIMAL', label: 'Money'},
    ]

    return <>
        <div className='flex w-full justify-center pt-8'>
            <div className='flex flex-row w-full max-w-screen-2xl gap-8'>
                <div className='flex flex-col gap-8 w-full max-w-3xl'>
                    <div className='flex flex-col gap-1'>
                        <div className='text-base'>Name</div>
                        <input 
                            className='input input-bordered w-full'
                            type='text'
                            placeholder='type here'
                            value={collectionData.name === null ? '' : collectionData.name}
                            onChange={handleChangeCollectionData} 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-base'>Theme</div>
                        <input 
                            className='input input-bordered w-full'
                            type='text'
                            placeholder='type here'
                            value={collectionData.theme === null ? '' : collectionData.theme}
                            onChange={handleChangeCollectionData} 
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
                            onChange={(markdown) => handleChangeDescription(markdown)}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-4 w-full max-w-3xl pb-8'>
                    {customFields && customFields.map((item, index) => (
                        <>
                            <div className='flex w-full flex-row gap-4 items-center justify-between'>
                                <input 
                                    type='text'
                                    className='input input-bordered w-full' 
                                    value={handleFieldValue(index)}
                                    onChange={(e) => handleChangeFieldData(index, e)}
                                    placeholder='name' 
                                />
                                <Select  
                                    className='w-full input-bordered'
                                    styles={{
                                        control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          padding: '5px',
                                          borderRadius: '0.5rem'
                                        }),
                                      }}
                                    options={values}
                                    onChange={(selectedOption) => handleSelectType(index, selectedOption)}
                                />
                                <Button onClick={() => removeDataField(index)} label=''>
                                    <TrashIcon />
                                </Button>
                            </div>
                        </>
                    ))}
                    <Button 
                        className='btn w-full'
                        label='Create one'
                        onClick={createDataField}
                    />
                </div>
            </div>
        </div>
    </>
}

export default CollectionCreationScreen;