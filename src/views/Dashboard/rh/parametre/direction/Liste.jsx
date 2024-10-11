import React, { useEffect, useState } from "react";
import HeaderRH from 'components/header/HeaderRh';
import Footer from 'components/footer/Footer';
import Ajout from './Ajout';

import 'assets/vendors/mdi/css/materialdesignicons.min.css';
import 'assets/vendors/base/vendor.bundle.base.css';
import 'assets/vendors/select2/select2.min.css';
import 'assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css';
import 'assets/css/style.css';
import Swal from 'sweetalert2';

import { collabInstance } from "axiosConfig";

const Liste = () => {
  const [dir, setDir] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await collabInstance.get("/Dir/liste");
      setDir(response.data);
    } catch (error) {
      setError("Erreur réseau: " + error.message);
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Si l'application est en train de charger
  if (loading) return <div>Loading...</div>;

  // Filtrer les données en fonction du terme de recherche
  const filteredDirections = dir.filter((dir) =>
    dir.dir_nom && dir.dir_nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDirections.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredDirections.length / itemsPerPage);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  
  const handleDelete = async (dir_id) => {
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
        await collabInstance.delete(`/Dir/supprimer/${dir_id}`);
        Swal.fire(
          'Supprimé !',
          'Le département a été supprimé avec succès.',
          'success'
        );
        // Rafraîchir les données après la suppression
        fetchData();
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
              {/* Inclure le composant Ajout ici */}
              <Ajout onDirectionAdded={fetchData} />

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
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="form-control"
                          style={{ paddingLeft: "40px", maxWidth: "300px" }}
                        />
                      </div>
                    </div>

                    {/* Affichage du message d'erreur si une erreur réseau est détectée */}
                    {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}

                    {/* Si aucune direction n'est trouvée, afficher un message */}
                    {dir.length === 0 && !loading ? (
                      <p>Aucune donnée disponible</p>
                    ) : (
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
                            {currentItems.map((dir, index) => (
                              <tr key={dir.dir_id} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                                <td>{dir.dir_nom}</td>
                                <td><i className="mdi mdi-pencil-box-outline" style={{ color: "blue" }} title="Modifier"></i></td>
                                <td>
                                  <i 
                                    className="mdi mdi-delete" 
                                    style={{ color: "red" }} 
                                    title="Supprimer"
                                    onClick={() => handleDelete(dir.dir_id)}
                                  ></i>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

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