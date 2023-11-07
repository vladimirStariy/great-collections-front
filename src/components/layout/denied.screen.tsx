import { FC } from 'react'
import { Link } from 'react-router-dom';

interface IDeniedScreen {
    title: string;
    message: string;
}

const DeniedScreen: FC<IDeniedScreen> = (props) => {
    return <div className='flex w-full justify-center pt-8'>
        <div className='flex flex-col justify-center items-center w-full max-w-screen-2xl gap-8'>
            <div className='flex flex-col gap-8'>
                <div className='text-4xl'>{props.title}</div>
                <div>{props.message}</div>
            </div>
            <Link to='/' className='text-xl link'>Back to main screen</Link>
        </div>
    </div>
}

export default DeniedScreen;