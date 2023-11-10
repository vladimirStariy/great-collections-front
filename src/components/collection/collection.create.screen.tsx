import { useState } from 'react' 
import { ICollectionData, ICollectionField } from '../../store/models/collection';

import Button from '../../UI/button/button';

import CollectionBaseInfoTab from './collection.base.info.tab';
import CollectionFieldsTab from './collection.fields.tab';

const CollectionCreationScreen = () => {
    const [tab, setTab] = useState<boolean>(true);

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

    return <>
        <div className='flex w-full justify-center pt-4'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                {tab ? <>
                    <CollectionBaseInfoTab 
                        collectionData={collectionData}
                        handleChangeCollectionData={handleChangeCollectionData}
                        handleChangeDescription={handleChangeDescription}
                    />
                </> : <>
                    <CollectionFieldsTab 
                        customFields={customFields}
                        handleChangeFieldData={handleChangeFieldData}
                        handleSelectType={handleSelectType}
                        createDataField={createDataField}
                        removeDataField={removeDataField}
                    />
                </>}
                <Button label={`${tab ? '' : ''}`} onClick={() => setTab(!tab)} />
            </div>
        </div>
    </>
}

export default CollectionCreationScreen;