import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { conseillerActions } from '../../actions';
import FlashMessage from 'react-flash-message';
import Spinner from 'react-loader-spinner';
import MonCompte from './MonCompte';

function Informations() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const candidat = useSelector(state => state.conseiller?.conseiller);
  const isUploaded = useSelector(state => state.conseiller?.isUploaded);
  const isDeleted = useSelector(state => state.conseiller?.isDeleted);
  const uploading = useSelector(state => state.conseiller?.uploading);
  const isDownloaded = useSelector(state => state.conseiller?.isDownloaded);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const uploadError = useSelector(state => state.conseiller?.uploadError);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const deleteError = useSelector(state => state.conseiller?.deleteError);
  const blob = useSelector(state => state.conseiller?.blob);
  const error = useSelector(state => state?.user?.patchError);
  const [flashMessage, setFlashMessage] = useState(false);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const [infos, setInfos] = useState({
    nom: conseiller?.nom,
    prenom: conseiller?.prenom,
    email: conseiller?.email,
    telephone: conseiller?.telephone
  });
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

  const deleteCV = () => {
    dispatch(conseillerActions.deleteCurriculumVitae(user?.entity?.$id, candidat));
  };

  useEffect(() => {
    if (isDownloaded || isUploaded || isDeleted) {
      dispatch(conseillerActions.get(user?.entity?.$id));
    }
  }, [isDownloaded, isUploaded, isDeleted]);

  return (
    <div className="informations">
      <div className="">
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

        {!isUploaded && uploadError &&

            <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
              <FlashMessage duration={100000} >
                <div className="flashBag labelError">
                  <span>
                    {uploadError}
                  </span>
                </div>
              </FlashMessage>
            </div>
        }

        { isDeleted &&
            <div className="fr-col-12 fr-mb-3w">
              <FlashMessage duration={100000} >
                <div className="flashBag">
                  <span>
                    Votre Curriculum Vit&aelig; a été supprimé avec succès !
                  </span>
                </div>
              </FlashMessage>
            </div>
        }

        {deleteError &&

          <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
            <FlashMessage duration={100000} >
              <div className="flashBag labelError">
                <span>
                  Une erreur s&apos;est produite pendant la suppression
                </span>
              </div>
            </FlashMessage>
          </div>
        }
        {flashMessage === true ?
          <div className="">
            <div style={{ width: '50%' }}>
              <div>
                <FlashMessage duration={10000}>
                  { error && (error !== undefined || error !== false) &&
                <p className="fr-label flashBag labelError" style={{ fontSize: '16px' }}>
                  Cet adresse e-mail est déjà utilisée
                </p>
                  }
                  { (error === undefined || error === false) &&
                 <p className="fr-label flashBag" style={{ fontSize: '16px' }}>

                   { infos.email === conseiller?.email ? <> La mise à jour effectué avec succès </> :
                     <>Nous vous avons envoyé un mail à : <strong style={{ color: 'black' }}>{infos?.email}</strong> pour confirmation</> }
                  &nbsp;
                   <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                 </p>
                  }
                </FlashMessage>
              </div>
            </div>
          </div> : ''
        }
      </div>
      <div className="fr-container-fluid">
        <div className="fr-grid-row  responsiveBouton">
          <div className="fr-col-12 fr-col-lg-6">
            <div className="spinnerCustom">
              <Spinner
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
                visible={downloading === true || uploading === true}
              />
            </div>
            <h2 className="fr-mb-7w">Mes informations</h2>
            <MonCompte setFlashMessage={setFlashMessage} infos={infos} setInfos={setInfos} conseiller={conseiller}/>
          </div>
          <div className="fr-col-12 fr-col-lg-6" >
            <h2 className="fr-mb-7w">Mon Curriculum vit&aelig;</h2>
            { !candidat?.cv?.file &&
              <p>Vous n&apos;avez pas encore téléchargé votre Curriculum vit&aelig;, faites le dès maintenant ! </p>
            }
            <span>Ajouter ou mettre à jour votre CV&nbsp;:</span>
            <div className={fileRejections.length > 0 ? 'dropZone drop-error' : 'fr-btn fr-mt-4w fr-mb-5w' } {...getRootProps()}
              style={{ height: '64px' }}>
              <input {...getInputProps()} />
              { acceptedFiles.length === 0 &&
                <>
                  <div className="fr-mb-5v">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25">
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path fill="white" d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v7h-2V9H6l6-6 6 6h-5z"/>
                    </svg>

                  </div>&ensp;
                  {
                    isDragActive ?
                      <p>Déposez votre CV ici ...</p> :
                      <p className="texte-dropZone fr-mt-2w">
                        Faites glisser votre CV ou cliquez pour le sélectionner (<strong>format PDF</strong>).
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
            { candidat?.cv?.file &&
            <>
              <span>Voir ou télécharger votre CV&nbsp;:<br/>
              </span>
              <button
                className="dropZone fr-mt-3w fr-mr-3 fr-mt-4w"
                style={{ width: '-webkit-fill-available', height: '48px' }} onClick={downloadCV}>
                <span className="fr-fi-file-download-line fr-text mr-3w" style={{ float: 'left' }} aria-hidden="true"/>
                  Mon CV&nbsp;({candidat?.cv?.file})
              </button>
              <button className="fr-link fr-mt-2w" style={{ textDecoration: 'underline' }} onClick={deleteCV} target="_self">
                  Supprimer mon CV
              </button>
            </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informations;
