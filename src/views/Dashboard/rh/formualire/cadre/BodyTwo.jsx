import React, { useState } from "react";

function BodyTwo({ tds, setTds }) {
    const [newTd, setNewTd] = useState('');
    const [newLine, setNewLine] = useState('');


    // Function to handle adding new elements
    const handleAdd = (event) => {
        event.preventDefault();
        if (newTd.trim() && newLine) { // Ensure both fields are filled
            const newId = tds.length + 1; // Generate a new id
            const newTdObj = { id: newId, td_nom: newTd, ligne: newLine }; // Create new object
            setTds([...tds, newTdObj]); // Update state with new object
            setNewTd(''); // Reset input field
            setNewLine(''); // Reset line field
        }
    };

    return (
        <>
            <div className="mb-3">
                <p className="mb-2">Indicateurs de performances:</p>

                {/* Affichage de la liste des éléments */}
                <ul className="list-group mb-3">
                    {tds.map((td) => (
                        <li key={td.id} className="list-group-item">
                            {td.td_nom} {td.ligne}
                        </li>
                    ))}
                </ul>

                {/* Zone d'entrée pour ajouter un nouvel élément */}
                <div className="d-flex mb-2">
                    <input
                        type="text"
                        value={newTd}
                        onChange={(e) => setNewTd(e.target.value)}
                        placeholder="Ajouter un nouvel élément"
                        className="form-control me-2"
                    />
                    <input 
                        type="number"
                        min={1}
                        max={4}
                        value={newLine} 
                        onChange={(e) => setNewLine(e.target.value)}
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

export default BodyTwo;