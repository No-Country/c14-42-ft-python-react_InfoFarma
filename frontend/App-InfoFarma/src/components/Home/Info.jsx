import { CssBaseline, Container } from '@mui/material';
import styled from '@emotion/styled';

const PageContainer = styled(Container)`
  padding-top: 5.5em;
  background-color: #55804F;
  min-height: 100vh;
  min-width: 100vw;
  display: flex !important;
  flex-direction: column;
  font-family: 'Roboto Condensed';
  color: #FFF;
`;

const Title = styled('div')`
    font-size: 1.3em;
    .title {
        text-align: center;
        margin: 0;
    }
    .InfoFarma {
        font-family: 'Big Shoulders Display';
        color: #FFF;
    }

    @media (min-width: 600px) {
        font-size: 2rem;
    }
  
    @media (min-width: 960px) {
        font-size: 2.3rem;
    }
`;

const Text = styled('div')`
  font-size: 1.1em;
  text-align: center;
  margin: 1em 1em;
  padding: 0;
  
  @media (min-width: 600px) {
      font-size: 1.3em;
      text-align: center;
      margin: 1em 4em;
      padding: 0;
    }

  @media (min-width: 900px) {
    font-size: 1.5em;
    margin: 1em 6em;
  }
`;

const StandOut = styled('div')`
  font-size: 1.1em;
  text-align: center;
  margin: .5em 0;
  padding: 0;

  @media (min-width: 700px) {
    font-size: 1.3em;
    text-align: center;
    margin: 1em 0;
    padding: 0;
  }

  @media (min-width: 960px) {
    font-size: 1.5em;
    margin: 1em 0;
  }
`;

export const Info = () => {
  return (
    <CssBaseline>
      <PageContainer>
        <Title>
          <h1 className='title'>¿Qué es <span className='InfoFarma'>InfoFarma</span>?</h1>
          <h1 className='title'>¿Cómo funciona?</h1>
        </Title>
        <Text>
          <h2>InfoFarma es una guía y un directorio médico que ofrece información sobre medicamentos y padecimientos, recopilada por nuestros desarrolladores desde sitios web confiables, basados en guías escritas por médicos acreditados en cada descripción</h2>
          <h2>Además, en nuestra web se pueden comparar precios de los medicamentos generales y con receta, ofreciendo el más conveniente y cercano a vos.</h2>
          <h2>En nuestro buscador encontrarás guías escritas por médicos acreditados y uso de más de 900 medicamentos y productos disponibles en las farmacias y laboratorios más populares de nuestro país.</h2>
          <StandOut>
            <h2>¡Tu salud es lo más importante!</h2>
          </StandOut>
        </Text>
      </PageContainer>
    </CssBaseline>
  )
}
