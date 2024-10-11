import React, { useState } from 'react';
import { collabInstance } from "axiosConfig";

const Ajout = ({ onDirectionAdded }) => {
  const [newDirection, setNewDirection] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur

  const handleAddDirection = async (e) => {
    e.preventDefault();

    if (!newDirection) {
      setErrorMessage("Veuillez saisir un nom de direction.");
      return;
    }

    try {
      const response = await collabInstance.post('Dir/ajouter', {
        dir_nom: newDirection,
      });
      console.log('Direction ajoutée avec succès:', response.data);
      
      // Rafraîchir les données pour s'assurer que la nouvelle direction est bien ajoutée
      await onDirectionAdded();

      // Réinitialiser l'état du champ
      setNewDirection("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la direction :", error);
      setErrorMessage("Erreur lors de l'ajout du direction. Veuillez réessayer."); // Message d'erreur pour l'utilisateur
    }
  };

  return (
    <div className="col-md-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Direction</h4>
          <p className="card-description">Ajouter une direction</p>
          <form className="forms-sample" onSubmit={handleAddDirection}>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                placeholder="Nom de la direction"
                value={newDirection}
                onChange={(e) => setNewDirection(e.target.value)}
                aria-describedby="directionHelp"
              />
              {errorMessage && <div className="text-danger mt-2" id="directionHelp">{errorMessage}</div>}
            </div>
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            <button type="reset" className="btn btn-light">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ajout;