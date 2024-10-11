import React, { useState } from 'react';
import { collabInstance } from "axiosConfig";

const Ajout = ({ onDepartementAdded }) => {
  const [newDepartement, setNewDepartement] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur

  const handleAddDepartement = async (e) => {
    e.preventDefault();

    if (!newDepartement) {
      setErrorMessage("Veuillez saisir un nom de département.");
      return;
    }

    try {
      const response = await collabInstance.post('Dept/ajouter', {
        dept_nom: newDepartement,
      });
      console.log('Département ajouté avec succès:', response.data);
      
      // Appeler la fonction fournie par le parent pour mettre à jour la liste
      onDepartementAdded();

      // Réinitialiser le champ
      setNewDepartement("");
      setErrorMessage(""); // Réinitialiser le message d'erreur
    } catch (error) {
      console.error("Erreur lors de l'ajout du département :", error);
      setErrorMessage("Erreur lors de l'ajout du département. Veuillez réessayer."); // Message d'erreur pour l'utilisateur
    }
  };

  return (
    <div className="col-md-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Département</h4>
          <p className="card-description">Ajouter un département</p>
          <form className="forms-sample" onSubmit={handleAddDepartement}>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                placeholder="Nom du département"
                value={newDepartement}
                onChange={(e) => setNewDepartement(e.target.value)}
                aria-describedby="departementHelp"
              />
              {errorMessage && <div className="text-danger mt-2" id="departementHelp">{errorMessage}</div>}
            </div>
            <button type="submit" className="btn btn-primary me-2">Ajouter</button>
            <button 
              type="button" 
              className="btn btn-light" 
              onClick={() => {
                setNewDepartement(""); // Réinitialiser le champ
                setErrorMessage(""); // Réinitialiser le message d'erreur
              }}
            >
              Annuler
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ajout;