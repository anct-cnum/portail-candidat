import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { conseillerActions } from '../../actions';
import Informations from './Informations';
import SupprimerCandidature from './SupprimerCandidature';
import UpdateDisponibilite from './updateDisponibilite';
import Spinner from '../common/Spinner';
import Alerte from '../common/Alerte';

function MonEspace() {
  const dispatch = useDispatch();

  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const deleteError = useSelector(state => state.conseiller?.deleteError);
  const uploadError = useSelector(state => state.conseiller?.uploadError);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const loading = useSelector(state => state.conseiller?.loading);
  const loadingUser = useSelector(state => state.user?.loading);
  const loadingDeleteCv = useSelector(state => state.user?.loadingDeleteCv);
  const isUploaded = useSelector(state => state.conseiller?.isUploaded);
  const candidat = useSelector(state => state.conseiller?.conseiller);
  const isDeleted = useSelector(state => state.conseiller?.isDeleted);
  const isUpdateStatutDispo = useSelector(state => state.conseiller?.isUpdateStatutDispo);
  const isUpdateStatutDispoError = useSelector(state => state.conseiller?.error);
  const updateError = useSelector(state => state?.user?.patchError);
  const user = useSelector(state => state.authentication.user.user);
  const userUpdated = useSelector(state => state?.user?.userUpdated);
  const blob = useSelector(state => state.conseiller?.blob);
  const lienCampagnePix = `${process.env.REACT_APP_PIX_CAMPAGNE_URL}?participantExternalId=${conseiller?.idPG}`;
  const lienPix = `${process.env.REACT_APP_PIX_URL}`;

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

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone(
    {
      onDrop,
      accept: {
        'text/pdf': ['.pdf']
      },
      maxFiles: 1,
      maxSize: process.env.REACT_APP_CV_FILE_MAX_SIZE
    });

  const downloadCV = () => {
    dispatch(conseillerActions.getCurriculumVitae(user?.entity?.$id, candidat));
  };

  const deleteCV = () => {
    if (candidat?.cv?.file) {
      dispatch(conseillerActions.deleteCurriculumVitae(user?.entity?.$id, candidat));
    }
  };
  useEffect(() => {
    if (isUploaded === true) {
      dispatch(conseillerActions.get(user?.entity?.$id));
      acceptedFiles.splice(0, 1);
    }
    if (userUpdated === true) {
      dispatch(conseillerActions.get(user?.entity?.$id));
    }
  }, [isUploaded, userUpdated]);

  useEffect(() => {
    if (blob !== null && blob !== undefined && (downloadError === undefined || downloadError === false)) {
      dispatch(conseillerActions.resetCVFile());
    }
  }, [blob, downloadError]);

  return (
    <div className="informations">
      <Alerte />
      <Spinner loading={loadingUser || loading || loadingDeleteCv} />
      {isUploaded &&
        <div className="fr-col-12 fr-mb-3w">
          <div className="fr-alert fr-alert--success">
            <span>
              Votre Curriculum Vit&aelig; a été ajouté avec succès !
            </span>
            <br /><br />
            <span style={{ color: 'initial' }}>
              Important : il sera conservé seulement 6 mois sur votre espace candidat. Au delà, il vous sera recommandé de le télécharger de nouveau.
            </span>
          </div>
        </div>
      }

      {!isUploaded && uploadError &&
        <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
          <p className="fr-alert fr-alert--error">
            {uploadError}
          </p>
        </div>
      }

      {isUpdateStatutDispo &&
        <div className="fr-col-12 fr-mb-3w">
          <p className="fr-alert fr-alert--success">
            {conseiller.disponible ? 'Vous avez été réinscrits avec succès.' : 'Vous avez été désinscrits avec succès.'}
          </p>
        </div>
      }
      {isDeleted &&
        <div className="fr-col-12 fr-mb-3w">
          <p className="fr-alert fr-alert--success">
            Votre Curriculum Vit&aelig; a été supprimé avec succès !
          </p>
        </div>
      }
      {isUpdateStatutDispoError &&
        <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
          <p className="fr-alert fr-alert--error">
            Une erreur s&apos;est produite pendant votre actualisation.
          </p>
        </div>
      }

      {deleteError &&
        <div className="fr-col-offset-2  fr-col-8 fr-mb-3w">
          <p className="fr-alert fr-alert--error">
            Une erreur s&apos;est produite pendant la suppression
          </p>
        </div>
      }
      {updateError && (updateError !== undefined || updateError !== false) &&
        <p className="fr-alert fr-alert--error" style={{ fontSize: '16px' }}>
          {updateError}
        </p>
      }
      {updateError && (updateError === undefined || updateError === false) &&
        <div>
          <p className="fr-alert fr-alert--success" style={{ fontSize: '16px' }}>
            {infos.email === conseiller?.email ? <> La mise à jour a été effectuée avec succès </> :
              <>
                Nous vous avons envoyé un mail à :&nbsp;
                <strong style={{ color: 'black' }}>{infos?.email}</strong> pour confirmation
              </>}
            &nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </div>
      }
      <div className="fr-container-fluid">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-lg-6">
            <h2 className="fr-mb-7w">Mes informations</h2>
            <Informations infos={infos} setInfos={setInfos} conseiller={conseiller} />
            <UpdateDisponibilite conseiller={conseiller} />
            <SupprimerCandidature conseiller={conseiller} />
          </div>
          <div className="fr-col-12 fr-col-lg-6" >
            <h2 className="fr-mb-7w">Mon Curriculum vit&aelig;</h2>
            {!candidat?.cv?.file &&
              <p>Vous n&apos;avez pas encore téléchargé votre Curriculum vit&aelig;, faites le dès maintenant ! </p>
            }
            <span>Ajouter ou mettre à jour votre CV&nbsp;:</span>
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
                      <p>Déposez votre CV ici ...</p> :
                      <p className="texte-dropZone fr-mt-2w">
                        Faites glisser votre CV ou cliquez pour le sélectionner (<strong>format PDF</strong>).
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
                <span>Voir ou télécharger votre CV&nbsp;:<br /></span>
                <button className="fr-mt-3w download-btn" onClick={downloadCV}>
                  <span className="fr-fi-file-download-line download-img" aria-hidden="true"></span>
                  Mon CV ({candidat?.cv?.file})
                </button>
                {loadingDeleteCv ?
                  <p className="supprimer-link fr-mt-2w" disabled style={{ color: '#eeeeee' }}>
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
              rel="noopener noreferrer"
              title="Accéder &agrave; votre test Pix"
              className="fr-link link-test-pix">
              Accéder &agrave; votre test&nbsp;<img src="/logos/logo-pix.svg" alt="Pix" height="30px" />
            </a>
            <br />(lien personnel à ne pas partager)
            <h2 className="fr-mt-8w" style={{ marginLeft: '-2px' }}>Comment consulter mes r&eacute;sultats PIX ?</h2>
            <p>
              Pour consulter vos r&eacute;sultats, il vous suffit de vous connecter &agrave; votre compte personnel Pix,
              vous pourrez alors retrouver vos r&eacute;sultats depuis la page <strong>&quot;Mes certifications&quot;</strong>.
              Elle est accessible depuis la rubrique <strong>&quot;Certification&quot;</strong>
              en cliquant sur <strong>&quot;Voir mes certifications&quot;</strong>.
            </p>
            <a href={lienPix}
              target="blank"
              rel="noopener noreferrer"
              title="Je me connecte à mon compte Pix"
              className="fr-link">
              Je me connecte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonEspace;
