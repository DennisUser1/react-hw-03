import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { FaRegUser } from 'react-icons/fa';
import { MdPhoneIphone } from "react-icons/md";
import { validationContactSchema } from '../../helpers/contactSchema';
import styles from './ContactForm.module.css';

export default function ContactForm({ addContact }) {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    addContact({
      id: nanoid(),
      name: values.name,
      number: values.number,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label className={styles.label} htmlFor={nameFieldId}>Name</label>
        <div className={styles.inputWrapper}>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            className={styles.input}
          />
          <FaRegUser className={clsx(styles.iconName)} />
        </div>
        <ErrorMessage name="name" component="span" className={styles.error} />

        <label className={styles.label} htmlFor={numberFieldId}>Number</label>
        <div className={styles.inputWrapper}>
          <Field
            type="tel"
            name="number"
            id={numberFieldId}
            className={styles.input}
          />
           <MdPhoneIphone className={clsx(styles.iconNumber)} />
        </div>
        <ErrorMessage name="number" component="span" className={styles.error} />

        <button type="submit" className={clsx(styles.addButton)}>
          Add Contact
        </button>
        <button type="reset" className={clsx(styles.resetButton)}>
          Reset
        </button>
      </Form>
    </Formik>
  );
};
