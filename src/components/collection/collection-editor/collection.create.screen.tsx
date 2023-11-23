import { useState, FormEvent, useEffect } from 'react' 
import { ICollectionField, ICreateCollectionRequest, Option, Theme } from '../../../store/models/collection';

import CollectionBaseInfoTab from './collection.base.info.tab';
import CollectionFieldsTab from './collection.fields.tab';
import { useCreateCollectionMutation, useGetCollectionDirectoriesQuery } from '../../../store/services/collection.service';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Card, CardHeader, Tab, Tabs } from '@nextui-org/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { collectionValidationSchema } from './validation.schema';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export interface ICollectionFormData {
    name: string;
    theme: number;
    file?: File;
    description?: string;
    fields: ICollectionField[];
}

const CollectionCreationScreen = () => {
    const [selected, setSelected] = useState<string>("base");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<ICollectionFormData>({resolver: yupResolver(collectionValidationSchema)})

    const [createCollection, {isLoading, isSuccess}] = useCreateCollectionMutation();
    const {data: directories} = useGetCollectionDirectoriesQuery();

    const { t } = useTranslation(); 

    const [types, setTypes] = useState<Option[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);

    const onSubmit: SubmitHandler<ICollectionFormData> = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        if(data.description) formData.append('description', data.description);
        if(data.theme) formData.append('theme', data.theme.toString());
        if(data.file) formData.append('file', data.file);
        if(data.fields) {
            Object.entries(data.fields).map((item, index) => {
                formData.append(`fields[${item[0]}]`, JSON.stringify(item[1]))
            })
        }
        const response = await createCollection(formData).unwrap();
        if(response) navigate(`/collection/${response}`)
    }

    const createDataField = () => {
        if(!getValues('fields')) {
            setValue('fields', [{
                collectionId: 0,
                name: '',
                data_type: ''
            }])
        } else {
            setValue('fields', [...getValues('fields') as ICollectionField[], {
                collectionId: 0,
                name: '',
                data_type: ''
            }])
        }
    }

    const removeDataField = (removeableIndex: number) => {
        const _fields = watch('fields').filter((value, index) => index !== removeableIndex);
        setValue('fields', _fields)
    }

    useEffect(() => {
        if(directories?.themes) 
            setThemes(directories?.themes);
        if(directories?.types)
            setTypes(directories?.types)
    }, [directories])

    useEffect(() => {
        if(errors) {
            if(errors.name || errors.theme) {
                setSelected('base')
                return
            }
            if(errors.fields) 
                setSelected('fields');
        }
    }, [errors])

    return <>
        <div className='flex w-full h-full justify-center md:pt-8'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className='w-full max-w-3xl flex flex-row gap-4'>
                    <Tabs 
                        selectedKey={selected} 
                        onSelectionChange={(key) => setSelected(key.toString())}
                        aria-label="Tabs"
                    >
                        <Tab key="base" title={t("baseInfoTab")}/>
                        <Tab key="fields" title={t("fieldsTab")}/>
                    </Tabs>
                    {selected === "fields" ? <>
                        <div className='w-full flex flex-row justify-end'>
                            <Button 
                                variant='ghost' 
                                onClick={createDataField}
                                disabled={isLoading}
                            >
                                {t("createField")}
                            </Button>
                        </div>
                    </> : <></>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full  max-w-3xl flex flex-col gap-4 mb-20 md:mb-0'>
                    {selected === "base" ? <>
                        <CollectionBaseInfoTab
                            isLoading={isLoading}
                            themes={themes}
                            register={register}
                            formData={watch}
                            handleSetValue={setValue}
                            errors={errors}
                        />
                    </> : <>
                        <CollectionFieldsTab 
                            isLoading={isLoading}
                            types={types}
                            setFieldsValue={setValue}
                            customFields={watch('fields')}
                            removeDataField={removeDataField}
                            errors={errors}
                        />
                    </>}
                    <div className='w-full z-50 border-t-2 md:border-transparent bg-white fixed bottom-0 rounded-t-lg left-0 px-4 py-4 md:static md:pb-0 md:px-0'>
                        <Button 
                            className='w-full'
                            type='submit' 
                            color='success' 
                            variant='bordered'
                            isLoading={isLoading}
                        >
                            Create collection
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default CollectionCreationScreen;