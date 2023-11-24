import { FC } from "react";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import CollectionCardShadow from "./collection.shadow.card";
import { useTranslation } from "react-i18next";
import { Tag } from "../../../store/models/tag";

interface ICollectionItemCard {
    name?: string;
    tags?: Tag[];
    isEditable?: boolean;
    createdAt?: Date;
    isLoading?: boolean;
}

const CollectionItemCard: FC<ICollectionItemCard> = (props) => {
    const { t } = useTranslation();
  
    const date = (rawDate: Date) => {
        function padTo2Digits(num: number) {
            return num.toString().padStart(2, '0');
        }
        const date = new Date(rawDate)
        const formattedDate = [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') + 
        ' ' + 
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
        return formattedDate;
    } 

    return (
      <>
        {props.isLoading ? <>
          <CollectionCardShadow />
        </> : <>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-2">
              <p className="text-xl uppercase font-bold">{props.name}</p>
              <p className="text-md uppercase">Added: {props.createdAt && date(props.createdAt)}</p>
            </CardHeader>
            <CardBody className="overflow-visible flex flex-row gap-4 py-2">
              {props.tags?.map((item) => (
                <Chip className="cursor-pointer">
                    {item.name}
                </Chip>
              ))}
            </CardBody>
          </Card>
        </>
        }
      </>
    );
}

export default CollectionItemCard;