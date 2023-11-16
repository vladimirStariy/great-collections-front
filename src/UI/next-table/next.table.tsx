import { FC, useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
    Selection,
    Button
} from "@nextui-org/react";

interface INextTable {
  data: any[];
  isSelectable?: boolean;
  selected?: number[];
  handleSelect?: (value: boolean, id: number) => void;
  handleSelectAll?: (value: boolean) => void;
}

interface IColumn {
  key: string;
  label: string;
}

interface IRow {
  [key: string]: any;
}

const NextTable: FC<INextTable> = (props) => {
  const [headers, setHeaders] = useState<IColumn[]>([]);
  const [rows, setRows] = useState<IRow[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  useEffect(() => {
    let a = Object.entries(selectedKeys)
    console.log(a)
  }, [selectedKeys])

  useEffect(() => {
      const headers: IColumn[] = [];
      Object.keys(props.data[0]).forEach(item => headers.push({key: item, label: item.toUpperCase()}))
      setHeaders(headers);
      const data: IRow[] = [];
      props.data.map((item) => {
        data.push({key: item.id, ...item})
      })
      setRows(data);
  }, [props.data])

  return (
    <>
      {rows.length > 0 && headers.length > 0 ? <>
        <Table 
          aria-label="Example table with dynamic content"
          selectedKeys={selectedKeys}
          {...props.isSelectable ? {selectionMode: "multiple"} : ''}
          onSelectionChange={(keys) => setSelectedKeys(keys)}
          {...props.isSelectable ? {selectionBehavior: "toggle"} : {selectionBehavior: "replace"}}
        >
          <TableHeader columns={headers}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody emptyContent={"No rows to display."} items={rows}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </> : <></>
      }
    </>
  );
}

export default NextTable;