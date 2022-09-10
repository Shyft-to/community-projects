import { ReactSession } from "react-client-session";
import ParentComponent from './ParentComponent';

function App() {
  ReactSession.setStoreType("sessionStorage");
  return (
    <div className="App">
      <ParentComponent />
    </div>
  );
}

export default App;
