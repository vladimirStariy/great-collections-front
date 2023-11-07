import ru from './country-flags/ru.svg'
import en from './country-flags/gb-eng.svg'

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
        <select className="select select-bordered w-full max-w-xs">
            {countries.map((item) => {
                return <>
                    <option value={item.value}>
                        <div className="flex flex-row">
                            <div style={{backgroundImage: item.icon, width: 20}}></div> 
                            {item.label}
                        </div>
                    </option>
                </>
            })}
        </select>
    </>
}

export default LanguageSelect;