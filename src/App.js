import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// Import pages
import Login from "./views/Auth/Login";
import Profil from "./views/Dashboard/profil/Profil";
import Rh from "./views/Dashboard/rh/Home";
import Evaluation from './views/Dashboard/rh/evaluation/Evaluation';
import CollaborateurListe from './views/Dashboard/rh/collaborateur/Liste';


import Collaborateur from "./views/Dashboard/collaborateur/Home";


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