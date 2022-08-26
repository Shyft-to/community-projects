import logo from "../resources/images/shyft-logo.svg";
import github from "../resources/images/footer/github-2.svg";
const NavBarComponent = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top our-navbar">
                <div className="container-fluid">
                    <a id="hide-on-lg" className="navbar-brand" href="/"><img src={logo} style={{ width: "80px" }} alt="Shyft" /></a>
                    
                    
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                    <div className='container-fluid'>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav w-100">
                                {/* <li className="nav-item">
                                    <a id="hide-on-md" className="navbar-brand" href="/"><img src={logo} style={{ width: "80px" }} alt="Shyft" /></a>
                                </li> */}
                                
                                <li className="nav-item icons-menu">
                                    <a className="mx-3 pt-1" href="https://docs.shyft.to/" target="_blank" rel="noreferrer">Read Docs</a>
                                    <a className="btn-solid-grad-xs-2 mx-3" href="https://shyft.to/" target="_blank" rel="noreferrer">Get API key</a>
                                    <a type="button" className="btn btn-link px-2" href="https://github.com/Shyft-to/community-projects/tree/main/nft-project" target="_blank" rel="noreferrer"> <img src={github} alt="Github Repo" /> </a>
                                    {/*<a type="button" className="btn btn-link px-1 me-2" href="https://www.linkedin.com/company/shyft-to/" target="_blank" rel="noreferrer"> <img src={linkedIn} alt="Connect on LinkedIn" /> </a>
                                    <a type="button" className="btn btn-link px-1 me-2" href="https://twitter.com/shyft_to" target="_blank" rel="noreferrer"> <img src={twitter} alt="Tweet about Us" /> </a> */}
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
          </nav>
    </div>
  );
};

export default NavBarComponent;
