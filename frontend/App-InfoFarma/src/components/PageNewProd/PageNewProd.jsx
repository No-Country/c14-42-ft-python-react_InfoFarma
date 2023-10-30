import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Typography, TextField, Button, InputAdornment, FormHelperText } from '@mui/material';
import { Footer } from '../Footer/Footer';
import { Widget } from "@uploadcare/react-widget";
import styled from "@emotion/styled";
import styles from './PageNewProd.module.css'

const camelCaseToNormalReadable = (camelCase) => {
  return camelCase
    .replace(/([A-Z])/g, ' \$1')
    .toLowerCase()
    .replace(/^(.)/, (str) => str.toUpperCase());
};

export const PageNewProd = () => {

  const initialValues = {
    nombreDelMedicamento: '',
    descripcionODetalles: '',
    direccionImagenDelMedicamento: '',
    tiendaOFarmacia: '',
    precio: '',
  };

  const validate = (values) => {
    const errors = {};

    // Validación de campos vacíos
    for (const campo in values) {
      if (!values[campo]) {
        errors[campo] = 'Este campo es obligatorio, si no tienes la informacion escribe "N/A"';
      }
      if (!values[direccionImagenDelMedicamento]) {
        errors[direccionImagenDelMedicamento] = 'Este campo es obligatorio, si no tienes la informacion escribe "N/A"';
      }
    }

    return errors;
  };

  const handleSubmit = (values) => {
    const dataToSend = {
      price: values.precio,
      details: values.descripcionODetalles,
      img: values.direccionImagenDelMedicamento,
      name: values.nombreDelMedicamento,
      pharmacy_name: values.tiendaOFarmacia,
    };

    console.log('Datos a enviar:', dataToSend);
    // Esperando el endpoint al que se le enviarán los datos.
  };


  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '32rem',
        margin: '3rem auto',
        padding: '0 2rem'
      }}>
        <Typography variant="h5" sx={{ marginBottom: '1rem', textAlign: 'center' }}>Agregar un nuevo producto</Typography>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form>
            {Object.keys(initialValues).map((campo) => (
              campo !== 'direccionImagenDelMedicamento' ? (
                <Box key={campo} sx={{ mt:'1rem', mb: '1rem' }}>
                  <Field name={campo}>
                    {({ field, meta }) => (
                      <TextField
                        fullWidth
                        id={campo}
                        name={campo}
                        autoComplete={campo === 'tiendaOFarmacia' ? 'on' : 'off'}
                        label={camelCaseToNormalReadable(campo)}
                        variant="outlined"
                        {...field}
                        type={campo === 'precio' ? 'number' : 'text'}
                        InputProps={
                          campo === 'precio'
                            ? {
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }
                            : {}
                        }
                        error={meta.touched && meta.error ? true : false}
                      />
                    )}
                  </Field>
                  <FormHelperText error>
                    <ErrorMessage name={campo} />
                  </FormHelperText>
                </Box>
              ) : null
            ))}

            <Field name="direccionImagenDelMedicamento">
              {({ field, meta }) => (
                <div className={styles.divWidget}>
                  <Widget
                    publicKey='da7189a159abe1a7e2ee'
                    id='file'
                    onChange={fileInfo => field.onChange('direccionImagenDelMedicamento')(fileInfo.cdnUrl)}
                    tabs="file url gphotos"
                    locale="es"
                    name="image"
                    imagesOnly
                    previewStep
                    clearable
                  />
                  {meta.touched && meta.error ? (
                    <FormHelperText error>
                      <ErrorMessage name="direccionImagenDelMedicamento" />
                    </FormHelperText>
                  ) : null}
                </div >
              )}
            </Field>

            <Button color="primary" variant="contained" fullWidth type="submit">
              Agregar Producto
            </Button>
          </Form>
        </Formik>
      </Box>
      <Footer />
    </>
  );
};
