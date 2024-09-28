import React from 'react';

import "../../assets/css/style.css";
import "../../assets/vendors/mdi/css/materialdesignicons.min.css";
import "../../assets/vendors/base/vendor.bundle.base.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrap">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            Copyright © RH EVAL 2024
          </span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            Only the best RH EVAL
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
