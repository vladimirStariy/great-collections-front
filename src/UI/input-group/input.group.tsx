import { FC, HTMLAttributes } from "react";

interface IInputGroup extends HTMLAttributes<HTMLInputElement> {
    label: string;
    name?: string;
    value?: string;
    type?: string;
} 

const InputGroup: FC<IInputGroup> = ({...props}) => {
    return (
        <div className='flex flex-col w-full max-w-lg gap-1 items-center'>
            <div className='text-xl font-bold'>{props.label}</div>
            <div></div> 
            <input 
                className="input input-bordered w-full max-w-xs"
                type={props.type && props.type}
                name={props.name && props.name}
                value={props.value && props.value} 
                {...props}
            />
        </div>
    )
}

export default InputGroup;