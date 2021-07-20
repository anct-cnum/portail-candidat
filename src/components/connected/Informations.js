import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { conseillerActions } from '../../actions';


function Informations() {
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  const hasCv = false;
  const errorTab = [{
    key: 'too-many-files',
    label: 'La plateforme n\'accepte qu\'un seul fichier !'
  }, {
    key: 'file-invalid-type',
    label: 'Le type de fichier doit obligatoirement être un .pdf !'
  }];

  const onDrop = useCallback(acceptedFiles => {
    dispatch(conseillerActions.uploadCurriculumVitae(acceptedFiles[0]));
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.pdf', maxFiles: 1 });

  return (
    <div className="informations">
      <div className="fr-container-fluid">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-6">
            <h2>Mes informations</h2>
            <p style={{ marginBottom: 'revert' }}>Nom : <strong>{ conseiller?.nom }</strong></p>
            <p style={{ marginBottom: 'revert' }}>Prénom : { conseiller?.prenom }</p>
            <p style={{ marginBottom: 'revert' }}>Email : { conseiller?.email }</p>
            <p>Téléphone : { conseiller?.telephone }</p>
          </div>
          <div className="fr-col-12 fr-col-md-6" >
            <h2>Mon Curriculum vit&aelig;</h2>
            { hasCv &&
            <>
              <p>Vous pouvez voir ou télécharger votre CV en cliquant sur ce lien :<br />
                <a href="">Mon Curriculum vit&aelig;</a> </p>
              <p>Pour mettre à jour votre CV : </p>
            </>
            }
            { !hasCv &&
              <p>Vous n&apos;avez pas encore téléchargé votre Curriculum vit&aelig;, faites le dès maintenant ! </p>
            }
            <div className={fileRejections.length > 0 ? 'dropZone drop-error' : 'dropZone' } {...getRootProps()}>

              <input {...getInputProps()} />
              { acceptedFiles.length === 0 &&
                <>
                  <span className="fr-fi-save-line image-dropZone" aria-hidden="true"></span>
                  {
                    isDragActive ?
                      <p>Déposez votre CV ici ...</p> :
                      <p className="texte-dropZone">Faites glisser votre CV au format pdf ici, ou cliquez pour selectionner votre pdf.</p>
                  }
                </>
              }
              { acceptedFiles.length > 0 &&
                <p>{acceptedFiles[0].name}</p>
              }
              { fileRejections.length > 0 &&
                <div className="drop-error-message">{
                  errorTab.find(item => item.key === fileRejections[0].errors[0].code).label
                }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informations;
