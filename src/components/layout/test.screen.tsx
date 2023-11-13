import { ChangeEvent, useState } from "react"
import { useUploadMutation } from "../../store/services/collection.service"

const TestScreen = () => {
    const [uploadedFile, setUploadedFile] = useState<FileList>();
    
    const [upload] = useUploadMutation();

    const handleUpload = (files: FileList) => {
        setUploadedFile(files);
    }

    const uploadFile = async () => {
        
        const file = uploadedFile?.item(0);
        if(file && file !== null) {
            const formData = new FormData();
            formData.append("file", file);

            const collection = {
                collectionData: {
                    name: 'test',
                    description: 'test',
                    theme: 'test',
                    formData: formData
                },
                fields: [
                    {
                        name: 'test',
                        data_type: 'STRING',
                        collectionId: 0
                    }
                ]
            }

            await upload(collection);
        }
    }

    return <>
    <form>
        <input 
            type="file" 
            onChange={(e) => e.target.files ? handleUpload(e.target.files) : ''} 
            className="file-input w-full max-w-xs" 
        />
    </form>
        <button onClick={uploadFile} className="btn btn-ghost">UPLOAD</button>
    </>
}

export default TestScreen;