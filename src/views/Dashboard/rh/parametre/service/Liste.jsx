import React, { useEffect, useState } from "react"; // Import React et hooks
import HeaderRH from 'components/header/HeaderRh'; // Composant Header
import Footer from 'components/footer/Footer'; // Composant Footer

// Fichiers CSS
import 'assets/vendors/mdi/css/materialdesignicons.min.css';
import 'assets/vendors/base/vendor.bundle.base.css';
import 'assets/vendors/select2/select2.min.css';
import 'assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css';
import 'assets/css/style.css';

// Instance axios pour les requêtes API
import { collabInstance } from "axiosConfig";

const Liste = () => {
  // États pour stocker les données, le chargement, les erreurs et la pagination
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const itemsPerPage = 10; // Nombre d'éléments par page
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche

  // Effet pour récupérer les données au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await collabInstance.get("/Service/liste");
        setService(response.data); // Mise à jour des données de services
      } catch (error) {
        setError(error.message); // En cas d'erreur, on met à jour l'état d'erreur
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false); // Fin du chargement, quel que soit le résultat
      }
    };
    
    fetchData(); // Appel de la fonction pour récupérer les données
  }, []); // Le tableau vide signifie que l'effet se déclenche au montage

  // Gestion des erreurs
  if (error) return <div>Error: {error}</div>;
  if (loading) return <div>Loading...</div>;

  // Filtrage des services en fonction du terme de recherche
  const filteredServices = service.filter((s) =>
    s.service_nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination: Calcul des services à afficher sur la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem); // Utiliser filteredServices

  // Fonction pour changer de page
  const nextPage = (event) => {
    event.preventDefault(); // Empêche le rechargement
    if (currentPage < Math.ceil(filteredServices.length / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = (event) => {
    event.preventDefault(); // Empêche le rechargement
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // Fonction de soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement
    // Ici, vous pouvez ajouter le code pour soumettre le service, par exemple via une requête API
  };

  return (
    <>
      <HeaderRH /> {/* Composant Header */}
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">

              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Service</h4>
                    <p className="card-description">Ajouter un service</p>
                    <form className="forms-sample" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nom"
                          placeholder="Nom du service"
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
                        <h4 className="card-title">Services</h4>
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

                    {/* Table des services */}
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
                          {currentItems.map((s, index) => (
                            <tr key={s.service_id} style={{backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff"}}>
                              <td style={{padding: "10px"}}>{s.service_nom}</td>
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
                      <span> {currentPage} sur {Math.ceil(filteredServices.length / itemsPerPage)} </span>
                      <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredServices.length / itemsPerPage)}>
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
      <Footer /> {/* Composant Footer */}
    </>
  );
}

export default Liste;