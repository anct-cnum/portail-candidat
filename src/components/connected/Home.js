import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../actions';
import Connected from '../connected';
import FormulaireSexeAge from './FormulaireSexeAge';

function Home() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const candidat = useSelector(state => state.conseiller?.conseiller);
  const error = useSelector(state => state.conseiller?.error);

  useEffect(() => {
    if (!error) {
      if (candidat?._id !== user?.entity?.$id) {
        dispatch(conseillerActions.get(user?.entity?.$id));
      }
    }
  }, [error]);

  return (
    <>
      {user?.role === 'candidat' && (!candidat || candidat?.sexe !== undefined) &&
        <Connected />
      }
      {user?.role === 'candidat' && candidat && candidat?.sexe === undefined &&
        <FormulaireSexeAge />
      }
    </>
  );
}

export default Home;
