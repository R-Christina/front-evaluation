import React, { useEffect, useState } from 'react';
import { periodeInstance } from 'axiosConfig'; // Adjust the path as needed

const ListeEvaluation = ({ isDataUpdated }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEvaluationId, setEditingEvaluationId] = useState(null); // New state for editing
  const [editableEvaluation, setEditableEvaluation] = useState({}); // Stores editable fields
  const evaluationsPerPage = 10;

  const fetchEvaluations = async () => {
    try {
      const response = await periodeInstance.get('/Periode');
      setEvaluations(response.data);
    } catch (err) {
      setError('Erreur lors de la récupération des évaluations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, [isDataUpdated]);

  const indexOfLastEvaluation = currentPage * evaluationsPerPage;
  const indexOfFirstEvaluation = indexOfLastEvaluation - evaluationsPerPage;
  const currentEvaluations = evaluations.slice(indexOfFirstEvaluation, indexOfLastEvaluation);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString));
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(evaluations.length / evaluationsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditClick = (evaluation) => {
    setEditingEvaluationId(evaluation.eval_id); // Set the evaluation being edited
    setEditableEvaluation({ ...evaluation }); // Copy the current evaluation data to editable state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableEvaluation({ ...editableEvaluation, [name]: value });
  };

  const handleSaveClick = async (eval_id) => {
    try {
      // Make the API call to update the evaluation with the specified eval_id
      const response = await periodeInstance.put(`/Periode/${eval_id}`, editableEvaluation);

      console.log(`Evaluation ${eval_id} saved successfully:`, response.data);

      // Optionally, refresh the evaluations list after saving
      fetchEvaluations();

      // Reset the editing state after saving
      setEditingEvaluationId(null);
    } catch (error) {
      console.error(`Error saving evaluation ${eval_id}:`, error);
      setError('Erreur lors de la sauvegarde de l\'évaluation.');
    }
  };

  const handleCancelClick = () => {
    // Reset the editing state without saving changes
    setEditingEvaluationId(null);
    setEditableEvaluation({});
  };


  const cloturerEvaluation = async (eval_id) => {
    try {
      // Requête PUT pour mettre à jour l'état de l'évaluation
      const response = await periodeInstance.put(`/Periode/${eval_id}/etat`, 2);
      fetchEvaluations();
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'évaluation ${eval_id}:`, error);
      setError('Erreur lors de la mise à jour de l\'évaluation.');
    }
  };   

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Liste des évaluations</h4>
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Année</th>
                    <th>Fixation des objectifs</th>
                    <th>Mi-parcours</th>
                    <th>Final</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEvaluations.map((evaluation) => (
                    <tr key={evaluation.eval_id}>
                      {/* Check if this row is in edit mode */}
                      {editingEvaluationId === evaluation.eval_id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              name="eval_annee"
                              value={editableEvaluation.eval_annee}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="fixation_objectif"
                              value={editableEvaluation.fixation_objectif}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="mi_parcours"
                              value={editableEvaluation.mi_parcours}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              name="final"
                              value={editableEvaluation.final}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            {/* Display status but do not allow editing */}
                            <span>{evaluation.etat.etat_nom}</span>
                          </td>
                          <td>
                            <button className="badge badge-primary" onClick={() => handleSaveClick(evaluation.eval_id)} style={{ marginRight: '10px' }} >    Sauvegarder 
                            </button>
                            <button className="badge badge-secondary" onClick={handleCancelClick} > Annuler </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{evaluation.eval_annee}</td>
                          <td>{formatDate(evaluation.fixation_objectif)}</td>
                          <td>{formatDate(evaluation.mi_parcours)}</td>
                          <td>{formatDate(evaluation.final)}</td>
                          <td style={{ color: evaluation.etat.etat_id === 1 ? '#fcd53b' : 'blue' }}> {evaluation.etat ? evaluation.etat.etat_nom : 'N/A'}
                          </td>
                          <td>
                            {evaluation.etat.etat_id === 1 ? (
                              <button className="badge badge-success" onClick={() => cloturerEvaluation(evaluation.eval_id)} >
                                Cloturer
                              </button>
                            ) : (
                              <button className="badge badge-secondary" disabled>
                                Cloturer
                              </button>
                            )}
                          </td>
                          <td>
                            {evaluation.etat.etat_id === 1 ? (
                              <button
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                onClick={() => handleEditClick(evaluation)}
                              >
                                <i className="mdi mdi-pencil-box-outline" style={{ color: 'blue' }}></i>
                              </button>
                            ) : (
                              <button
                                style={{ background: 'none', border: 'none', cursor: 'default' }}
                                disabled
                              >
                                <i className="mdi mdi-pencil-box-outline" style={{ color: 'gray' }}></i>
                              </button>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  <i className="mdi mdi-arrow-left-drop-circle" style={{ color: 'green' }}></i>
                </button>
                <span> {currentPage} sur {Math.ceil(evaluations.length / evaluationsPerPage)} </span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(evaluations.length / evaluationsPerPage)} >
                  <i className="mdi mdi-arrow-right-drop-circle" style={{ color: 'green' }}></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListeEvaluation;
