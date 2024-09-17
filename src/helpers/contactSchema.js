import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Too Short! Min. characters: 3')
    .max(35, 'Too Long! Max. characters: 35')
    .matches(/^[A-Za-z\s-]+$/, "Must be a valid name!")
    .required('Name is required'),
  number: Yup.string()
    .trim()
    .min(7, 'Too Short! Min. characters: 7')
    .max(15, 'Too Long! Max. characters: 15')
    .matches(/^[0-9-]+$/, "Must be a valid phone number!")
    .required('Number is required'),
});
