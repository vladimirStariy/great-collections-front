import * as yup from "yup";

export const collectionValidationSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    theme: yup.number().required("Theme is required field."),
    fields: yup.array(yup.object({
        collectionId: yup.number(),
        name: yup.string().required("Name us a required field."),
        data_type: yup.string().required("Data type is required field"),
    })).required("Should")
});