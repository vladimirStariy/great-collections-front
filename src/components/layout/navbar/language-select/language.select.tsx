import {Select, SelectItem, Avatar, Dropdown, DropdownTrigger} from "@nextui-org/react";
import { changeLanguage } from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
    const { t, i18n } = useTranslation();

    const setTranslation = (language: string) => {
        console.log(language)
        i18n.changeLanguage(language);
    }

    return (
      <Select
        label={`${t("language")}`}
        className="max-w-xs w-full"
        variant='bordered'
        onSelectionChange={(e) => setTranslation(Object.entries(e)[0][1])}
      >
        <SelectItem
          key="ru"
          startContent={<Avatar alt="Russian" className="w-6 h-6" src="https://flagcdn.com/ru.svg" />}
        >
          Русский
        </SelectItem>
        <SelectItem
          key="en"
          startContent={<Avatar alt="English" className="w-6 h-6" src="https://flagcdn.com/gb.svg" />}
        >
          English
        </SelectItem>
      </Select>
    );
}

export default LanguageSelect;