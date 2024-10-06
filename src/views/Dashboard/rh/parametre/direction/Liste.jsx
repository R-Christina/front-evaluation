import React, { useEffect, useState } from "react";
import HeaderRH from 'components/header/HeaderRh';
import Footer from 'components/footer/Footer';

// Fichiers CSS
import 'assets/vendors/mdi/css/materialdesignicons.min.css';
import 'assets/vendors/base/vendor.bundle.base.css';
import 'assets/vendors/select2/select2.min.css';
import 'assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css';
import 'assets/css/style.css';

import { collabInstance } from "axiosConfig";

const Liste = () => {
  const [dir, setDir] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await collabInstance.get("/Dir/liste");
        setDir(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  // Appliquer le filtre de recherche AVANT la pagination
  const filteredDirections = dir.filter((dir) =>
    dir.dir_nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination sur les résultats filtrés
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDirections.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredDirections.length / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
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
                    <h4 className="card-title">Direction</h4>
                    <p className="card-description">Ajouter un direction</p>
                    <form className="forms-sample">
                      <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nom"
                          placeholder="Nom du direction"
                        />
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
                      {/* Barre de recherche avec icône */}
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
                          style={{ paddingLeft: "40px", maxWidth: "300px" }} // Padding pour laisser de l'espace à l'icône
                        />
                      </div>
                    </div>
                    {/* Table des départements */}
                    <div className="table-responsive pt-3">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th style={{padding: "10px", fontSize: "16px"}}>Nom</th>
                            <th style={{padding: "10px", fontSize: "16px"}}>Modifier</th>
                            <th style={{padding: "10px", fontSize: "16px"}}>Supprimer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((dir, index) => (
                            <tr key={dir.dir_id} style={{backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff"}}>
                              <td style={{padding: "10px"}}>{dir.dir_nom}</td>
                              <td style={{padding: "10px"}}>
                                <i className="mdi mdi-pencil-box-outline" style={{color: "blue"}} title="Modifier"></i>
                              </td>
                              <td style={{padding: "10px"}}>
                                <i className="mdi mdi-delete" style={{color: "red"}} title="Supprimer"></i>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination avec des flèches */}
                    <div className="pagination">
                      <button onClick={prevPage} disabled={currentPage === 1}>
                        <i className="mdi mdi-arrow-left-drop-circle" style={{ color: 'green' }}></i>
                      </button>
                      <span> {currentPage} sur {Math.ceil(filteredDirections.length / itemsPerPage)} </span>
                      <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredDirections.length / itemsPerPage)}>
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
}

export default Liste;