import * as yup from "yup";

export const collectionItemValidationSchema = yup.object().shape({
    id: yup.number(),
    name: yup.string().required("Name is a required field."),
    collectionId: yup.number(),
    tags: yup.array(),
    values: yup.array(yup.object({
        id: yup.number().required("test"),
        collectionFieldId: yup.number().required("test"),
        collectionItemId: yup.number().required("test"),
        value: yup.string().required("Name us a required field."),
    })).required("The")
});