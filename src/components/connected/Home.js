import React from 'react';
import { useSelector } from 'react-redux';
import Connected from '../connected';

function Home() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <>
      { user?.role === 'candidat' &&
        <Connected />
      }
    </>
  );
}

export default Home;
