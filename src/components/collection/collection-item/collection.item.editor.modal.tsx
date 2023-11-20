import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Chip, SelectItem} from "@nextui-org/react";
import { CollectionField, CollectionItem } from "../../../store/models/collection";
import {Checkbox} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateCollectionItemMutation } from "../../../store/services/collection.service";
import Select from 'react-select/creatable'
import { yupResolver } from "@hookform/resolvers/yup";
import { collectionItemValidationSchema } from "./item.validation.schema";

interface ICollectionItemEditor {
    collectionId: number;
    fields: CollectionField[];
    handleRefetch: () => void;
}

const CollectionItemEditorModal: FC<ICollectionItemEditor> = (props) => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

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
    props.handleRefetch();
    onClose();
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
    setValue('collectionId', props.collectionId)
    setValue('values', arr)
    
  }, [props.fields])

  const mockData = [
    {
      value: 1,
      label: 'ЙЦУКЕНГШЩЗ'
    },
    {
      value: 2,
      label: 'ЙЦУКЕЬМВО'
    },
    {
      value: 3,
      label: 'ЙЦУРАЫВИАНЫВПАН'
    },
    {
      value: 4,
      label: 'Tag 4'
    },
    {
      value: 5,
      label: 'Tag 5'
    },
    {
      value: 6,
      label: 'Tag 6'
    },
    {
      value: 7,
      label: 'Tag 7'
    },
    {
      value: 8,
      label: 'Tag 8'
    },
  ]

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Collection item editor</ModalHeader>
              <ModalBody>
                <form id="itemForm" onSubmit={handleSubmit(submitForm)} className="w-full flex flex-row gap-4">
                    <div className="flex flex-col w-full gap-4"> 
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
                    </div>
                    <div className="w-full">
                      <Select
                        placeholder='Select a tags'
                        options={mockData}
                        isMulti 
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: base => ({...base, zIndex: 99999}),
                          control: base => ({...base, borderRadius: 10, minHeight: '3.5rem'}),
                        }}
                      />
                    </div>
                </form>
              </ModalBody>
              <ModalFooter>
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