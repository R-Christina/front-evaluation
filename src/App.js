// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5273/api/helloworld')
//       .then(response => {
//         setMessage(response.data);
//       })
//       .catch(error => {
//         console.error('Il y a eu une erreur!', error);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1>{message}</h1>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App()
{
    const [type_emp, setType_emp] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5228/api/Type_emp')
        .then(response => {
            setType_emp(response.data);
        })
        .catch(err=> {
            setError(err.message);
        });
    }, []);

    return (
        <div>
            <h1>Liste des type d'employé</h1>
            {error && <p>Erreur : {error}</p>}
            <ul>
                {type_emp.map(type_emp => (
                    <li key={type_emp.type_emp_id}>{type_emp.type_emp_nom}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;