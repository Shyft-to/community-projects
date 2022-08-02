import logo from "../resources/images/shyft-logo.svg";
const NavBarComponent = () => {
  return (
    <div>
      <nav className="navbar navbar-expand fixed-top our-navbar">
        <div className="container-fluid contained-nav">
          <a className="navbar-brand me-2" href="/">
            <img
              src={logo}
              height="16"
              alt="ShyftLogo"
              loading="lazy"
              style={{ marginTop: "-1px" }}
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <a className="nav-link" href="/">Dashboard</a>
            </li>
            </ul>

            <div className="d-flex align-items-center">
            <a type="button" className="btn btn-link px-3 me-2" href="/">
                Why Us
            </a>
            <a type="button" className="btn btn-link px-3 me-2" href="/">
                Partner With Us
            </a> 
            <button id="side-panel" type="button" className="btn btn-primary me-3" onclick="openNav()">
                &#9776;
            </button>
            </div>
        </div> */}
        </div>
      </nav>
    </div>
  );
};

export default NavBarComponent;
