import * as Yup from 'yup';

export const validationContactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s-]+$/, "Must be a valid name! Name must contain only letters, spaces, or hyphens")
    .min(3, 'Too Short Name! Minimum characters: 3')
    .max(28, 'Too Long Name! Maximum characters: 28')
    .required('Here is a required field'),
  number: Yup.string()
    .trim()
    .matches(/^[0-9+\-()\s]*$/, "Must be a valid phone number! Phone number must contain only digits and symbols (+, -, ( , ))")
    .min(7, 'Too Short Number! Minimum characters: 7')
    .max(15, 'Too Long Number! Maximum characters: 15')
    .required('Here is a required field'),
});
