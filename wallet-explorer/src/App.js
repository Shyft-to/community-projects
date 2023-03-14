import Parent from "./Parent";
import ReactGA from "react-ga4";
function App() {
  const TRACKING_ID = process.env.REACT_APP_GA_ID ?? "";
  ReactGA.initialize(TRACKING_ID);
  return (
    <div className="App">
      <Parent />
    </div>
  );
}

export default App;
