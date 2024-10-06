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
  const [collaborateurs, setCollaborateurs] = useState([]); // État pour stocker les collaborateurs
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await collabInstance.get("/Emp/liste"); // Récupérer les données
        setCollaborateurs(response.data); // Stocker les données dans l'état
      } catch (error) {
        setError(error.message); // Gérer les erreurs
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    fetchData();
  }, []);

  // Fonction pour filtrer les collaborateurs en fonction de la recherche
  const filteredCollaborateurs = collaborateurs.filter(collab => 
    collab.EmpNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.Matricule.toString().includes(searchTerm.toLowerCase())
  );
  

  if (loading) return <div>Loading...</div>; // Afficher un message de chargement
  if (error) return <div>Error: {error}</div>; // Afficher un message d'erreur

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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h4 className="card-title">Collabolateurs</h4>
                        <p className="card-description">Listes</p>
                      </div>
                      {/* Barre de recherche avec icône */}
                      <div style={{ display: "flex", alignItems: "center", position: "relative", maxWidth: "300px" }}>
                        <i className="mdi mdi-account-search" 
                        style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "gray" }}></i>
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
                    <div className="table-responsive pt-3">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Matricule</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Département</th>
                            <th>Direction</th>
                            <th>Service</th>
                            <th>Poste</th>
                            <th>n+1</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCollaborateurs.map(collab => (
                            <tr key={collab.EmpId}>
                              <td>{collab.Matricule}</td>
                              <td>{collab.EmpNom}</td>
                              <td>{collab.EmpPrenom}</td>
                              <td>{collab.DeptNom}</td>
                              <td>{collab.DirNom}</td>
                              <td>{collab.ServiceNom}</td>
                              <td>{collab.PosteNom}</td>
                              <td>{collab.SupérieurNom}</td>
                            </tr>
                          ))}
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
    </>
  );
}

export default Liste;
