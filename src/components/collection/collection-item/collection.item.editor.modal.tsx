import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { CollectionField, CollectionItem } from "../../../store/models/collection";
import {Checkbox} from "@nextui-org/react";

import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateCollectionItemMutation } from "../../../store/services/collection.service";

import { yupResolver } from "@hookform/resolvers/yup";
import { collectionItemValidationSchema } from "./item.validation.schema";

interface ICollectionItemEditor {
    fields: CollectionField[]
}

const CollectionItemEditorModal: FC<ICollectionItemEditor> = (props) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [createCollectiomItem] = useCreateCollectionItemMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CollectionItem>({resolver: yupResolver(collectionItemValidationSchema)})

  const submitForm: SubmitHandler<CollectionItem> = async (data) => {
    await createCollectiomItem(data);
  }

  const handleChangeFieldsValue = (id: number, e: ChangeEvent<HTMLInputElement>, isCheckbox?: boolean) => {
    let dataArr: any[] | undefined = [];
    if(watch('values') !== undefined) dataArr = watch('values');
    if(dataArr !== undefined) {
      if(isCheckbox) {
        let newArr = dataArr.map(obj => {
          if (obj.collectionFieldId === id) return {...obj, value: e.target.checked};
          return obj;
        }); 
        setValue('values', newArr);
      } else {
        let newArr = dataArr.map(obj => {
          if (obj.collectionFieldId === id) return {...obj, value: e.target.value};
          return obj;
        }); 
        setValue('values', newArr);
      }
    }
  }

  const inputValue = (index: number) => {
    let record: any[] | undefined = [];
    if(watch('values')) record = watch('values');
    if(record && record[index].value) {
      return record[index].value;
    } 
    return undefined;
  }

  const checker = () => {
    console.log(watch('values'))
  }

  useEffect(() => {
    let arr: any[] = [];
    props.fields.map((item) => {
        arr.push({
            id: 0, 
            collectionFieldId: item.id, 
            collectionItemId: 0,
            value: undefined
        })
    })
    let tags = [1,2,3]
    setValue('tags', tags)
    setValue('id', 0)
    setValue('collectionId', 1)
    setValue('values', arr)
    
  }, [props.fields])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Collection item editor</ModalHeader>
              <ModalBody>
                <form id="itemForm" onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
                    <Input {...register('name')}
                        label='Name' 
                        placeholder='Enter item name'
                    />
                    {props.fields.map((item, index) => (
                        <>
                            {item.data_type !== "BOOLEAN" ?
                                <>
                                    <Input
                                        onChange={(e) => handleChangeFieldsValue(item.id, e)}
                                        value={inputValue(index)}
                                        label={item.name}
                                        placeholder='Enter value'
                                        type={
                                            item.data_type === "VARCHAR" ? 'text' :
                                            item.data_type === "INTEGER" ? 'number' :
                                            'text'
                                        }
                                    />
                                </> : <>
                                    <Checkbox
                                      onChange={(e) => handleChangeFieldsValue(item.id, e, true)}

                                    >
                                      {item.name}
                                    </Checkbox>  
                                </>
                            }
                        </>
                    ))}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button onClick={checker}>cas</Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" form="itemForm" color="primary">
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CollectionItemEditorModal;