import * as Yup from 'yup';

export const validationContactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s-]+$/, "Must be a valid name! Name must contain only letters, spaces, or hyphens")
    .min(3, 'Too Short! Min. characters: 3')
    .max(35, 'Too Long! Max. characters: 35')
    .required('Name is required'),
  number: Yup.string()
    .trim()
    .matches(/^[0-9-]+$/, "Must be a valid phone number! Phone number must contain only digits or hyphens")
    .min(7, 'Too Short! Min. characters: 7')
    .max(15, 'Too Long! Max. characters: 15')
    .required('Number is required'),
});
