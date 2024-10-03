import React, { useState, useEffect } from "react";
import HeaderRH from 'components/header/HeaderRh';
import Footer from 'components/footer/Footer';
import ListeEvaluation from './ListeEvaluation';
import { periodeInstance } from 'axiosConfig';
import 'assets/vendors/mdi/css/materialdesignicons.min.css';
import 'assets/vendors/base/vendor.bundle.base.css';
import 'assets/vendors/select2/select2.min.css';
import 'assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css';
import 'assets/css/style.css';

const Evaluation = () => {
  const [formData, setFormData] = useState({
    eval_annee: '',
    fixation_objectif: '',
    mi_parcours: '',
    final: '',
    etat_id: 1,
  });

  const [message, setMessage] = useState(''); // For error messages
  const [successMessage, setSuccessMessage] = useState(''); // For success messages
  const [isDataUpdated, setIsDataUpdated] = useState(false); // For triggering refresh in child component

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await periodeInstance.post('/Periode', formData);

      if (response.data.Success === false) {
        setMessage(`Erreur: ${response.data.Errors.join(', ')}`);
        setSuccessMessage(''); 
      } else {
        setMessage(''); 
        setSuccessMessage('');
        setIsDataUpdated(true); // Trigger update

        setFormData({
          eval_annee: '',
          fixation_objectif: '',
          mi_parcours: '',
          final: '',
          etat_id: 1,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data.Errors;
        if (Array.isArray(errors)) {
          setMessage(`Erreur: ${errors.join(', ')}`);
          setSuccessMessage(''); 
        } else {
          setMessage(`Erreur: ${error.response.data.Message || 'Une erreur s\'est produite.'}`);
          setSuccessMessage(''); 
        }
      } else {
        setMessage(`Erreur: ${error.message}`);
        setSuccessMessage(''); 
      }
    }
  };

  useEffect(() => {
    if (isDataUpdated) {
      setIsDataUpdated(false); // Reset after triggering update
    }
  }, [isDataUpdated]);

  return (
    <>
      <HeaderRH />
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Évaluation</h4>
                    <p className="card-description">Nouvelle période d'évaluation</p>
                    <form className="forms-sample" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="eval_annee">Année</label>
                        <input
                          type="text"
                          className="form-control"
                          id="eval_annee"
                          name="eval_annee"
                          placeholder="Année"
                          value={formData.eval_annee}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fixation_objectif">Fixation des objectifs</label>
                        <input
                          type="date"
                          className="form-control"
                          id="fixation_objectif"
                          name="fixation_objectif"
                          value={formData.fixation_objectif}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="mi_parcours">Mi-parcours</label>
                        <input
                          type="date"
                          className="form-control"
                          id="mi_parcours"
                          name="mi_parcours"
                          value={formData.mi_parcours}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="final">Final</label>
                        <input
                          type="date"
                          className="form-control"
                          id="final"
                          name="final"
                          value={formData.final}
                          onChange={handleChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary me-2">Submit</button>
                      <button type="reset" className="btn btn-light">Cancel</button>
                    </form>
                    {message && <div className="alert alert-danger mt-3">{message}</div>}
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                  </div>
                </div>
              </div>
              <ListeEvaluation isDataUpdated={isDataUpdated} /> {/* Pass the prop to child component */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Evaluation;
