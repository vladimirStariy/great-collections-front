import { FC } from 'react'
import Button from '../../../UI/button/button';

import { PlusIcon, TrashIcon } from '../../icons/icons';
import Select from 'react-select';
import { ICollectionField } from '../../../store/models/collection';

interface ICollectionFieldTab {
    customFields: ICollectionField[];
    handleChangeFieldData: (dataIndex: number, { target: { value } }: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectType: (dataIndex: number, selectedOption: any) => void;
    createDataField: () => void;
    removeDataField: (removeableIndex: number) => void;
}   

const CollectionFieldsTab: FC<ICollectionFieldTab> = (props) => {
    
    const handleFieldValue = (index: number) => {
        let str = props.customFields[index].name;
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
        <div className='flex  flex-col shadow-md gap-4 w-full max-w-3xl px-6 rounded-lg bg-base-200'>
            <Button 
                className='btn w-full'
                label='Create one'
                onClick={props.createDataField}
            />
        </div>
        <div className='flex flex-col shadow-md gap-4 w-full max-w-3xl p-6 rounded-lg bg-base-200'>
            <div className='flex flex-col gap-4 w-full max-w-3xl'>
                {props.customFields && props.customFields.map((item, index) => (<>
                    <div className='flex w-full flex-row gap-4 items-center justify-between'>
                        <input 
                            type='text'
                            className='input input-bordered w-full' 
                            value={handleFieldValue(index)}
                            onChange={(e) => props.handleChangeFieldData(index, e)}
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
                            onChange={(selectedOption) => props.handleSelectType(index, selectedOption)}
                        />
                        <Button onClick={() => props.removeDataField(index)} label=''>
                            <TrashIcon />
                        </Button>
                    </div></>))}
            </div>
        </div>
    </>
}

export default CollectionFieldsTab;