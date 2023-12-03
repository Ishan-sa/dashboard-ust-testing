import "./App.css";
import TMODallas from "./pages/TMODallas";
import Schedule from "./pages/Schedule";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import POLookups from "./pages/POLookups";
import CapexReport from "./pages/CapexReport";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/tmo-dallas" element={<TMODallas />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="po-lookups" element={<POLookups />} />
            <Route path="capex-report" element={<CapexReport />} />
            <Route path="/" element={<></>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
