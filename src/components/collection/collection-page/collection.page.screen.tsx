import { FC, useCallback, useEffect, useState } from "react";

import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import NextTable from "../../../UI/next-table/next.table";
import { useParams } from "react-router-dom";
import { useGetCollectionByIdQuery } from "../../../store/services/collection.service";
import { GetCollectionResponse } from "../../../store/models/collection";
import CollectionItemEditorModal from "../collection-item/collection.item.editor.modal";
import { BreadcrumbItem, Breadcrumbs, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image, Input, Avatar } from "@nextui-org/react";
import { MoreIcon, SearchIcon } from "../../icons/icons";

const CollectionPage: FC = () => {
    const {id} = useParams();
    const [baseInfo, setBaseInfo] = useState<GetCollectionResponse>()
    const [tableData, setTableData] = useState<any[]>([]);
    const [mode, setMode] = useState<string>("watch");
    const {data, isLoading, isSuccess, refetch} = useGetCollectionByIdQuery(Number(id))

    const [filterValue, setFilterValue] = useState<string>("");

    const onSearchChange = useCallback((value: string) => {
        if (value) {
          setFilterValue(value);
        } else {
          setFilterValue("");
        }
    }, []);

    const handleErrorLoadImage = (error: any) => {
        error.target.src = '/img_placeholder.jpg'
    }

    const dataConstruct = () => {
        if(baseInfo) {
            let newItemArr = baseInfo.collectionItems.map((item, index) => {
                const obj: Record<string, any> = {};
                obj['id'] = index + 1;
                obj['IdKey'] = item.id; 
                obj['name'] = item.name;
                item.values.map((fieldValue, index) => {
                    obj[baseInfo.collectionFields[index].name] = fieldValue.value;
                })
                return obj;
            })
            setTableData(newItemArr);
            return true;
        }
        return false;
    }

    const onClear = useCallback(()=>{
        setFilterValue("")
    },[])

    const reloadData = () => {
        refetch()
    }

    useEffect(() => {
        dataConstruct();
    }, [baseInfo])

    useEffect(() => {
        setBaseInfo(data);
        if(baseInfo) dataConstruct();
        if(isSuccess) setMode(data.mode)
    }, [data])

    return <>
        <Breadcrumbs size='lg' className="px-4 pb-8" underline='hover'>
            <BreadcrumbItem href="/collections">Collections</BreadcrumbItem>
            <BreadcrumbItem>{baseInfo?.collection.name}</BreadcrumbItem>
        </Breadcrumbs>
        <div className="w-full flex justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 p-8 rounded-lg">
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-center'>
                <div className="flex flex-row gap-4 w-full justify-start">
                    <div className="rounded-lg overflow-hidden">
                        <Image
                            alt="Card background"
                            className="max-w-xs object-cover w-full rounded-xl aspect-square"
                            src={baseInfo?.collection.imagePath ? baseInfo.collection.imagePath : '/img_placeholder.jpg'}
                        />
                    </div>
                    <div className="flex flex-col text-white gap-4">
                        <div className="text-3xl font-black text-bold ">
                            {!isLoading && baseInfo && baseInfo.collection.name}
                        </div>
                        <div className="text-xl">
                            <Markdown remarkPlugins={[remarkGfm]} className='' children={baseInfo?.collection.description} />
                        </div>
                    </div>
                    <div>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    as="button"
                                    className="transition-transform"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                >
                                    <MoreIcon />
                                </Avatar>
                                
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                <DropdownItem
                                    key="new"
                                    shortcut="⌘N"
                                >
                                    New file
                                </DropdownItem>
                                <DropdownItem
                                    key="copy"
                                    shortcut="⌘C"
                                >
                                    Copy link
                                </DropdownItem>
                                <DropdownItem
                                    key="edit"
                                    shortcut="⌘⇧E"
                                >
                                    Edit file
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    shortcut="⌘⇧D"
                                >
                                    Delete file
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex w-full justify-center pt-4'>
            <div className='flex flex-col w-full max-w-screen-2xl gap-4 justify-center items-start'>
                
                <div className="flex flex-row w-full justify-between items-center">
                    { baseInfo && baseInfo.collectionFields && mode === "edit" ?
                        <div className="flex flex-row gap-4">
                            <CollectionItemEditorModal
                                handleRefetch={reloadData} 
                                fields={baseInfo.collectionFields}
                                collectionId={baseInfo.collection.id}
                            />
                            <Button variant="bordered">Edit item</Button>
                            <Button variant="bordered">Remove item</Button>
                        </div>
                        :
                        <></>
                    }
                    <div className="">
                        <Input 
                            variant='bordered'
                            startContent={<SearchIcon />}
                            placeholder="Search..." 
                            value={filterValue}
                            onValueChange={(e) => onSearchChange(e)}
                            onClear={() => onClear()}
                        />
                    </div>
                </div>
                { tableData && tableData.length > 0 ? <>
                </> : <>
                    <div className="w-full text-center text-3xl font-black text-bold">
                        Theres no items yet.
                    </div>
                </>
                }
                { tableData && tableData.length > 0 ? 
                    <NextTable 
                        isCustomSearchProvided
                        filterValue={filterValue}
                        isSelectable={mode === "edit" ? true : false}
                        href="/collection-item/"
                        data={tableData}
                    /> : <></>
                }
            </div>
        </div>
    </>
}

export default CollectionPage;