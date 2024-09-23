import * as Yup from 'yup';

export const validationContactSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/^[\p{L}\s'-]+$/u, "Invalid name field symbols! Please, use only letters, spaces, or hyphens")
    .min(3, 'Too Short Name! Minimum characters: 3')
    .max(28, 'Too Long Name! Maximum characters: 28')
    .required('Here is a required field!'),
  number: Yup.string()
    .trim()
    .matches(/^[0-9+\-()\s]*$/, "Invalid symbols phone number! Please, use only digits and symbols. Example: + or - or ( or )")
    .min(7, 'Too Short Number! Minimum characters: 7')
    .max(19, 'Too Long Number! Maximum characters: 19')
    .required('Here is a required field!'),
});
