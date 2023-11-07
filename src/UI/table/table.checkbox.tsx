import { FC, HTMLAttributes } from 'react';

interface ICustomCheckbox extends HTMLAttributes<HTMLInputElement> {
    name: number;
    handleSelect: (value: boolean, id: number) => void;
    value: boolean;
}

const GreatCheckbox: FC<ICustomCheckbox> = (props) => {
       
    const handleCheckChange = () => {
        props.handleSelect(!props.value, props.name)
    }

    return <>
        <input className="checkbox checkbox-md" type="checkbox" 
               id={`${props.name}-checkbox`}
               name={`${props.name}`}
               checked={props.value} 
               onChange={handleCheckChange}
        />
    </>
}

export default GreatCheckbox;