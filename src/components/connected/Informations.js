import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { conseillerActions } from '../../actions';
import FlashMessage from 'react-flash-message';
import Spinner from 'react-loader-spinner';

function Informations() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const candidat = useSelector(state => state.conseiller?.conseiller);
  const isUploaded = useSelector(state => state.conseiller?.isUploaded);
  const uploading = useSelector(state => state.conseiller?.uploading);
  const isDownloaded = useSelector(state => state.conseiller?.isDownloaded);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const error = useSelector(state => state.conseiller?.uploadError);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const blob = useSelector(state => state.conseiller?.blob);

  const errorTab = [{
    key: 'too-many-files',
    label: 'La plateforme n\'accepte qu\'un seul fichier !'
  }, {
    key: 'file-invalid-type',
    label: 'Le type de fichier doit obligatoirement être un .pdf !'
  }, {
    key: 'file-too-large',
    label: 'La taille du fichier ne doit pas excéder 10Mo !'
  }];

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0], acceptedFiles[0].name);
      dispatch(conseillerActions.uploadCurriculumVitae(formData));
    }
  }, []);


  useEffect(() => {
    if (blob !== null && blob !== undefined && (downloadError === undefined || downloadError === false)) {
      dispatch(conseillerActions.resetCVFile());
    }
  }, [blob, downloadError]);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone(
    { onDrop, accept: '.pdf', maxFiles: 1, maxSize: process.env.REACT_APP_CV_FILE_MAX_SIZE });

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(user?.entity?.$id, candidat));
  };
  useEffect(() => {
    if (isDownloaded || isUploaded) {
      dispatch(conseillerActions.get(user?.entity?.$id));
    }
  }, [isDownloaded, isUploaded]);

  return (
    <div className="informations">
      <div className="fr-container-fluid">
        <div className="fr-grid-row">
          { isUploaded &&
            <div className="fr-col-12 fr-mb-3w">
              <FlashMessage duration={100000} >
                <div className="flashBag">
                  <span>
                    Votre Curriculum Vit&aelig; a été ajouté avec succès !
                  </span>
                  <br/><br/>
                  <span style={{ color: 'initial' }}>
                    Important : il sera conservé seulement 6 mois sur votre espace candidat. Au delà, il vous sera recommandé de le télécharger de nouveau.
                  </span>
                </div>
              </FlashMessage>
            </div>
          }

          {!isUploaded && error &&

            <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
              <FlashMessage duration={100000} >
                <div className="flashBag labelError">
                  <span>
                    {error}
                  </span>
                </div>
              </FlashMessage>
            </div>
          }
          <div className="fr-col-12 fr-col-md-6">
            <div className="spinnerCustom">
              <Spinner
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
                visible={downloading === true || uploading === true}
              />
            </div>
            <h2>Mes informations</h2>
            <p style={{ marginBottom: 'revert' }}>Nom : <strong>{ candidat?.nom }</strong></p>
            <p style={{ marginBottom: 'revert' }}>Prénom : { candidat?.prenom }</p>
            <p style={{ marginBottom: 'revert' }}>Email : { candidat?.email }</p>
            <p>Téléphone : { candidat?.telephone }</p>
          </div>
          <div className="fr-col-12 fr-col-md-6" >
            <h2>Mon Curriculum vit&aelig;</h2>
            { candidat?.cv?.file &&
            <>
              <p>Vous pouvez voir ou télécharger votre CV en cliquant sur ce lien&nbsp;:<br />
                <button className="fr-btn fr-mt-3w" onClick={downloadCV}>
                  <span className="fr-fi-download-line image-download" aria-hidden="true"></span>
                  Mon Curriculum vit&aelig;
                </button> </p>
              <p>Pour mettre à jour votre CV&nbsp;:</p>
            </>
            }
            { !candidat?.cv?.file &&
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
                      <p className="texte-dropZone">
                        Faites glisser votre CV ou cliquez ici pour le sélectionner <strong>(format pdf)</strong>
                      </p>
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
