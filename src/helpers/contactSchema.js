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
    .matches(/^\+?(38|1|49|48|33)\s?\(?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/, "Invalid phone number! Please use the format: +xx (xxx)-xxx-xx-xx")
    .min(13, 'Too Short Number! Minimum characters: 13')
    .max(19, 'Too Long Number! Maximum characters: 19')
    .required('Here is a required field!'),
});
