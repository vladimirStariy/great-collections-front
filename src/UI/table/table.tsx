import { FC, useState, useEffect } from 'react';
import { IHeader } from './table.model';
import GreatCheckbox from './table.checkbox';

interface ITable {
    data: any[];
    isSelectable?: boolean;
    selected?: number[];
    handleSelect?: (value: boolean, id: number) => void;
    handleSelectAll?: (value: boolean) => void;
}

const GreatTable: FC<ITable> = (props) => {
    const [headers, setHeaders] = useState<IHeader[]>([]);

    useEffect(() => {
        const headers: IHeader[] = [];
        Object.keys(props.data[0]).forEach(item => headers.push({accessorKey: item, header: item}))
        setHeaders(headers);
    }, [props.data])

    return <>
        <table className="table">
            <thead>
                <tr>
                    {props.isSelectable && props.selected && props.handleSelectAll ? <>
                        <th className='flex flex-row items-center'>
                            <GreatCheckbox 
                                name={-1}
                                value={props.selected.length === props.data.length} 
                                handleSelect={props.handleSelectAll}
                            />
                        </th> 
                    </> : <></> }
                    {headers && headers.map((item, index) => {
                        return <th key={index}>
                            {item.header}
                        </th>
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data.map((item, index) => (
                    <tr key={index}>
                        {props.isSelectable && props.selected && props.handleSelect ? <>
                            <td className='flex flex-row items-center'>
                                <GreatCheckbox 
                                    name={item.id}
                                    value={props.selected.includes(item.id)} 
                                    handleSelect={props.handleSelect}
                                />
                            </td>
                        </> : <></> }
                        {headers && headers.map((head, _index) => (
                            <td key={_index}>
                                {`${item[head.accessorKey]}`}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

export default GreatTable;