import React, { useState, useEffect } from "react";
import HeaderRH from "components/header/HeaderRh";
import Footer from "components/footer/Footer";
import { formulaireInstance } from "axiosConfig";

import "assets/css/style.css";
import "assets/vendors/mdi/css/materialdesignicons.min.css";
import "assets/vendors/base/vendor.bundle.base.css";
import "assets/vendors/select2/select2.min.css";
import "assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css";

function MatriceCadre() {
  const [checkboxData, setCheckboxData] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null); // Success message state
  const [previewData, setPreviewData] = useState({ title: "", headers: [] });
  const [formId, setFormId] = useState(null); // Ajouter un état pour stocker form_id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await formulaireInstance.get("/Header_selection");
        setCheckboxData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setPreviewData({
      title: formTitle,
      headers: checkboxData.filter((item) =>
        selectedHeaders.includes(item.header_selection_id)
      ),
    });
  }, [formTitle, selectedHeaders, checkboxData]);

  const handleCheckboxChange = (headerId) => {
    setSelectedHeaders((prevSelected) => {
      if (prevSelected.includes(headerId)) {
        return prevSelected.filter((id) => id !== headerId);
      } else {
        return [...prevSelected, headerId];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      form: {
        type_formulaire: 1,
        titre_formulaire: formTitle,
      },
      header_selection_id: selectedHeaders,
    };

    try {
      const response = await formulaireInstance.post("/Form/header", formData);
      setFormId(response.data.form_id); // Stocker form_id de la réponse
      setFormSuccess("Le formulaire a été sauvegardé avec succès!"); // Set success message
      setFormError(null); // Clear error message if any
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setFormError("Une erreur s'est produite lors de l'envoi.");
      setFormSuccess(null); // Clear success message if any
    }
  };

  return (
    <div>
      <HeaderRH />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="-apercue">Nouvelle fiche d'évaluation</h4>
                    <p className="card-description">Entrer les informations pour la fiche</p>
                    <form className="forms-sample" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="titre">Titre (Facultatif*)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="titre"
                          name="titre"
                          placeholder="Titre du fiche"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <p className="mb-2">En tête:</p>
                        {checkboxData.length > 0 ? (
                          <div className="d-flex flex-wrap">
                            {checkboxData.map((item, index) => (
                              <div key={index} className="form-check me-4 mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`checkbox-${item.header_selection_id}`}
                                  onChange={() => handleCheckboxChange(item.header_selection_id)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`checkbox-${item.header_selection_id}`}
                                >
                                  {item.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>Aucune donnée</p>
                        )}
                      </div>
                      {/* Display error message */}
                      {formError && <div className="alert alert-danger">{formError}</div>}
                      {/* Display success message */}
                      {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
                      <button type="submit" className="btn btn-primary me-2">Sauvegarder</button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-8 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Aperçu</h4>
                    <div className="border p-3">
                      <h5 className="preview-title">{previewData.title || "Aucun titre"}</h5>
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Collaborateur</th>
                            <th>Manager</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.headers.length > 0 ? (
                            previewData.headers.map((header, index) => (
                              <tr key={index}>
                                <td>{header.label}</td>
                                <td></td>
                                <td></td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="text-center">
                                Aucune en-tête sélectionnée
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MatriceCadre;