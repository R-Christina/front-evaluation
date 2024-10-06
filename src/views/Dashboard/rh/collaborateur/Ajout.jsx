import React, { useEffect, useState } from "react";
import HeaderRH from "components/header/HeaderRh";
import Footer from "components/footer/Footer";
import { collabInstance } from "axiosConfig";


import "assets/vendors/mdi/css/materialdesignicons.min.css";
import "assets/vendors/base/vendor.bundle.base.css";
import "assets/vendors/select2/select2.min.css";
import "assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css";
import "assets/css/style.css";


const Ajout = () => {

  const [directions, setDirections] = useState([]); // État pour stocker les directions
  const [selectedDirection, setSelectedDirection] = useState(""); // État pour la direction sélectionnée

  const [departements, setDepartements] = useState([]);
  const [selectedDepartement, setSelectedDepartement] = useState("");

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const [contrats, setContrats] = useState([]);
  const [selectedContrat, setSelectedContrat] = useState("");

  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");

  const [type_emps, setType_emps] = useState([]);
  const [selectedType_emp, setSelectedType_emp] = useState("");

  const [cps, setCps] = useState([]);
  const [selectedCp, setSelectedCp] = useState("");

  const [type_heures, setType_heures] = useState([]);
  const [selectedType_heure, setSelectedType_heure] = useState("");

  const fetchData = async (endpoint, setData, errorMessage) => {
    try {
      const response = await collabInstance.get(endpoint); // Appel à l'API
      setData(response.data); // Mise à jour de l'état avec les données
    } catch (error) {
      console.error(`${errorMessage}:`, error);
    }
  };
  
  // Utiliser la fonction générique pour chaque appel
  useEffect(() => {
    fetchData("/Dir/liste", setDirections, "Erreur lors de la récupération des directions");
    fetchData("/Dept/liste", setDepartements, "Erreur lors de la récupération des départements");
    fetchData("/Service/liste", setServices, "Erreur lors de la récupération des services");
    fetchData("/Contrat/liste", setContrats, "Erreur lors de la récupération des contrats");
    fetchData("/Site/liste", setSites, "Erreur lors de la récupération des sites");
    fetchData("/Type_emp/liste", setType_emps, "Erreur lors de la récupération des types d'employés");
    fetchData("/Cp/liste", setCps, "Erreur lors de la récupération des centres de profit");
    fetchData("/Type_heure/liste", setType_heures, "Erreur lors de la récupération des centres de profit");
  }, []); // Mettre ce bloc dans un useEffect si ce n'est pas déjà fait  

  return (
    <>
      <HeaderRH />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Ajouter des collaborateurs</h4>
                    <p className="card-description">Importer vos nouveaux collaborateurs</p>
                    <form className="forms-sample">
                      <div className="form-group">
                        <label>Fichier cvs</label>
                        <input
                          type="file"
                          name="img[]"
                          className="file-upload-default"
                        />
                        <div className="input-group col-xs-12">
                          <input
                            type="text"
                            className="form-control file-upload-info"
                            disabled
                            placeholder="Upload csv"
                          />
                          <span className="input-group-append">
                            <button
                              className="file-upload-browse btn btn-primary"
                              type="button"
                            >
                              Upload
                            </button>
                          </span>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary me-2">
                        Submit
                      </button>
                      <button type="reset" className="btn btn-light">
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Ajouter un collaborateur</h4>
                    <form className="form-sample">
                      <p className="card-description">
                        Information personnelle
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Matricule
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Matricule"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Nom
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nom"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Prénom
                            </label>
                            <div className="col-sm-9">
                              <input
                                className="form-control"
                                placeholder="Prénom"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Genre
                            </label>
                            <div className="col-sm-4">
                              <div className="form-check">
                                <label htmlFor="genre1">Masculin</label>
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="genre"
                                  id="genre1"
                                  value="masculin"
                                  defaultChecked
                                />
                              </div>
                            </div>
                            <div className="col-sm-5">
                              <div className="form-check">
                                <label htmlFor="genre2">Féminin</label>
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="genre"
                                  id="genre2"
                                  value="feminin"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Date de naissance
                            </label>
                            <div className="col-sm-9">
                              <input type="Date" className="form-control" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Date d'embauche
                            </label>
                            <div className="col-sm-9">
                              <input type="Date" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Email professionnel
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Email professionnel"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Mot de passe
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Mot de passe"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr />
                      <p className="card-description">
                        Informnation professionnel
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Type
                            </label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                value={selectedType_emp}
                                onChange={(e) => setSelectedType_emp(e.target.value)}
                                >
                                <option value="" disabled>
                                  Sélectionnez le type du collaborateur
                                </option>
                                {type_emps.map((type_emp) => (
                                  <option key={type_emp.type_emp_id} value={type_emp.type_emp_nom}>
                                    {type_emp.type_emp_nom}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Direction
                            </label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                value={selectedDirection}
                                onChange={(e) => setSelectedDirection(e.target.value)}
                                >
                                <option value="" disabled>
                                  Sélectionnez une direction
                                </option>
                                {directions.map((direction) => (
                                  <option key={direction.dir_id} value={direction.dir_nom}>
                                    {direction.dir_nom}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Département
                            </label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                value={selectedDepartement}
                                onChange={(e) => setSelectedDepartement(e.target.value)}
                                >
                                <option value="" disabled>
                                  Sélectionnez une département
                                </option>
                                {departements.map((departement) => (
                                  <option key={departement.dept_id} value={departement.dept_nom}>
                                    {departement.dept_nom}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Service
                            </label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                >
                                <option value="" disabled>
                                  Sélectionnez une service
                                </option>
                                {services.map((service) => (
                                  <option key={service.service_id} value={service.service_nom}>
                                    {service.service_nom}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              poste
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="poste"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Type de contrat
                            </label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                value={selectedContrat}
                                onChange={(e) => setSelectedContrat(e.target.value)}
                                >
                                <option value="" disabled>
                                  Sélectionnez le type de contrat
                                </option>
                                {contrats.map((contrat) => (
                                  <option key={contrat.contrat_id} value={contrat.type_contrat}>
                                    {contrat.type_contrat}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Site
                            </label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                value={selectedSite}
                                onChange={(e) => setSelectedSite(e.target.value)}
                                >
                                <option value="" disabled>
                                  Sélectionnez une site
                                </option>
                                {sites.map((site) => (
                                  <option key={site.site_id} value={site.site_nom}>
                                    {site.site_nom}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Cp
                            </label>
                            <div className="col-sm-9">
                            <select
                                className="form-control"
                                value={selectedCp}
                                onChange={(e) => setSelectedCp(e.target.value)}
                                >
                                <option value="" disabled>
                                  Sélectionnez un cp
                                </option>
                                {cps.map((cp) => (
                                  <option key={cp.cp_id} value={cp.cp_nom}>
                                    {cp.cp_nom}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Type heure
                            </label>
                            <div className="col-sm-9">
                              <select
                                className="form-control"
                                value={selectedType_heure}
                                onChange={(e) => setSelectedType_heure(e.target.value)}
                                >
                                <option value="" disabled>
                                  Sélectionnez le type d'heure
                                </option>
                                {type_heures.map((type_heure) => (
                                  <option key={type_heure.type_heure_id} value={type_heure.type_heure_nom}>
                                    {type_heure.type_heure_nom}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              n + 1
                            </label>
                            <div className="col-sm-9">
                              <select className="form-control">
                                <option>America</option>
                                <option>Italy</option>
                                <option>Russia</option>
                                <option>Britain</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary me-2">
                        Submit
                      </button>
                      <button type="reset" className="btn btn-light">
                        Cancel
                      </button>
                    </form>
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

export default Ajout;
