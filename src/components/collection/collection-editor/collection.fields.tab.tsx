import { FC } from 'react'

import { TrashIcon } from '../../icons/icons';
import { ICollectionField, Option } from '../../../store/models/collection';
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from '@nextui-org/react';

interface ICollectionFieldTab {
    isLoading: boolean;
    types: Option[];
    customFields: ICollectionField[];
    handleChangeFieldData?: (dataIndex: number, { target: { value } }: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectType?: (dataIndex: number, selectedOption: any) => void;
    removeDataField: (removeableIndex: number) => void;
    setFieldsValue: any;
    errors: any;
}   

const CollectionFieldsTab: FC<ICollectionFieldTab> = (props) => {
    
    const handleChangeFieldData = (dataIndex: number, { target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        let arr: ICollectionField[] = [];
        props.customFields.map((item, index) => {
            if(item === props.customFields[dataIndex]) {
                item.name = value;
                arr.push(item)
            } else arr.push(item)
        })
        props.setFieldsValue('fields', arr);
    }

    const handleChangeDataType = (dataIndex: number, value: string) => {
        if(value) {
            let arr: ICollectionField[] = [];
            props.customFields.map((item, index) => {
                if(item === props.customFields[dataIndex]) {
                    item.data_type = value;
                    arr.push(item)
                } else arr.push(item)
            })
            props.setFieldsValue('fields', arr);
        }
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
            <CardBody className="max-h-96 overflow-y-auto py-2">
                <div className='flex flex-col gap-4 w-full max-w-3xl'>
                    {props.customFields && props.customFields.map((item, index) => (<>
                        <div key={index} className='flex w-full flex-row gap-4 items-center justify-between'>
                            <Input 
                                disabled={props.isLoading}
                                color={props.errors.fields && props.errors.fields[index] && props.errors.fields[index].name ? 'danger' : 'default'}
                                type="text" 
                                label="Name"
                                value={item.name ? item.name : undefined}
                                onChange={(e) => handleChangeFieldData(index, e)}
                            />
                            <Select 
                                disabled={props.isLoading}
                                color={props.errors.fields && props.errors.fields[index] && props.errors.fields[index].data_type ? 'danger' : 'default'}
                                label="Select an data type"
                                value={item.data_type ? item.data_type : undefined} 
                                selectedKeys={item.data_type ? [`${item.data_type}`] : undefined}
                                onSelectionChange={(e) => handleChangeDataType(index, Object.entries(e)[0][1])}
                            >
                                {values.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Button disabled={props.isLoading} onClick={() => props.removeDataField(index)}>
                                <TrashIcon />
                            </Button>
                        </div>
                    </>))}
                </div>
                {props.errors.fields && !props.customFields  ? <p className='text-danger'>{props.errors.fields.message}</p> : <></>}
                {props.errors.fields && props.customFields && props.customFields.length <= 0  ? <p className='text-danger'>{props.errors.fields.message}</p> : <></>}
            </CardBody>
        </Card>
    </>
}

export default CollectionFieldsTab;