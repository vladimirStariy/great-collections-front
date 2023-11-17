import { Button } from "@nextui-org/react"
import { ChangeEvent, FC, useRef } from "react"

interface ICustomUploader {
    buttonText: string
    allowedFileTypes?: string[]
    loading?: boolean
    onStart?: () => void
    onError?: (error: string) => void
    onSuccess: (file: File) => void
  }

const CustomUploader: FC<ICustomUploader> = (props) => {
    const uploadInputRef = useRef<HTMLInputElement>(null)
    
    const handleUploadButtonClick = () => {
        uploadInputRef.current && uploadInputRef.current.click()
    }

    const handleFileFieldClick = () => {
        if (uploadInputRef.current) {
            uploadInputRef.current.value = ''
        }
    }
    
    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        const fileType = file?.type;
        if(fileType) {
            if (props.allowedFileTypes && !props.allowedFileTypes.includes(fileType)) {
                return
            }
            props.onSuccess(file);
        }
    }

    return <>
        <div className="w-full flex justify-center">
            <Button onClick={handleUploadButtonClick} isLoading={props.loading}>
                {props.buttonText}
            </Button>
            <input
                className="hidden"
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                onClick={handleFileFieldClick}
            />
        </div>
    </>
}

export default CustomUploader;