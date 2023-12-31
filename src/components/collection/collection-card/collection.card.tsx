import { FC } from "react";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import CollectionCardShadow from "./collection.shadow.card";
import { useTranslation } from "react-i18next";

interface ICollectionCard {
    name?: string;
    theme?: string;
    quantity?: number; 
    imagePath?: string;
    isEditable?: boolean;
    isLoading?: boolean;
}

const CollectionCard: FC<ICollectionCard> = (props) => {
    const { t } = useTranslation();
  
    return (
      <>
        {props.isLoading ? <>
          <CollectionCardShadow />
        </> : <>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-2">
              <p className="text-xl uppercase font-bold">{props.name}</p>
              <Chip className="cursor-pointer">{props.theme}</Chip>
              <p className="font-bold text-md">{props.quantity} {t("items")}</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                loading='lazy'
                onLoadStart={() => console.log('loading...')}
                alt="Card background"
                placeholder='/img_placeholder.jpg'
                className="object-cover w-full rounded-xl aspect-square"
                src={props.imagePath ? props.imagePath : '/img_placeholder.jpg'}
              />
            </CardBody>
          </Card>
        </>
        }
      </>
    );
}

export default CollectionCard;