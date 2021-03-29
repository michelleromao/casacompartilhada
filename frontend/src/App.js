import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Login from "./components/login/Login";
import './style/style.css';

function App() {
  return (
    <div className="body bg-BegeClaro">

    <BrowserRouter>

      <Navbar></Navbar>

        
      <Switch>

        <Route path="/">
          <Login></Login>
        </Route>

      </Switch>


    </BrowserRouter>
    
    </div>
  );
}

export default App;
