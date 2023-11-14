import { ChangeEvent, FormEvent, useState } from "react"
import { useCreateCollectionMutation } from "../../store/services/collection.service"
import { ICreateCollectionRequest } from "../../store/models/collection";

const TestScreen = () => {
    const formData = new FormData();
    const [formDataState, setFormData] = useState<ICreateCollectionRequest>({
        name: 'test',
        description: 'test',
        theme: 'test',
        fields: [
            {
                name: 'test',
                data_type: 'STRING',
                collectionId: 0
            },
            {
                name: 'test',
                data_type: 'STRING',
                collectionId: 0
            }
        ]
    })
    
    const [upload] = useCreateCollectionMutation();

    const handleChangeFormData = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeFormDataImage = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
        const file = files?.item(0);
        if(file) formData.append('file', file);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        Object.entries(formDataState).forEach(([key, value]) => {
            if(key !== 'fields')
            formData.append(key, value)
        })
        Object.entries(formDataState.fields).map((item, index) => {
            formData.append(`fields[${item[0]}]`, JSON.stringify(item[1]))
        })
        upload(formData)
    }

    return <>
    <form onSubmit={handleSubmit}>
        <input 
            type="file"
            name="image" 
            onChange={(e) => e.target.files ? handleChangeFormDataImage(e) : ''} 
            className="file-input w-full max-w-xs" 
        />
        <button onClick={handleSubmit} className="btn btn-ghost">UPLOAD</button>
    </form>
    </>
}

export default TestScreen;