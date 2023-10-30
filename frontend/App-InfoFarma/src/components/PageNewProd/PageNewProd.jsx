import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Typography, TextField, Button, InputAdornment, FormHelperText } from '@mui/material';
import { Footer } from '../Footer/Footer';

const camelCaseToNormalReadable = (camelCase) => {
  return camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

export const PageNewProd = () => {
  const initialValues = {
    nombreDelMedicamento: '',
    descripcionODetalles: '',
    direccionImagenDelMedicamento: '',
    tiendaFarmacia: '',
    precio: '',
  };

  const validate = (values) => {
    const errors = {};

    // Validación de campos vacíos
    for (const campo in values) {
      if (!values[campo]) {
        errors[campo] = 'Este campo es obligatorio, si no tienes la informacion escribe "N/A"';
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
      pharmacy_name: values.tiendaFarmacia,
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
              <Box key={campo} sx={{ marginBottom: '1rem' }}>
                <Field name={campo}>
                  {({ field, meta }) => (
                    <TextField
                      fullWidth
                      id={campo}
                      name={campo}
                      autoComplete={campo === 'tiendaFarmacia' ? 'on' : 'off'}
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
            ))}

            <Button color="inherit" variant="contained" fullWidth type="submit">
              Agregar Producto
            </Button>
          </Form>
        </Formik>
      </Box>
      <Footer />
    </>
  );
};
