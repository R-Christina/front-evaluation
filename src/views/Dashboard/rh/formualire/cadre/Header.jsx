import React, { useState, useEffect } from "react";
import HeaderRH from "components/header/HeaderRh";
import Footer from "components/footer/Footer";
import { formulaireInstance } from "axiosConfig";
import Body from "./Body";
import BodyTwo from "./BodyTwo";



import "assets/css/style.css";
import "assets/vendors/mdi/css/materialdesignicons.min.css";
import "assets/vendors/base/vendor.bundle.base.css";
import "assets/vendors/select2/select2.min.css";
import "assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css";

function Header() {
  const [checkboxData, setCheckboxData] = useState([]);
  const [selections, setSelections] = useState([]);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null); // Success message state
  const [previewData, setPreviewData] = useState({ title: "", selection: [] });

  const [elements, setElements] = useState([
    { id: 1, label: 'Objectif' },
    { id: 2, label: 'Pondération' },
    { id: 3, label: 'Indicateur' },
    { id: 4, label: 'Résultat' }
  ]);

  const [tds, setTds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await formulaireInstance.get("/Selection/liste");
            // Extract the array from the response
            if (response.data && Array.isArray(response.data.$values)) {
                setCheckboxData(response.data.$values);
            } else {
                console.warn("Expected $values to be an array but got:", response.data);
                setCheckboxData([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };
    fetchData();
  }, []);

  useEffect(() => {
      if (Array.isArray(checkboxData)) {
          setPreviewData({
              selection: checkboxData.filter((item) =>
                  selections.includes(item.selection_id)
              ),
          });
      } else {
          console.warn("checkboxData is not an array:", checkboxData);
      }
  }, [selections, checkboxData]);

  const handleCheckboxChange = (selection_id) => {
      setSelections((prevSelected) => {
      if (prevSelected.includes(selection_id)) {
        return prevSelected.filter((id) => id !== selection_id);
      } else {
        return [...prevSelected, selection_id];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ficheDto = {
      fiche: {}, // Vous pouvez ajouter des données spécifiques à la fiche ici si nécessaire
      header_selections: selections.map((selection_id) => ({
        selection_id: selection_id,
      })),
      ths: elements.map((element) => ({
        th_num: element.id,
        th_nom: element.label,
      })),
      td_principales: tds.map((td) => ({
        td_principale_num: td.id,
        td_principale_nom: td.td_nom,
        ligne: td.ligne,
      })),
    };
    console.log(ficheDto);

    try {
      const response = await formulaireInstance.post("/Fiche", ficheDto);
      setFormSuccess("Fiche et données associées insérées avec succès");
      setFormError(null);
    } catch (error) {
      setFormError("Erreur lors de la soumission des données");
      setFormSuccess(null);
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  return (
    <div>
      <HeaderRH />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="-apercue">Nouvelle fiche d'évaluation</h4>
                    <p className="card-description">Entrer les informations pour la fiche</p>
                    <form className="forms-sample" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <p className="mb-2">En tête:</p>
                        {checkboxData.length > 0 ? (
                          <div className="d-flex flex-wrap">
                            {checkboxData.map((item, index) => (
                              <div key={index} className="form-check me-4 mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`checkbox-${item.selection_id}`}
                                  onChange={() => handleCheckboxChange(item.selection_id)}
                                />
                                <label className="form-check-label" htmlFor={`checkbox-${item.selection_id}`}>
                                  {item.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>Aucune donnée</p>
                        )}
                      </div>

                      <Body elements={elements} setElements={setElements} />
                      <BodyTwo tds={tds} setTds={setTds} />

                      {formError && <div className="alert alert-danger">{formError}</div>}
                      {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
                      <button type="submit" className="btn btn-primary me-2">Sauvegarder</button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-6 grid-margin stretch-card">
                <div className="card shadow-sm rounded">
                  <div className="card-body">
                    <h4 className="card-title">Aperçu</h4>
                    <div className="border p-4 bg-gradient rounded">
                      {/* Tableau Collaborateur/Manager */}
                      <table className="table mb-4">
                        <thead className="table-success">
                          <tr>
                            <th></th>
                            <th>Collaborateur</th>
                            <th>Manager</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.selection.length > 0 ? (
                            previewData.selection.map((header, index) => (
                              <tr key={index}>
                                <td>{header.label}</td>
                                <td></td>
                                <td></td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="text-center text-muted">
                                Aucune en-tête sélectionnée
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      {/* Tableau principal */}
                      <table className="table table-bordered table-responsive-sm">
                        <thead className="tablee">
                          <tr>
                            <th></th>
                            {elements.map((element) => (
                              <th key={element.id}>{element.label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tds.map((td) => {
                            const rows = [];
                            for (let i = 0; i < td.ligne; i++) {
                              if (i === 0) {
                                rows.push(
                                  <tr key={`${td.id}-${i}`}>
                                    {/* Utilisation de rowSpan pour occuper toutes les lignes */}
                                    <td rowSpan={td.ligne} className="align-middle" style={{background:'rgba(70, 77, 238, 0.1)'}}>
                                      {td.td_nom}
                                    </td>
                                    {elements.map((element, index) => (
                                      <td key={index} className="text-center"></td>
                                    ))}
                                  </tr>
                                );
                              } else {
                                rows.push(
                                  <tr key={`${td.id}-${i}`}>
                                    {elements.map((element, index) => (
                                      <td key={index} className="text-center"></td>
                                    ))}
                                  </tr>
                                );
                              }
                            }
                            return rows;
                          })}
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

export default Header;