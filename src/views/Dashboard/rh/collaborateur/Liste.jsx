import React from 'react';
import HeaderRH from 'components/header/HeaderRh';
import Footer from 'components/footer/Footer';
import '../../../../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../../../../assets/vendors/base/vendor.bundle.base.css';
import '../../../../assets/vendors/select2/select2.min.css';
import '../../../../assets/vendors/select2-bootstrap-theme/select2-bootstrap.min.css';
import '../../../../assets/css/style.css';

const Liste = () => {
  return (
    <>
    <HeaderRH />
    <div className="container-fluid page-body-wrapper">
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Collaborateur</h4>
                  <p className="card-description">
                    Listes
                  </p>
                  <div className="table-responsive pt-3">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Matricule</th>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Département</th>
                          <th>Direction</th>
                          <th>Service</th>
                          <th>Poste</th>
                          <th>n+1</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Herman</td>
                          <td>Beck</td>
                          <td>DSI</td>
                          <td>DSI</td>
                          <td>DSI</td>
                          <td>Chef de projet</td>
                          <td>Jean paule</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Herman</td>
                          <td>Beck</td>
                          <td>DSI</td>
                          <td>DSI</td>
                          <td>DSI</td>
                          <td>Chef de projet</td>
                          <td>Jean paule</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Liste;