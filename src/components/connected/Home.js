import React from 'react';
import { useSelector } from 'react-redux';
import Connected from '../connected';
import FormulaireSexeAge from './FormulaireSexeAge';

function Home() {

  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  return (
    <>
      { user?.role === 'candidat' && conseiller?.sexe !== undefined &&
        <Connected />
      }
      { conseiller?.sexe === undefined &&
        <FormulaireSexeAge />
      }
    </>
  );
}

export default Home;
