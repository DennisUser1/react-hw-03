import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react'; 
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { FaRegUser } from 'react-icons/fa';
import { MdPhoneIphone } from "react-icons/md";
import { HiInformationCircle } from 'react-icons/hi';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'flag-icon-css/css/flag-icons.css';
import { validationContactSchema } from '../../helpers/contactSchema';
import styles from './ContactForm.module.css';
import React from 'react';

const formatPhoneNumber = (value) => {
  const allowedCodes = ['+38', '+1', '+49', '+48', '+33'];
  const cleaned = value.replace(/[^\d+]/g, ''); 

  if (cleaned.length == 0) return '';

  let formatted = cleaned;
  if (!formatted.startsWith('+')) {
      formatted = '+' + formatted; 
  }

  const countryCode = allowedCodes.find(code => formatted.startsWith(code));
  if (countryCode) {
      const withoutCode = formatted.slice(countryCode.length);
      let formattedNumber = '';

      switch (countryCode) {
          case '+38': // Ukraine
              const matchUA = withoutCode.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
              if (matchUA) {
                  formattedNumber = `+38 (${matchUA[1]})-${matchUA[2]}-${matchUA[3]}-${matchUA[4]}`;
              }
              break;

          case '+1': // USA
              const matchUS = withoutCode.match(/^(\d{3})(\d{3})(\d{4})$/);
              if (matchUS) {
                  formattedNumber = `+1 (${matchUS[1]})-${matchUS[2]}-${matchUS[3]}`;
              }
              break;

          case '+49': // Germany
              const matchDE = withoutCode.match(/^(\d{3})(\d{3})(\d{4})$/);
              if (matchDE) {
                  formattedNumber = `+49 (${matchDE[1]})-${matchDE[2]}-${matchDE[3]}`;
              }
              break;

          case '+48': // Poland
              const matchPL = withoutCode.match(/^(\d{3})(\d{3})(\d{3})$/);
              if (matchPL) {
                  formattedNumber = `+48 (${matchPL[1]})-${matchPL[2]}-${matchPL[3]}`;
              }
              break;

          case '+33': // France
              const matchFR = withoutCode.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
              if (matchFR) {
                  formattedNumber = `+33 (${matchFR[1]})-${matchFR[2]}-${matchFR[3]}-${matchFR[4]}-${matchFR[5]}`;
              }
              break;

          default:
              return formatted; 
      }
      return formattedNumber || value; 
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
                        <li>
                          <span className='flag-icon flag-icon-ua'></span>
                          <span className='boldCountryInfo'>Ukraine:</span> +38 (xxx)-xxx-xx-xx
                        </li>
                        <li>
                          <span className='flag-icon flag-icon-us'></span>
                          <span className='boldCountryInfo'>USA:</span> +1 (xxx)-xxx-xxxx
                        </li>
                        <li>
                          <span className='flag-icon flag-icon-de'></span>
                            <span className='boldCountryInfo'>Germany:</span> +49 (xxx)-xxx-xxxx
                        </li>
                        <li>
                          <span className='flag-icon flag-icon-pl'></span>
                            <span className='boldCountryInfo'>Poland:</span> +48 (xxx)-xxx-xxx
                        </li>
                        <li>
                          <span className='flag-icon flag-icon-fr'></span>
                            <span className='boldCountryInfo'>France:</span> +33 (xx)-xx-xx-xx-xx
                        </li>
                      </ul>
                  </div> 
                  <strong className='titleInfoTippy'>Input Format:</strong>
                  <p className='textInfoTippy'>Just enter the numbers, the “+” symbol, spaces, and other characters will be added automatically. For example, 14155551234.</p>
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
