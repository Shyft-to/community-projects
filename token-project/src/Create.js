import { useContext, useState } from "react";
import { WalletContext } from "./WalletContext";

const CreateToken = () => {
  const {walletId,setWalletId} = useContext(WalletContext);

  return (
    <div className="right-al-container">
      <button onClick={() => setWalletId("Updating")}>Update</button>
      <div className="container-xl mint-single">
        <div className="row page-heading-container">
          <div className="col-sm-12 col-md-12">
            <h2 className="section-headings">Create A Token</h2>
          </div>
        </div>

        <form>
          <div className="row">
            <div className="col-sm-12 col-md-6 p-3">
              <div className="image-section">
                <div className="image-container">
                  <div className="inner">
                    <img src="" alt="" />
                  </div>
                </div>
                <div className="button-container">
                  <button className="btn-solid-grad-fullwidth text-center">
                    Upload File
                  </button>

                  <br></br>
                  <input
                    type="file"
                    id="testFile"
                    style={{
                      marginTop: "-54px",
                      position: "absolute",
                      width: "500px",
                      height: "50px",
                      border: "2px solid black",
                      zIndex: 3,
                      opacity: 0,
                    }}
                    
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="form-section">
                <div className="form-elements-container">
                  <div className="white-form-group">
                    <label className="form-label" htmlFor="name">
                      Upload File
                    </label>
                    
                  </div>
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
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                  <div className="white-form-group">
                    <label className="form-label" htmlFor="symbol">
                      Symbol
                    </label>
                    <input
                      type="text"
                      name="symbol"
                      className="form-control"
                      placeholder="Enter Symbol"
                      required
                    />
                  </div>
                  <div className="white-form-group">
                    <label htmlFor="bio" className="form-label">
                      Description
                    </label>
                    <p>Some Description asd a asdwadasew asd awda sdaw dasd</p>
                    <textarea
                      name="desc"
                      className="form-control"
                      placeholder="Write a short product description"
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <div className="white-form-group">
                    <label className="form-label" htmlFor="name">
                      Freeze Authority
                    </label>
                    <input
                      type="text"
                      name="frezeAuth"
                      className="form-control"
                      placeholder="Enter Private Key"
                      required
                    />
                  </div>
                  <div className="white-form-group">
                    <label className="form-label" htmlFor="maxSupply">
                      Mint Authority
                    </label>
                    <input
                      type="text"
                      name="mintauth"
                      className="form-control"
                      placeholder="Enter Max Supply Value"
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
                      className="btn-solid-grad"
                      type="submit"
                    >
                      Create
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
};

export default CreateToken;
