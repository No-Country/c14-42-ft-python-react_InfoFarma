import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postSuggestion } from '../../middlewares/redux/actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Box, Typography, TextField, Button, InputAdornment, FormHelperText, Snackbar, Slide } from '@mui/material';
import { Footer } from '../Footer/Footer';
import { Widget } from "@uploadcare/react-widget";
import styles from './PageNewProd.module.css'

const camelCaseToNormalReadable = (camelCase) => {
  return camelCase
    .replace(/([A-Z])/g, ' \$1')
    .toLowerCase()
    .replace(/^(.)/, (str) => str.toUpperCase());
};

export default function PageNewProd () {
  const [widgetValue, setWidgetValue] = useState();

  //Lógica del SnackBar
  const [suggestionSuccess, setSuggestionSuccess] = useState('')

  const [snack, setSnack] = useState(false)

  const handleSnackClose = () => {
    setSnack(false)
  }
  const handleSnackOpen = () => {
    setSnack(true)
  }
  const isSnackbarOpen = (suggestionSuccess, snack) => {
    return typeof suggestionSuccess === "boolean" && typeof snack === "boolean" && suggestionSuccess && snack;
  };


  const dispatch = useDispatch();

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
    }

    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    const dataToSend = {
      price: values.precio,
      details: values.descripcionODetalles,
      img: values.direccionImagenDelMedicamento,
      medicine_name: values.nombreDelMedicamento,
      pharmacy_name: values.tiendaOFarmacia,
    };

    // Se envían los datos al endpoint
    dispatch(postSuggestion(dataToSend))
    
    setSuggestionSuccess(true);
    resetForm()
    setWidgetValue(null)
  };


  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '32rem',
        m: '0 auto',
        mt: '8rem',
        mb: '6rem',
        p: '0 2rem'
      }}>
        <Typography variant="h4" color={'primary'} sx={{ mb: '1rem', textAlign: 'center' }}>Agregar un nuevo producto</Typography>
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

            <Field>
              {({ field, meta }) => (
                <div className={styles.divWidget}>
                  <Widget
                    publicKey='da7189a159abe1a7e2ee'
                    id='file'
                    onChange={fileInfo => field.onChange('direccionImagenDelMedicamento')(fileInfo.cdnUrl)}
                    tabs="file url gphotos"
                    locale="es"
                    name="direccionImagenDelMedicamento"
                    value={widgetValue}
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

            <Button color="primary" variant="contained" fullWidth type="submit" onClick={handleSnackOpen}>
              Agregar Producto
            </Button>
          </Form>
        </Formik>
      </Box>
      <Snackbar
        open={isSnackbarOpen(suggestionSuccess, snack)}
        autoHideDuration={2200}
        onClose={handleSnackClose}
        message="¡Sugerencia enviada! Nuestro equipo la estará revisando en breve."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "left" }}
      />
      <Footer />
    </>
  );
};
