import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
    Selection,
    Button,
    Input,
    SortDescriptor
} from "@nextui-org/react";
import { SearchIcon } from "../../components/icons/icons";

interface INextTable {
  data: any[];
  isSelectable?: boolean;
  href?: string;
  selected?: number[];
  handleSelect?: (selectedItems: number[] | string) => void;
  handleSelectAll?: (value: boolean) => void;
  isCreateable?: boolean;
  handleCreate?: () => void;
  isEditable?: boolean;
  handleUpdate?: () => void;
  isDeleteable?: boolean;
  handleDelete?: () => void;
  isCustomSearchProvided?: boolean;
  filterValue?: string;
}

interface IColumn {
  key: string;
  label: string;
  isSortable: boolean;
  isVisible: boolean;
}

interface IRow {
  [key: string]: any;
}

const NextTable: FC<INextTable> = (props) => {
  const [headers, setHeaders] = useState<IColumn[]>([]);
  const [rows, setRows] = useState<IRow[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredItems = [...rows];
    filteredItems = filteredItems.filter(item => 
      Object.entries(item).some(entry => 
        String(entry[1]).toLowerCase().includes(filterValue.toLowerCase())
      )
    )
    return filteredItems;
  }, [rows, filterValue, props.filterValue]);

  const items = useMemo(() => {
    return filteredItems
  }, [filteredItems])

  const sortedRows = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column ? sortDescriptor.column : -1];
      const second = b[sortDescriptor.column ? sortDescriptor.column : -1];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const headerColumns = useMemo(() => {
    console.log(headers.filter((column) => column.isVisible))
    return headers.filter((column) => column.isVisible)
  }, [headers])

  useEffect(() => {
    if(props.handleSelect) {
      if(selectedKeys === "all") {
        props.handleSelect(selectedKeys)
      } else {
        let arr = Array.from(selectedKeys) as number[];
        props.handleSelect(arr)
      }
    }
  }, [selectedKeys])

  useEffect(() => {
      const headers: IColumn[] = [];
      Object.keys(props.data[0]).map(item => {
        item !== 'IdKey' ? headers.push({key: item, label: item.toUpperCase(), isSortable: true, isVisible: true}) :
        headers.push({key: item, label: item.toUpperCase(), isSortable: true, isVisible: false})
      })
      setHeaders(headers);
      const data: IRow[] = [];
      props.data.map((item) => {
        data.push({key: item.id, ...item})
      })
      setRows(data);
  }, [props.data])

  useEffect(() => {
    if(props.filterValue !== undefined) {
      setFilterValue(props.filterValue)
    }
  }, [props.filterValue])

  return (
    <>
        <div className="w-full flex flex-col gap-4">
        {!props.isCustomSearchProvided ? 
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-3 items-end">
                <Input
                  isClearable
                  variant="bordered"
                  className="w-full sm:max-w-[44%]"
                  placeholder="Search..."
                  startContent={<SearchIcon />}
                  value={filterValue}
                  onClear={() => onClear()}
                  onValueChange={(e) => onSearchChange(e)}
              />
            </div>
          </div> : <></>
        }
        {rows.length > 0 && headers.length > 0 ? <>
          <Table 
            aria-label="Example table with dynamic content"
            selectedKeys={selectedKeys}
            {...props.isSelectable ? {selectionMode: "multiple"} : ''}

            onSelectionChange={(keys) => setSelectedKeys(keys)}
            {...props.isSelectable ? {selectionBehavior: "toggle"} : {selectionBehavior: "replace"}}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                column.isVisible ?
                <TableColumn 
                  key={column.key}
                  allowsSorting={column.isSortable}
                >
                    {column.label}
                </TableColumn> : <></>
              )}
            </TableHeader>
            <TableBody emptyContent={"No rows to display."} items={sortedRows}>
              {(item) => (
                <TableRow 
                  {... !props.isSelectable ? {className: 'cursor-pointer hover:bg-zinc-100 hover:rounded-full'} : ''}
                  {... !props.isSelectable ? {href: `${props.href}${item.IdKey}`} : {href: `${props.href}${item.IdKey}`}} 
                  key={item.id}
                >
                  {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </> : <></>}
      </div>
    </>
  );
}

export default NextTable;