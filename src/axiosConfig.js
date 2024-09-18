import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5163/api", // Remplacez par l'URL de base de votre API
  // Vous pouvez ajouter des en-têtes ou des configurations globales ici
});

// Vous pouvez également ajouter des intercepteurs pour les requêtes et les réponses
axiosInstance.interceptors.request.use(
  config => {
    // Ajouter des en-têtes ou des configurations spécifiques aux requêtes
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Gérer les erreurs globalement
    return Promise.reject(error);
  }
);

export default axiosInstance;