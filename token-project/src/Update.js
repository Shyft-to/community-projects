import { useState } from "react";

const Update = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [desc, setDesc] = useState("");
  const [decis, setDesics] = useState(9);
  const [img, setImg] = useState(null);

  const [dispFile, setDispFile] = useState();

  return (
    <div>
      <div className="right-al-container">
        <div className="container-xl mint-single">
          <div className="row page-heading-container">
            <div className="col-sm-12 col-md-12">
              <h2 className="section-heading">Update Token</h2>
            </div>
          </div>

          <form>
            <div className="row">
              <div className="col-sm-12 col-md-5 p-3">
                <div className="image-section">
                  <div className="image-container">
                    <div className="inner">
                      <img className="img-fluid" src={dispFile} alt="" />
                    </div>
                  </div>
                  <div className="button-container">
                    <input
                      type="file"
                      id="testFile"
                      // {...register("file")}
                      className="custom-file-input-1"
                      onChange={(e) => {
                        const [fileDisp] = e.target.files;
                        //setFile(e.target.files[0]);
                        console.log(e.target.files[0]);
                        setImg(e.target.files[0]);
                        //setFileErr("");
                        setDispFile(URL.createObjectURL(fileDisp));
                        //console.log(typeof file);
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
                        onChange={(e) => e.target.value}
                      >
                        <option value="devnet">Devnet</option>
                        <option value="testnet">Testnet</option>
                        <option value="mainnet-beta">Mainnet</option>
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
                        value={name}
                        onChange={(e) => {
                          // if(e.target.value === "")
                          // setNameErr("Name cannot be Empty")
                          // else
                          // setNameErr("")
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    {/* <small className="p-para-light text-danger">{nameErr}</small> */}
                    <div className="white-form-group">
                      <label className="form-label" htmlFor="symbol">
                        Symbol
                      </label>
                      <input
                        type="text"
                        name="symbol"
                        className="form-control"
                        placeholder="Enter Symbol"
                        value={symbol}
                        onChange={(e) => {
                          // if(e.target.value === "")
                          // setSymErr("Symbol cannot be Empty")
                          // else
                          // setSymErr("")
                          setSymbol(e.target.value);
                        }}
                      />
                    </div>
                    {/* <small className="p-para-light text-danger">{symErr}</small> */}
                    <div className="white-form-group">
                      <label htmlFor="bio" className="form-label">
                        Description
                      </label>
                      <textarea
                        name="desc"
                        className="form-control"
                        placeholder="Write a short product description"
                        rows="5"
                        value={desc}
                        onChange={(e) => {
                          // if(e.target.value === "")
                          // setDescErr("Please Enter a small description");
                          // else
                          // setDescErr("");
                          setDesc(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    {/* <small className="p-para-light text-danger">{descErr}</small> */}

                    <div className="white-form-group">
                      <label className="form-label" htmlFor="decimal">
                        Decimals
                      </label>
                      <input
                        type="text"
                        name="decimal"
                        className="form-control"
                        placeholder="Enter Token Decimals"
                        min={0}
                        value={decis}
                        onChange={(e) => setDesics(e.target.value)}
                      />
                    </div>

                    <div className="white-form-group">
                      <button className="btn-solid-grad">Create</button>
                    </div>
                    {/* <div className="p-para-light text-danger">{mainErr}</div> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
