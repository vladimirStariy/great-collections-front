import { useState, FormEvent } from 'react' 
import { ICollectionField, ICreateCollectionRequest } from '../../../store/models/collection';

import Button from '../../../UI/button/button';

import CollectionBaseInfoTab from './collection.base.info.tab';
import CollectionFieldsTab from './collection.fields.tab';
import { useCreateCollectionMutation } from '../../../store/services/collection.service';

interface ICollectionEditScreen {
    
}

const CollectionCreationScreen = () => {
    const [tab, setTab] = useState<boolean>(true);

    const [image, setImage] = useState<File | null>(null);
    const [formDataState, setFormData] = useState<ICreateCollectionRequest>({
        name: 'test',
        description: 'test',
        theme: 'test',
        fields: [
            {
                name: 'test',
                data_type: 'STRING',
                collectionId: 0
            },
        ]
    })

    const [createCollection, {isLoading}] = useCreateCollectionMutation();

    const handleCreateCollection = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if(image) formData.append('file', image);
        Object.entries(formDataState).forEach(([key, value]) => {
            if(key !== 'fields')
            formData.append(key, value)
        })
        Object.entries(formDataState.fields).map((item, index) => {
            formData.append(`fields[${item[0]}]`, JSON.stringify(item[1]))
        })
        createCollection(formData);
    }

    const handleChangeCollectionData = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeDescription = (value: string) => {
        setFormData((prev) => ({ ...prev, description: value }))
    }

    const createDataField = () => {
        setFormData((prev) => ({
            ...prev,
            fields: [ ...prev.fields, {name: '', data_type: '', collectionId: 0}]
        }));
    }

    const removeDataField = (removeableIndex: number) => {
        const _fields = formDataState.fields.filter((value, i) => i !== removeableIndex);
        setFormData((prev) => ({
            ...prev,
            fields: _fields
        }));
    }

    const handleSelectType = (dataIndex: number, selectedOption: any) => {
        let arr: ICollectionField[] = [];
        formDataState.fields.map((item, index) => {
            if(item === formDataState.fields[dataIndex]) {
                item.data_type = selectedOption.value;
                arr.push(item)
            } else arr.push(item)
        })
        setFormData((prev) => ({
            ...prev,
            fields: arr
        }));
    }

    const handleChangeFieldData = (dataIndex: number, { target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        let arr: ICollectionField[] = [];
        formDataState.fields.map((item, index) => {
            if(item === formDataState.fields[dataIndex]) {
                item.name = value;
                arr.push(item)
            } else arr.push(item)
        })
        setFormData((prev) => ({
            ...prev,
            fields: arr
        }));
    }

    const handleSetImage = (file: File) => {
        setImage(file);
    }

    return <>
        <div className='flex w-full h-full justify-center'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                {tab ? <>
                    <CollectionBaseInfoTab
                        formDataState={formDataState}
                        handleSetImage={handleSetImage}
                        image={image} 
                        handleChangeCollectionData={handleChangeCollectionData}
                        handleChangeDescription={handleChangeDescription}
                    />
                </> : <>
                    <CollectionFieldsTab 
                        customFields={formDataState.fields}
                        handleChangeFieldData={handleChangeFieldData}
                        handleSelectType={handleSelectType}
                        createDataField={createDataField}
                        removeDataField={removeDataField}
                    />
                </>}
                <Button label={`${tab ? '' : ''}`} onClick={() => setTab(!tab)} />
                <Button label='SUBMIT' onClick={handleCreateCollection} />
            </div>
        </div>
    </>
}

export default CollectionCreationScreen;