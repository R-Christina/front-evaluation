import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// Import pages
import Login from "./views/Auth/Login";
import Profil from "./views/Dashboard/profil/Profil";

import Rh from "./views/Dashboard/rh/Home";
import Evaluation from './views/Dashboard/rh/evaluation/Evaluation';
import CollaborateurListe from './views/Dashboard/rh/collaborateur/Liste';
import CollaborateurAjout from './views/Dashboard/rh/collaborateur/Ajout';
import FicheCadre from './views/Dashboard/rh/formualire/cadre/FicheCadre';
import Departement from './views/Dashboard/rh/parametre/departement/Liste';
import Direction from './views/Dashboard/rh/parametre/direction/Liste';
import Service from './views/Dashboard/rh/parametre/service/Liste';


import Collaborateur from "./views/Dashboard/collaborateur/Home";
import MatriceCadre from './views/Dashboard/rh/formualire/cadre/MatriceCadre';

import Superieur from "./views/Dashboard/superieur/Home";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Define routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard/profil" element={<Profil />} />

          {/* rh */}
          <Route path="/dashboard/rh" element={<Rh />} />
          <Route path="/rh/evaluation" element={<Evaluation />} />
          <Route path="/rh/collaborateur/liste" element={<CollaborateurListe />} />
          <Route path="/rh/collaborateur/ajout" element={<CollaborateurAjout/>} />
          <Route path="/rh/formulaire/ficheCadre" element={<FicheCadre />} />
          <Route path="/rh/formulaire/matriceCadre" element={<MatriceCadre />} />
          <Route path="/matriculecadre" element={<MatriceCadre />} />

          <Route path="/rh/parametre/dept" element={<Departement />} />
          <Route path="/rh/parametre/dir" element={<Direction />} />
          <Route path="/rh/parametre/service" element={<Service />} />

          {/* collab */}
          <Route path="/dashboard/collaborateur" element={<Collaborateur />} />

          {/* sup */}
          <Route path="/dashboard/superieur" element={<Superieur />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
export default App;