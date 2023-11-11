import ru from './country-flags/ru.svg'
import en from './country-flags/gb-eng.svg'
import { LanguageIcon } from '../../../icons/icons';

interface ICountry {
    value: string;
    label: string;
    icon: string;
}

const LanguageSelect = () => {
    const countries: ICountry[] = [
        { value: 'ru', label: 'Russian', icon: ru },
        { value: 'en', label: 'English', icon: en }
    ];
    
    return <>  
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost"><LanguageIcon /></label>
            <ul tabIndex={0} className="top-16 dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-40">
                {countries.map((item) => {
                    return <>
                        <li value={item.value}>
                            <div className="flex flex-row">
                                <img 
                                    className='w-5'
                                    src={item.icon}
                                    alt='meme'
                                />
                                {item.label}
                            </div>
                        </li>
                    </>
                })}
            </ul>
        </div>
    </>
}

export default LanguageSelect;