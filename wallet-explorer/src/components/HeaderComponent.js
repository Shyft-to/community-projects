import logo from "../resources/images/shyft-logo.svg";
const HeaderComponent = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark fixed-top our-navbar">
        <div className="container-lg">
            <a className="navbar-brand" href="/">
                <img src={logo} style={{width:"80px"}} alt="SHYFT Logo" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse w-100 justify-content-end" id="collapsibleNavbar">
            <ul className="navbar-nav">
                {/* <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
                </li> */}
                <li className="nav-item">
                    <a className="nav-link btn-solid-grad" href="#">Get API Key</a>
                </li>    
            </ul>
            </div>
        </div>
    </nav>
  );
};

export default HeaderComponent;
