import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Header from '../common/Header';
import Documents from './Documents';
import Informations from './Informations';
import Menu from './Menu';
import Welcome from './Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../actions';

function Connected() {
  const dispatch = useDispatch();
  const { $id } = useSelector(state => state.authentication.user?.user.entity);

  useEffect(() => {
    dispatch(conseillerActions.get($id));
  }, []);

  return (
    <>
      <Header connected/>
      <div className="fr-container-fluid fr-mt-8w">
        <div className="fr-grid-row">
          <div className="fr-col-1"></div>
          <div className="fr-col-3">
            <Menu />
          </div>
          <div className="fr-col-7">
            <Route path={`/accueil`} component={Welcome} />
            <Route path={`/informations`} component={Informations} />
            <Route path={`/documents`} component={Documents} />
          </div>
          <div className="fr-col-1"></div>
        </div>
      </div>
    </>
  );
}

export default Connected;
