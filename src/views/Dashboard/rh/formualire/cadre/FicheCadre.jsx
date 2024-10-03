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

const FicheCadre = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [popupIndex, setPopupIndex] = useState(null); // To track which form's dropdown is open
  const dropdownRef = useRef(null); // Reference to the dropdown

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await formulaireInstance.get("/Form/list");
        setForms(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des fiches:", error);
      }
    };
    fetchForms();
  }, []);

  const addNewForm = () => {
    navigate(`/rh/formulaire/matriceCadre`);
  };

  const toggleDropdown = (index) => {
    setPopupIndex(popupIndex === index ? null : index);
  };

  // Close the dropdown if a click is detected outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPopupIndex(null); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (formId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce formulaire ?")) {
      try {
        await formulaireInstance.delete(`/Form/header/${formId}`);
        // Mettre à jour l'état local en filtrant les formulaires supprimés
        setForms((prevForms) => prevForms.filter((form) => form.form_id !== formId));
      } catch (error) {
        alert(`Erreur : ${error.response?.data?.message || 'Erreur lors de la suppression du formulaire'}`);
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

                      {forms.map((form, index) => (
                        <div
                          key={form.form_id}
                          className="doc-card"
                          style={{ position: "relative" }} // Relative positioning for dropdown
                        >
                          <a href={`/edit/${form.form_id}`}>
                            <div className="doc-image"></div>
                            <div className="doc-title">
                              <p>{form.titre_formulaire || `Sans titre`}</p>
                              <i
                                className="mdi mdi-dots-vertical"
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent navigation
                                  toggleDropdown(index); // Toggle dropdown for current form
                                }}
                              ></i>
                            </div>
                          </a>

                          {/* Dropdown menu for the three dots */}
                          {popupIndex === index && (
                            <div
                              ref={dropdownRef} // Add ref to the dropdown
                              className="dropdown-menu dropdown-menu-right"
                              style={{
                                display: "block", // Ensure it's visible
                                position: "absolute",
                                right: "10px",
                                top: "50px",
                                zIndex: "10",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Ajoute l'ombre ici
                              }}
                            >
                              <a className="dropdown-item" href="#">
                                <i className="mdi mdi-file-check"></i> Utiliser
                              </a>
                              <a className="dropdown-item" onClick={() => handleDelete(form.form_id)}>
                                <i className="mdi mdi-delete text-danger"></i>
                                Supprimer
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
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
