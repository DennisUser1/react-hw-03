import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react'; 
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { FaRegUser } from 'react-icons/fa';
import { MdPhoneIphone } from "react-icons/md";
import { HiInformationCircle } from 'react-icons/hi';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { validationContactSchema } from '../../helpers/contactSchema';
import styles from './ContactForm.module.css';
import React from 'react';

const formatPhoneNumber = (value) => {
  const allowedCodes = ['+38', '+1', '+49', '+48', '+33'];
  const cleaned = value.replace(/[^\d+]/g, '');
  const countryCode = allowedCodes.find(code => cleaned.startsWith(code));

  if (countryCode) {
    const withoutCode = cleaned.slice(countryCode.length);
    const match = withoutCode.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

    if (match) {
      const part1 = match[1] ? ` (${match[1]})` : '';
      const part2 = match[2] ? `-${match[2]}` : '';
      const part3 = match[3] ? `-${match[3]}` : '';
      const part4 = match[4] ? `-${match[4]}` : '';
      return `${countryCode}${part1}${part2}${part3}${part4}`;
    }
  }

  return value; 
};

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

  const handleNumberChange = (event, setFieldValue) => {
    const formatted = formatPhoneNumber(event.target.value);
    setFieldValue('number', formatted);
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationContactSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <label className={`${styles.label} ${styles.labelName}`} htmlFor={nameFieldId}>Name</label>
          <div className={styles.inputWrapper}>
            <Field
              type="text"
              name="name"
              id={nameFieldId}
              className={styles.input}
              autoComplete="off"
              autoFocus
              placeholder="Enter full name"
            />
            <FaRegUser className={clsx(styles.iconName)} />
          </div>
          <ErrorMessage name="name" component="span" className={styles.error} />

          <div className={styles.numberLabelWrapper}>
            <label className={styles.label} htmlFor={numberFieldId}>Number</label>
            
            <Tippy 
              content = {
                <div>
                  <div className='marginTitleInfoTippy'>
                    <strong className='titleInfoTippy'>Supported Countries:</strong>
                      <ul>
                        <li><span className='boldCountryInfo'>Ukraine:</span> +38 (xxx)-xxx-xx-xx</li>
                        <li><span className='boldCountryInfo'>USA:</span> +1 (xxx)-xxx-xxxx</li>
                        <li><span className='boldCountryInfo'>Germany:</span> +49 (xxx)-xxx-xxxx</li>
                        <li><span className='boldCountryInfo'>Poland:</span> +48 (xxx)-xxx-xxx</li>
                        <li><span className='boldCountryInfo'>France:</span> +33 (xx)-xx-xx-xx-xx</li>
                      </ul>
                  </div> 
                  <strong className='titleInfoTippy'>Input Format:</strong>
                  <p className='textInfoTippy'>Just type the + sign and the numbers, spaces, and other symbols will be added automatically.</p>
                </div>
              }
              arrow
              placement="top"
            >
              <span className={styles.spanWrapper}>
                <HiInformationCircle className={styles.infoIcon} aria-label="Help information for phone input" />
              </span>
            </Tippy>
          </div>

          <div className={styles.inputWrapper}>
            <Field
              type="tel"
              name="number"
              id={numberFieldId}
              className={styles.input}
              autoComplete="off"
              placeholder="+xx (xxx)-xxx-xx-xx"
              onChange={(event) => handleNumberChange(event, setFieldValue)}
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
      )}
    </Formik>
  );
};
