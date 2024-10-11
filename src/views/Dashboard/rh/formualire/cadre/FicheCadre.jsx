import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderRH from "components/header/HeaderRh";
import Footer from "components/footer/Footer";
import { formulaireInstance } from "axiosConfig";

import "assets/css/style.css";
import "assets/vendors/mdi/css/materialdesignicons.min.css";
import "assets/vendors/base/vendor.bundle.base.css";
import "assets/vendors/select2/select2.min.css";
import "assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css";
import Swal from 'sweetalert2';
import Apercue from "./Apercue";

const FicheCadre = () => {
  const navigate = useNavigate();
  const [fiche, setFiche] = useState([]);
  const [popupIndex, setPopupIndex] = useState(null);
  const dropdownRef = useRef(null);

  const fetchFiche = async () => {
    try {
      const response = await formulaireInstance.get("/Fiche/liste");
      if (response.data?.$values) {
        setFiche(response.data.$values);  // Utilisation de $values pour accéder au tableau
      } else {
        console.error("Les données récupérées ne contiennent pas $values :", response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des fiches:", error);
    }
  };

  // Utilisez useEffect pour récupérer les données lorsque le composant est monté
  useEffect(() => {
    fetchFiche();
  }, []);

  const addNewForm = () => {
    navigate(`/rh/formulaire/matriceCadre`);
  };

  const toggleDropdown = (index) => {
    setPopupIndex(popupIndex === index ? null : index);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPopupIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (fiche_id) => {
    const { value: confirmDelete } = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    });

    if (confirmDelete) {
      try {
        await formulaireInstance.delete(`/Fiche/liste/${fiche_id}`);
        Swal.fire(
          'Supprimé !',
          'Fiche supprimée avec succès.',
          'success'
        );
        fetchFiche();
      } catch (error) {
        Swal.fire(
          'Erreur !',
          `Erreur lors de la suppression : ${error.message}`,
          'error'
        );
      }
    }
  };

  return (
    <>
      <HeaderRH />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Fiches d'évaluation</h4>
                    <p className="card-description">
                      Liste des fiches pour collaborateur cadre
                    </p>
                    <div className="docs-grid">
                      <div className="new-doc-card" onClick={addNewForm}>
                        <i className="mdi mdi-plus"></i>
                        <p>Nouvelle fiche</p>
                      </div>

                      {fiche.length > 0 ? (
                        fiche.map((ficheItem, index) => (
                          <div
                            key={ficheItem.fiche_id}
                            className="doc-card"
                            style={{ position: "relative" }}
                          >
                            <div className="doc-image">
                              <Apercue ficheData={ficheItem} />
                            </div>
                            <div className="doc-title">
                              <i
                                className="mdi mdi-dots-vertical"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleDropdown(index);
                                }}
                              ></i>
                            </div>

                            {popupIndex === index && (
                              <div
                                ref={dropdownRef}
                                className="dropdown-menu dropdown-menu-right"
                                style={{
                                  display: "block",
                                  position: "absolute",
                                  right: "20px",
                                  top: "50px",
                                  zIndex: "10",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                                }}
                              >
                                <a className="dropdown-item" href="#">
                                  <i className="mdi mdi-file-check"></i> Utiliser
                                </a>
                                <a
                                  className="dropdown-item"
                                  onClick={() => handleDelete(ficheItem.fiche_id)}
                                >
                                  <i className="mdi mdi-delete text-danger"></i> Supprimer
                                </a>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>Aucune fiche disponible.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FicheCadre;
