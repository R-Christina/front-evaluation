import React, { useEffect, useState } from "react"; 
import HeaderRH from 'components/header/HeaderRh'; 
import Footer from 'components/footer/Footer'; 

import 'assets/vendors/mdi/css/materialdesignicons.min.css';
import 'assets/vendors/base/vendor.bundle.base.css';
import 'assets/vendors/select2/select2.min.css';
import 'assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css';
import 'assets/css/style.css';

import { collabInstance } from "axiosConfig";

const Liste = () => {
  const [dept, setDept] = useState([]); // Stockage des départements
  const [loading, setLoading] = useState(true); // Gestion du chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const itemsPerPage = 10; // Nombre d'éléments par page
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await collabInstance.get("/Dept/liste");
        setDept(response.data); // Stocke les données
      } catch (error) {
        setError(error.message); // Gère les erreurs
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    
    fetchData(); 
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  // Filtrage des départements en fonction du terme de recherche
  const filteredDepartements = dept.filter((d) =>
    d.dept_nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDepartements.slice(startIndex, startIndex + itemsPerPage); // Utiliser filteredDepartements
  const totalPages = Math.ceil(filteredDepartements.length / itemsPerPage); // Calculer le total basé sur les résultats filtrés

  // Gestion de la pagination
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <HeaderRH /> 
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Département</h4>
                    <p className="card-description">Ajouter un département</p>
                    <form className="forms-sample">
                      <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" className="form-control" id="nom" placeholder="Nom du département" />
                      </div>
                      <button type="submit" className="btn btn-primary me-2">Submit</button>
                      <button type="reset" className="btn btn-light">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <div>
                        <h4 className="card-title">Directions</h4>
                        <p className="card-description">Listes</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", position: "relative", maxWidth: "300px" }}>
                        <i className="mdi mdi-magnify" 
                          style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "gray" }}>
                        </i>
                        <input
                          type="text"
                          placeholder="Recherche"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="form-control"
                          style={{ paddingLeft: "40px", maxWidth: "300px" }}
                        />
                      </div>
                    </div>
                    <div className="table-responsive pt-3">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Nom</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((d) => (
                            <tr key={d.dept_id}>
                              <td>{d.dept_nom}</td>
                              <td><i className="mdi mdi-pencil-box-outline" style={{ color: "blue" }} title="Modifier"></i></td>
                              <td><i className="mdi mdi-delete" style={{ color: "red" }} title="Supprimer"></i></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination simplifiée */}
                    <div className="pagination">
                      <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                        <i className="mdi mdi-arrow-left-drop-circle" style={{ color: 'green' }}></i>
                      </button>
                      <span> {currentPage} sur {totalPages} </span>
                      <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <i className="mdi mdi-arrow-right-drop-circle" style={{ color: 'green' }}></i>
                      </button>
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

export default Liste;
