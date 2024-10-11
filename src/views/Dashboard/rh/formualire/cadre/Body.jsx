import React, { useState } from "react";

function Body({ elements, setElements }) {
    const [newElement, setNewElement] = useState('');

    const handleAdd = (event) => {
        event.preventDefault();
        if (newElement.trim()) {
            // Ajoute le nouvel élément à la liste
            setElements([...elements, { id: elements.length + 1, label: newElement }]);
            setNewElement(''); // Réinitialise le champ d'entrée
        }
    };

    return (
        <>
        <div className="mb-3">
            <p className="mb-2">Titre de tableau:</p>

            {/* Affichage de la liste des éléments */}
            <ul className="list-group mb-3">
                {elements.map((element) => (
                    <li key={element.id} className="list-group-item">
                        {element.label}
                    </li>
                ))}
            </ul>

            {/* Zone d'entrée pour ajouter un nouvel élément */}
            <div className="d-flex mb-2">
                <input
                    type="text"
                    value={newElement}
                    onChange={(e) => setNewElement(e.target.value)}
                    placeholder="Ajouter un nouvel élément"
                    className="form-control me-2"
                />
                <button onClick={handleAdd} className="btn btn-primary">
                    <i className="fas fa-plus"></i> Ajouter
                </button>
            </div>
        </div>
        </>
    );
}

export default Body;