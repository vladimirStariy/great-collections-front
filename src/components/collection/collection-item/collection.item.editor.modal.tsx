import { ChangeEvent, FC, useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { CollectionField, CollectionItem } from "../../../store/models/collection";
import {Checkbox} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateCollectionItemMutation } from "../../../store/services/collection.service";
import Select from 'react-select/creatable'
import { yupResolver } from "@hookform/resolvers/yup";
import { collectionItemValidationSchema } from "./item.validation.schema";
import { Tag, TagOption } from "../../../store/models/tag";
import { useGetTagsQuery } from "../../../store/services/tag.service";

interface ICollectionItemEditor {
    collectionId: number;
    fields: CollectionField[];
    handleRefetch: () => void;
}

const CollectionItemEditorModal: FC<ICollectionItemEditor> = (props) => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [createCollectiomItem] = useCreateCollectionItemMutation();
  const {data: tagsCollection} = useGetTagsQuery();
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CollectionItem>({resolver: yupResolver(collectionItemValidationSchema)})

  const submitForm: SubmitHandler<CollectionItem> = async (data) => {
    await setValue('tags', tags)
    await createCollectiomItem(data);
    props.handleRefetch();
    onClose();
  }

  const handleCreateTag = (tag: string) => {
    setTagOptions((prev) => [...prev, {label: tag, value: tag }])
  }

  const handleSelectTag = (e: any) => {
    let tags: Tag[] = [];
    e.map((item: any) => {
        if(Number(item.value)) {
          tags.push({id: Number(item.value), name: item.label});
        } else {
          tags.push({id: 0, name: item.label })
        }
    });
    setTags(tags);
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

  useEffect(() => {
    if(tagsCollection && tagsCollection.tags) {
      let options: {value: string; label: string}[] = [];
      tagsCollection.tags.map((item, index) => {
        options.push({value: item.id.toString(), label: item.name});
      })
      setTagOptions(options);
    }
  }, [tagsCollection])

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
    setValue('tags', tags)
    setValue('id', 0)
    setValue('collectionId', props.collectionId)
    setValue('values', arr)
  }, [props.fields])

  return (
    <>
      <Button className="w-full" variant='bordered' onPress={onOpen}>Create item</Button>
      <Modal size="xl" className="top-0 md:top-auto" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
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
                        onCreateOption={(e) => handleCreateTag(e)}
                        onChange={(e) => handleSelectTag(e)}
                        placeholder='Select a tags'
                        options={tagOptions}
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