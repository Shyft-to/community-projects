import logo from "../resources/images/shyft-logo.svg";
const NavBarComponent = ({openNav}) => {
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
          {/* <button className="open-toggle" onClick={openNav}>
            <i className="fas fa-bars"></i>
          </button> */}
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

        </div>
      </nav>
    </div>
  );
};

export default NavBarComponent;
