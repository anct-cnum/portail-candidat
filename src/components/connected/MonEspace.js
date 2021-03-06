import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { conseillerActions } from '../../actions';
import FlashMessage from 'react-flash-message';
import Spinner from 'react-loader-spinner';
import Informations from './Informations';
import SupprimerCandidature from './SupprimerCandidature';
import UpdateDisponibilite from './updateDisponibilite';

function MonEspace() {
  const dispatch = useDispatch();

  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const isDownloaded = useSelector(state => state.conseiller?.isDownloaded);
  const deleteError = useSelector(state => state.conseiller?.deleteError);
  const downloading = useSelector(state => state.conseiller?.downloading);
  const uploadError = useSelector(state => state.conseiller?.uploadError);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const isUploaded = useSelector(state => state.conseiller?.isUploaded);
  const candidat = useSelector(state => state.conseiller?.conseiller);
  const isDeleted = useSelector(state => state.conseiller?.isDeleted);
  const isUpdateStatutDispo = useSelector(state => state.conseiller?.isUpdateStatutDispo);
  const isUpdateStatutDispoError = useSelector(state => state.conseiller?.error);
  const loadingDeleteCv = useSelector(state => state.conseiller?.loadingDeleteCv);
  const uploading = useSelector(state => state.conseiller?.uploading);
  const updateError = useSelector(state => state?.user?.patchError);
  const user = useSelector(state => state.authentication.user.user);
  const blob = useSelector(state => state.conseiller?.blob);
  const lienCampagnePix = `${process.env.REACT_APP_PIX_CAMPAGNE_URL}?participantExternalId=${conseiller?.idPG}`;

  const [flashMessage, setFlashMessage] = useState(false);
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
    label: 'Le type de fichier doit obligatoirement ??tre un .pdf !'
  }, {
    key: 'file-too-large',
    label: 'La taille du fichier ne doit pas exc??der 10Mo !'
  }];

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0], acceptedFiles[0].name);
      dispatch(conseillerActions.uploadCurriculumVitae(formData));
    }
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone(
    { onDrop, accept: '.pdf', maxFiles: 1, maxSize: process.env.REACT_APP_CV_FILE_MAX_SIZE });

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(user?.entity?.$id, candidat));
  };

  const deleteCV = () => {
    if (candidat?.cv?.file) {
      dispatch(conseillerActions.deleteCurriculumVitae(user?.entity?.$id, candidat));
    }
  };

  useEffect(() => {
    if (blob !== null && blob !== undefined && (downloadError === undefined || downloadError === false)) {
      dispatch(conseillerActions.resetCVFile());
    }
  }, [blob, downloadError]);

  useEffect(() => {
    if (isDownloaded || isUploaded || isDeleted || isUpdateStatutDispo) {
      dispatch(conseillerActions.get(user?.entity?.$id));
    }
  }, [isDownloaded, isUploaded, isDeleted, isUpdateStatutDispo]);

  return (
    <div className="informations">
      <Spinner
        style={{ textAlign: 'center' }}
        type="Oval"
        color="#00BFFF"
        visible={loadingDeleteCv === true}
      />
      {isUploaded &&
        <div className="fr-col-12 fr-mb-3w">
          <FlashMessage duration={10000} >
            <div className="flashBag">
              <span>
                Votre Curriculum Vit&aelig; a ??t?? ajout?? avec succ??s !
              </span>
              <br /><br />
              <span style={{ color: 'initial' }}>
                Important : il sera conserv?? seulement 6 mois sur votre espace candidat. Au del??, il vous sera recommand?? de le t??l??charger de nouveau.
              </span>
            </div>
          </FlashMessage>
        </div>
      }

      {!isUploaded && uploadError &&
        <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
          <FlashMessage duration={10000} >
            <div className="flashBag labelError">
              <span>
                {uploadError}
              </span>
            </div>
          </FlashMessage>
        </div>
      }

      {isUpdateStatutDispo &&
        <div className="fr-col-12 fr-mb-3w">
          <FlashMessage duration={6000} >
            <div className=" flashBag">
              <span>
                {conseiller.disponible ? 'Vous avez ??t?? r??inscrits avec succ??s.' : 'Vous avez ??t?? d??sinscrits avec succ??s.'}
              </span>
            </div>
          </FlashMessage>
        </div>
      }
      {isDeleted &&
        <div className="fr-col-12 fr-mb-3w">
          <FlashMessage duration={10000} >
            <div className="flashBag">
              <span>
                Votre Curriculum Vit&aelig; a ??t?? supprim?? avec succ??s !
              </span>
            </div>
          </FlashMessage>
        </div>
      }
      {isUpdateStatutDispoError &&
        <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
          <FlashMessage duration={10000} >
            <div className="flashBag labelError">
              <span>
                Une erreur s&apos;est produite pendant votre actualisation.
              </span>
            </div>
          </FlashMessage>
        </div>
      }

      {deleteError &&
        <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
          <FlashMessage duration={10000} >
            <div className="flashBag labelError">
              <span>
                Une erreur s&apos;est produite pendant la suppression
              </span>
            </div>
          </FlashMessage>
        </div>
      }

      {flashMessage === true &&
        <div>
          <FlashMessage duration={10000}>
            {updateError && (updateError !== undefined || updateError !== false) &&
              <p className="fr-label flashBag labelError" style={{ fontSize: '16px' }}>
                {updateError}
              </p>
            }
            {(updateError === undefined || updateError === false) &&
              <p className="fr-label flashBag" style={{ fontSize: '16px' }}>
                {infos.email === conseiller?.email ? <> La mise ?? jour effectu??e avec succ??s </> :
                  <>
                    Nous vous avons envoy?? un mail ?? :&nbsp;
                    <strong style={{ color: 'black' }}>{infos?.email}</strong> pour confirmation
                  </>}
                &nbsp;
                <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
              </p>
            }
          </FlashMessage>
        </div>
      }
      <div className="fr-container-fluid">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-lg-6">
            <div className="spinnerCustom">
              <Spinner
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
                visible={downloading || uploading}
              />
            </div>
            <h2 className="fr-mb-7w">Mes informations</h2>
            <Informations setFlashMessage={setFlashMessage} infos={infos} setInfos={setInfos} conseiller={conseiller} />
            <UpdateDisponibilite conseiller={conseiller} />
            <SupprimerCandidature conseiller={conseiller} />
          </div>
          <div className="fr-col-12 fr-col-lg-6" >
            <h2 className="fr-mb-7w">Mon Curriculum vit&aelig;</h2>
            {!candidat?.cv?.file &&
              <p>Vous n&apos;avez pas encore t??l??charg?? votre Curriculum vit&aelig;, faites le d??s maintenant ! </p>
            }
            <span>Ajouter ou mettre ?? jour votre CV&nbsp;:</span>
            <div style={{ display: 'flex' }}
              className={fileRejections.length > 0 ? 'dropZone drop-error fr-mt-4w fr-mb-5w' : 'fr-btn fr-mt-4w fr-mb-5w upload-btn'}
              {...getRootProps()}>
              <input {...getInputProps()} />
              {acceptedFiles.length === 0 &&
                <>
                  <div className="fr-mb-5v fr-mr-2v">
                    <img src="logos/icone-ajouter-cv.svg" />
                  </div>
                  {
                    isDragActive ?
                      <p>D??posez votre CV ici ...</p> :
                      <p className="texte-dropZone fr-mt-2w">
                        Faites glisser votre CV ou cliquez pour le s??lectionner (<strong>format PDF</strong>).
                      </p>
                  }
                </>
              }
              {acceptedFiles.length > 0 &&
                <p>{acceptedFiles[0].name}</p>
              }
              {fileRejections?.length > 0 &&
                <div className="drop-error-message">{
                  errorTab.find(item => item.key === fileRejections[0].errors[0].code).label
                }
                </div>
              }
            </div>
            {candidat?.cv?.file &&
              <>
                <span>Voir ou t??l??charger votre CV&nbsp;:<br /></span>
                <button className="fr-mt-3w download-btn" onClick={downloadCV}>
                  <span className="fr-fi-file-download-line download-img" aria-hidden="true"></span>
                  Mon CV ({candidat?.cv?.file})
                </button>
                {loadingDeleteCv === true ?
                  <p className="supprimer-link fr-mt-2w" style={{ color: '#eeeeee' }}>
                    Supprimer votre CV
                  </p> :
                  <p className="supprimer-link fr-mt-2w" onClick={deleteCV}>
                    Supprimer votre CV
                  </p>
                }
              </>
            }

            <h2 className="fr-mt-8w" style={{ marginLeft: '-2px' }}>Lien du test PIX</h2>
            <a href={lienCampagnePix}
              target="blank"
              rel="noreferrer"
              title="Acc??der ?? votre test Pix"
              className="fr-link" style={{ padding: '0.25rem 0' }}>
              Acc??der ?? votre test&nbsp;<img src="/logos/logo-pix.svg" alt="Pix" height="30px" />
            </a>
            <br />(lien personnel ?? ne pas partager)
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonEspace;
