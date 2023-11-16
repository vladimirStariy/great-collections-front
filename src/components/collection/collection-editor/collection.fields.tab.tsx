import { FC } from 'react'

import { PlusIcon, TrashIcon } from '../../icons/icons';
import { ICollectionField } from '../../../store/models/collection';
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from '@nextui-org/react';

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
        <Card className='flex flex-col gap-4 w-full max-w-3xl p-4 rounded-lg bg-base-200'>
            <CardHeader className="pb-2 pt-2 flex-col items-start">
                <p className="text-xl uppercase font-bold">Collection fields</p>
            </CardHeader>
            <CardBody className="max-w-80 overflow-y-auto py-2">
                <div className='flex flex-col gap-4 w-full max-w-3xl'>
                    {props.customFields && props.customFields.map((item, index) => (<>
                        <div className='flex w-full flex-row gap-4 items-center justify-between'>
                            <Input 
                                type="text" 
                                variant={"bordered"} 
                                label="Name"
                            />
                            <Select 
                                variant='bordered'
                                label="Select an data type" 
                            >
                                {values.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Button onClick={() => props.removeDataField(index)}>
                                <TrashIcon />
                            </Button>
                        </div></>))}
                </div>

            </CardBody>
        </Card>
    </>
}

export default CollectionFieldsTab;