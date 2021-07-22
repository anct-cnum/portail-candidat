import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { conseillerActions } from '../../actions';
import FlashMessage from 'react-flash-message';

function Informations() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const candidat = useSelector(state => state.conseiller?.conseiller);
  const isUploaded = useSelector(state => state.conseiller?.isUploaded);
  const error = useSelector(state => state.conseiller?.uploadError);

  const errorTab = [{
    key: 'too-many-files',
    label: 'La plateforme n\'accepte qu\'un seul fichier !'
  }, {
    key: 'file-invalid-type',
    label: 'Le type de fichier doit obligatoirement être un .pdf, un .doc ou un .docx !'
  }, {
    key: 'file-too-large',
    label: 'La taille du fichier ne doit pas excéder 10Mo !'
  }];

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0], acceptedFiles[0].name);

      dispatch(conseillerActions.uploadCurriculumVitae(formData));
      dispatch(conseillerActions.get(user?.entity?.$id));
    }
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone(
    { onDrop, accept: '.pdf,.doc,.docx', maxFiles: 1, maxSize: process.env.REACT_APP_CV_FILE_MAX_SIZE });

  return (
    <div className="informations">
      <div className="fr-container-fluid">
        <div className="fr-grid-row">
          { isUploaded &&
            <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
              <FlashMessage duration={10000} >
                <div className="flashBag">
                  <span>
                    Votre nouveau Curriculum Vit&aelig; a été ajouté !
                  </span>
                </div>
              </FlashMessage>
            </div>
          }
          {!isUploaded && error &&

            <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
              <FlashMessage duration={10000} >
                <div className="flashBag labelError">
                  <span>
                    {error}
                  </span>
                </div>
              </FlashMessage>
            </div>
          }
          <div className="fr-col-12 fr-col-md-6">
            <h2>Mes informations</h2>
            <p style={{ marginBottom: 'revert' }}>Nom : <strong>{ candidat?.nom }</strong></p>
            <p style={{ marginBottom: 'revert' }}>Prénom : { candidat?.prenom }</p>
            <p style={{ marginBottom: 'revert' }}>Email : { candidat?.email }</p>
            <p>Téléphone : { candidat?.telephone }</p>
          </div>
          <div className="fr-col-12 fr-col-md-6" >
            <h2>Mon Curriculum vit&aelig;</h2>
            { candidat?.cvFichier &&
            <>
              <p>Vous pouvez voir ou télécharger votre CV en cliquant sur ce lien :<br />
                <a href="">Mon Curriculum vit&aelig;</a> </p>
              <p>Pour mettre à jour votre CV : </p>
            </>
            }
            { !candidat?.cvFichier &&
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
              { fileRejections?.length > 0 &&
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
