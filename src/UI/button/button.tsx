import { FC, HTMLAttributes } from "react";

interface IButton extends HTMLAttributes<HTMLButtonElement> {
    label: string;
    isLoading?: boolean;
} 

const Button: FC<IButton> = ({...props}) => {
    return (
        <button className="btn" {...props}>
            {props.isLoading ? 
                <>
                    <span className="loading loading-spinner loading-md"></span>
                </>
            :
                <>
                    {props.label}
                    {props.children}
                </>
            }
        </button>
    )
}

export default Button;