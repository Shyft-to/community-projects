const Airdrop = () => {
    return ( 
        <div className="right-al-container">
      <div className="container-xl mint-single">
        <div className="row page-heading-container">
          <div className="col-sm-12 col-md-12">
            <h2 className="section-heading" style={{marginTop: "-60px"}}>Airdrop Token</h2>
          </div>
        </div>

        <form>
          <div className="row">
            <div className="col-sm-12 col-md-8 p-2">
              <div className="form-section">
                <div className="form-elements-container">
                  
                  <div className="white-form-group">
                    <label htmlFor="email" className="form-label">
                      Network
                    </label>
                    <select
                      name="network"
                      className="form-control form-select"
                      id=""
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                    </select>
                  </div>
                  <div className="white-form-group">
                    <label className="form-label">
                      Receiver Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter here"
                    />
                  </div>
                  
                  <div className="white-form-group">
                    <label className="form-label">
                      Token Address
                    </label>
                    <input
                      type="text"
                      name="frezeAuth"
                      className="form-control"
                      placeholder="Enter here"
                      required
                    />
                  </div>
                  

                  <div className="white-form-group">
                    <label className="form-label" htmlFor="decimal">
                      Decimal
                    </label>
                    <input
                      type="text"
                      name="decimal"
                      className="form-control"
                      placeholder="Enter Max Supply Value"
                      required
                    />
                  </div>
                  
                                    
                  <div className="white-form-group">
                    <button
                      className="btn-solid-grad-wide"
                      type="submit"
                    >
                      Airdrop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    );
}
 
export default Airdrop;