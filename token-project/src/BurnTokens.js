const BurnTokens = (props) => {
  return (
    <div>
      <div className="full-overlay">
        <div className="loading-square-form">
          <div className="p-4">
            <button className="cross-button" onClick={() => props.setBurnPopup(false)}><i className="fa fa-times" aria-hidden="true"></i></button>
            <div className="white-form-group">
              <label className="form-label" htmlFor="name">
                Enter Amount to be Burned
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter value to be burned"
                value={props.amtBurned}
                onChange={(e) => {
                  props.setAmtBurned(e.target.value);
                }}
              />
            </div>
            <button className="btn-solid-grad py-2 mx-auto" style={{display:"block"}} onClick={props.burnNow}>Burn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurnTokens;
