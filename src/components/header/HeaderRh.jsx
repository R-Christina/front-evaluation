import React from "react";
import { Link } from 'react-router-dom';
import "../../assets/css/style.css";
import "../../assets/vendors/mdi/css/materialdesignicons.min.css";
import "../../assets/vendors/base/vendor.bundle.base.css";
import logoImage from "assets/img/logo.jpg";

const HeaderRh = () => {
  return (
    <div className="horizontal-menu">
      <nav className="navbar top-navbar col-lg-12 col-12 p-0">
        <div className="container-fluid">
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
            <ul className="navbar-nav navbar-nav-left">
              <li className="nav-item dropdown">
                <a
                  className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center"
                  id="notificationDropdown"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <i className="mdi mdi-bell mx-0"></i>
                  <span className="count bg-success">2</span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                  aria-labelledby="notificationDropdown"
                >
                  <p className="mb-0 font-weight-normal float-left dropdown-header">
                    Notifications
                  </p>
                  <a className="dropdown-item preview-item" href="#">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-success">
                        <i className="mdi mdi-information mx-0"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <h6 className="preview-subject font-weight-normal">
                        Application Error
                      </h6>
                      <p className="font-weight-light small-text mb-0 text-muted">
                        Just now
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item" href="#">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-warning">
                        <i className="mdi mdi-settings mx-0"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <h6 className="preview-subject font-weight-normal">
                        Settings
                      </h6>
                      <p className="font-weight-light small-text mb-0 text-muted">
                        Private message
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item" href="#">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-info">
                        <i className="mdi mdi-account-box mx-0"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <h6 className="preview-subject font-weight-normal">
                        New user registration
                      </h6>
                      <p className="font-weight-light small-text mb-0 text-muted">
                        2 days ago
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
                  id="messageDropdown"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <i className="mdi mdi-email mx-0"></i>
                  <span className="count bg-primary">4</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown" >
                  <p className="mb-0 font-weight-normal float-left dropdown-header"> Messages </p>
                  <a className="dropdown-item preview-item" href="#">
                    <div className="preview-thumbnail">
                      <img
                        src="../../assets/images/faces/face4.jpg"
                        alt="profile-pic"
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content flex-grow">
                      <h6 className="preview-subject ellipsis font-weight-normal">
                        David Grey
                      </h6>
                      <p className="font-weight-light small-text text-muted mb-0">
                        The meeting is cancelled
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item" href="#">
                    <div className="preview-thumbnail">
                      <img
                        src="../../assets/images/faces/face2.jpg"
                        alt="profile-pic"
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content flex-grow">
                      <h6 className="preview-subject ellipsis font-weight-normal">
                        Tim Cook
                      </h6>
                      <p className="font-weight-light small-text text-muted mb-0">
                        New product launch
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item" href="#">
                    <div className="preview-thumbnail">
                      <img
                        src="../../assets/images/faces/face3.jpg"
                        alt="profile-pic"
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content flex-grow">
                      <h6 className="preview-subject ellipsis font-weight-normal">
                        Johnson
                      </h6>
                      <p className="font-weight-light small-text text-muted mb-0">
                        Upcoming board meeting
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a href="#" className="nav-link count-indicator">
                  <i className="mdi mdi-message-reply-text"></i>
                </a>
              </li>
              <li className="nav-item nav-search d-none d-lg-block ms-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="search">
                      <i className="mdi mdi-magnify"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="search"
                    aria-label="search"
                    aria-describedby="search"
                  />
                </div>
              </li>
            </ul>
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item dropdown d-lg-flex d-none">
                <button
                  type="button"
                  className="btn btn-inverse-primary btn-sm"
                >
                  Product
                </button>
              </li>
              <li className="nav-item dropdown d-lg-flex d-none">
                <a className="dropdown-toggle show-dropdown-arrow btn btn-inverse-primary btn-sm" id="nreportDropdown" href="#" data-bs-toggle="dropdown" > {" "}  Reports
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="nreportDropdown" >
                  <p className="mb-0 font-weight-medium float-left dropdown-header"> Reports </p>
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-file-pdf text-primary"></i> Pdf
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-file-excel text-primary"></i> Excel
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown d-lg-flex d-none">
                <button
                  type="button"
                  className="btn btn-inverse-primary btn-sm"
                >
                  Settings
                </button>
              </li>
              <li className="nav-item nav-profile dropdown">
                <a href="#" data-bs-toggle="dropdown" id="profileDropdown"> 
                  <p className="mb-0 font-weight-medium float-left dropdown-header"> Profil </p>
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-settings text-primary"></i> Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-logout text-primary"></i> Logout
                  </a>
                </div>
              </li>
              <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a className="navbar-brand brand-logo" href="index.html">
                <img
                  src={logoImage}
                  alt="logo"
                  style={{ width: "80px", height: "auto" }}
                />
              </a>
              <a className="navbar-brand brand-logo-mini" href="index.html">
                <img
                  src={logoImage}
                  alt="logo"
                  style={{ width: "50px", height: "auto" }}
                />
              </a>
              </div>
          </ul>
          </div>
        </div>
      </nav>
      <nav className="bottom-navbar">
        <div className="container">
          <ul className="nav page-navigation">
            <li className="nav-item">
              <a className="nav-link" href="index.html">
                <i className="mdi mdi-file-document-box menu-icon"></i>
                <span className="menu-title">Tableau de bord</span>
              </a>
            </li>
            <li class="nav-item">
                  <Link className="nav-link" to="/rh/evaluation">
                    <i class="mdi mdi-file-document-box-outline menu-icon"></i>
                    <span class="menu-title">évaluation</span> </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="mdi mdi-file-document menu-icon"></i>
                <span className="menu-title">Fiche d'évaluation</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="submenu">
                <ul>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/ui-features/buttons.html" > Fiche Cadre </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/ui-features/dropdowns.html" > Fiche Non Cadre </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="mdi mdi-account-multiple menu-icon"></i>
                <span className="menu-title">Collaborateur</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="submenu">
                <ul>
                  <li className="nav-item">
                    <Link className="nav-link" to="/rh/collaborateur/liste">Liste des collaborateurs</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="mdi mdi-archive menu-icon"></i>
                <span className="menu-title">Archive</span>
                <i className="menu-arrow"></i>
              </a>
              <div className="submenu">
                <ul>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/forms/basic_elements.html" > Historique </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/forms/basic_elements.html" > Collaborateur </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default HeaderRh;