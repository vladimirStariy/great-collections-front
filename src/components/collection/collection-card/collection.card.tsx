import { FC } from "react";
import { Link } from "react-router-dom";
import { TrashIcon, WhiteTrashIcon } from "../../icons/icons";
import {Card, CardHeader, CardBody, Image, Snippet, Badge, Chip} from "@nextui-org/react";
import CollectionCardShadow from "./collection.shadow.card";

interface ICollectionCard {
    name?: string;
    theme?: string;
    quantity?: number; 
    imagePath?: string;
    isEditable?: boolean;
    isLoading?: boolean;
}

const CollectionCard: FC<ICollectionCard> = (props) => {
    return (
      <>
        {props.isLoading ? <>
          <CollectionCardShadow />
        </> : <>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-2">
              <p className="text-xl uppercase font-bold">{props.name}</p>
              <Chip className="cursor-pointer">{props.theme}</Chip>
              <p className="font-bold text-md">{props.quantity} items</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                isZoomed
                onLoadStart={() => console.log('loading...')}
                alt="Card background"
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